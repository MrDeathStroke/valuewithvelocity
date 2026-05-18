// Vercel serverless function — POST /api/subscribe
// Receives an email, adds it to the Resend audience, and sends a one-time
// confirmation email back. The Resend API key is read from env: RESEND_API_KEY.
// Optionally set RESEND_AUDIENCE_ID to file subscribers into a specific list.

import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

type Json = Record<string, unknown>;

function json(status: number, body: Json) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

const EMAIL_RX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// FROM defaults to Resend's onboarding sender so this works the moment the
// API key is set, even before the custom domain is verified in Resend.
// Once the domain is verified, set RESEND_FROM to a branded address like
// "VWV Dispatches <dispatches@valuewithvelocity.com>".
const FROM = process.env.RESEND_FROM || "VWV <onboarding@resend.dev>";
const REPLY_TO = process.env.RESEND_REPLY_TO || "hello@valuewithvelocity.com";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let payload: { email?: string } = {};
  try {
    payload = (await req.json()) as { email?: string };
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  const email = (payload.email || "").trim().toLowerCase();
  if (!EMAIL_RX.test(email)) {
    return json(400, { ok: false, error: "Please use a valid email." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Don't 500 on the user — log and respond ok so the form doesn't error
    // before the env var is configured. Once the key is set this branch
    // never runs.
    console.error("RESEND_API_KEY is not set");
    return json(503, {
      ok: false,
      error: "Subscriber service is not configured yet. Try again in a moment.",
    });
  }

  const resend = new Resend(apiKey);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // 1) Add to audience (if configured). Resend treats duplicate contacts as
  //    a soft conflict — we ignore that case and still send the welcome.
  if (audienceId) {
    try {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    } catch (err) {
      // Log but keep going — we still want to send the welcome.
      console.error("resend.contacts.create failed:", err);
    }
  }

  // 2) Welcome email — short, on-brand, no fluff.
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "You're on the dispatches list.",
      text: [
        "You're on the dispatches list.",
        "",
        "One cornerstone essay a month. Field notes in between. No noise.",
        "",
        "First piece in your inbox shortly. If you want to reach a human in the meantime, just reply to this email.",
        "",
        "— VWV",
        "Outcome velocity.",
      ].join("\n"),
      html: welcomeHtml(),
    });
    if (error) throw error;
  } catch (err) {
    console.error("resend.emails.send failed:", err);
    return json(502, {
      ok: false,
      error: "We could not send the welcome email. Try again in a minute.",
    });
  }

  return json(200, { ok: true });
}

function welcomeHtml() {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F5F4EF;font-family:Inter,system-ui,sans-serif;color:#0A0A0B;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F5F4EF;padding:48px 24px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="520" style="background:#FFFFFF;border-radius:12px;border:1px solid #EEEDE6;overflow:hidden;">
            <tr>
              <td style="padding:36px 36px 8px 36px;">
                <div style="display:inline-flex;align-items:center;gap:10px;">
                  <span style="display:inline-block;width:24px;height:24px;background:linear-gradient(180deg,transparent,#2563EB);clip-path:polygon(12% 12%, 50% 86%, 88% 12%);"></span>
                  <strong style="font-family:'Geist',Inter,sans-serif;font-weight:600;letter-spacing:-0.02em;">VWV</strong>
                </div>
                <h1 style="font-family:'Geist',Inter,sans-serif;font-weight:600;font-size:32px;line-height:1.1;letter-spacing:-0.03em;margin:28px 0 0 0;">
                  You're on the<br />dispatches list.
                </h1>
                <p style="font-size:16px;line-height:1.6;color:#4A4A52;margin:20px 0 0 0;">
                  One cornerstone essay a month. Field notes in between. No noise.
                </p>
                <p style="font-size:16px;line-height:1.6;color:#4A4A52;margin:16px 0 0 0;">
                  First piece arrives shortly. If you want to reach a human, just hit reply.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px 36px;">
                <p style="font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6C6C75;margin:32px 0 0 0;">
                  Value With Velocity · Outcome velocity.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
