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

// FROM defaults to Resend's onboarding sender so this works before the
// custom domain is verified in Resend. In production we set RESEND_FROM to
// a branded sender on the verified vwv.agency domain.
const FROM = process.env.RESEND_FROM || "VWV <onboarding@resend.dev>";
const REPLY_TO = process.env.RESEND_REPLY_TO || "hello@vwv.agency";

// Base URL used to fetch the hosted SVG logo from the email.
// Falls back to the production alias if VERCEL_URL is missing.
const SITE_URL = process.env.SITE_URL || "https://site-pi-tan-76.vercel.app";

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
  // Note: email clients strip <svg>, clip-path, and linear-gradient. Use
  // an <img> pointing at the hosted favicon SVG (which renders fine in
  // Gmail/Apple Mail/Outlook web). Table-based layout for legacy clients.
  const logoUrl = `${SITE_URL}/favicon.svg`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>You're on the dispatches list.</title>
  </head>
  <body style="margin:0;padding:0;background:#F5F4EF;font-family:Helvetica,Arial,sans-serif;color:#0A0A0B;">
    <!-- Preheader (hidden in body, shown in inbox preview) -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      One cornerstone essay a month. Field notes in between. No noise.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F5F4EF;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:12px;border:1px solid #EEEDE6;overflow:hidden;">

            <!-- Brand row -->
            <tr>
              <td style="padding:32px 36px 8px 36px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:10px;">
                      <img src="${logoUrl}" width="28" height="28" alt="VWV" style="display:block;border:0;outline:none;text-decoration:none;" />
                    </td>
                    <td style="vertical-align:middle;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:16px;letter-spacing:-0.5px;color:#0A0A0B;">
                      VWV
                    </td>
                    <td style="vertical-align:middle;padding-left:12px;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6C6C75;">
                      Value With Velocity
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td style="padding:24px 36px 0 36px;">
                <h1 style="margin:0;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:30px;line-height:1.1;letter-spacing:-1.2px;color:#0A0A0B;">
                  You're on the<br />dispatches list<span style="color:#2563EB;">.</span>
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:20px 36px 0 36px;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#4A4A52;">
                  One cornerstone essay a month. Field notes in between. No noise.
                </p>
                <p style="margin:16px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#4A4A52;">
                  First piece arrives shortly. If you want to reach a human, just hit reply.
                </p>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:28px 36px 0 36px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td bgcolor="#0A0A0B" style="border-radius:8px;">
                      <a href="${SITE_URL}/dispatches" style="display:inline-block;padding:12px 22px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#FAFAF7;text-decoration:none;letter-spacing:-0.2px;">
                        Read the dispatches →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer rule -->
            <tr>
              <td style="padding:32px 36px 28px 36px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td height="1" style="font-size:0;line-height:0;background:#EEEDE6;">&nbsp;</td>
                  </tr>
                </table>
                <p style="margin:20px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6C6C75;">
                  Value With Velocity · Outcome velocity.
                </p>
                <p style="margin:8px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6C6C75;">
                  <a href="${SITE_URL}" style="color:#2563EB;text-decoration:none;">valuewithvelocity.com</a>
                  &nbsp;·&nbsp;
                  <a href="https://vwv.agency" style="color:#2563EB;text-decoration:none;">vwv.agency</a>
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
