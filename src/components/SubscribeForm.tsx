import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function SubscribeForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({
          kind: "error",
          message: data.error || "Subscription failed. Try again.",
        });
        return;
      }
      setState({ kind: "success" });
      setEmail("");
    } catch {
      setState({
        kind: "error",
        message: "Network error. Try again in a moment.",
      });
    }
  }

  const disabled = state.kind === "loading";

  return (
    <div className="min-w-0 w-full">
      <form
        className="
          flex flex-col sm:flex-row gap-2 sm:gap-0
          rounded-md bg-[color:var(--color-canvas-sunken)]
          border border-[color:var(--color-border)]
          focus-within:border-[color:var(--color-accent)]
          transition-colors
          p-1 sm:p-0
        "
        onSubmit={onSubmit}
        noValidate
      >
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.kind === "error") setState({ kind: "idle" });
          }}
          disabled={disabled || state.kind === "success"}
          aria-label="Email address"
          className="
            flex-1 min-w-0 h-11 sm:h-12 px-4
            bg-transparent border-0
            text-base sm:text-[15px] text-[color:var(--color-text-primary)]
            placeholder:text-[color:var(--color-text-tertiary)]
            focus:outline-none focus:ring-0
            disabled:opacity-60
          "
        />
        <button
          type="submit"
          disabled={disabled || state.kind === "success"}
          className="
            h-11 sm:h-10 px-5 rounded
            bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)]
            text-[15px] sm:text-sm font-medium tracking-tight
            hover:bg-[color:var(--color-accent-hover)] transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed
            inline-flex items-center justify-center gap-2
            sm:m-1 whitespace-nowrap
          "
        >
          {state.kind === "loading" && <Spinner />}
          {state.kind === "success"
            ? "Subscribed"
            : state.kind === "loading"
            ? "Subscribing"
            : "Subscribe"}
        </button>
      </form>

      {/* Status line */}
      <div className="mt-3 min-h-[1.25rem]">
        <AnimatePresence mode="wait">
          {state.kind === "error" && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-[#E84A18]"
            >
              {state.message}
            </motion.p>
          )}
          {state.kind === "success" && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[color:var(--color-text-secondary)]"
            >
              <span className="text-[color:var(--color-accent)] font-medium">
                Confirmed.
              </span>{" "}
              Check your inbox for the welcome dispatch.
            </motion.p>
          )}
          {state.kind === "idle" && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[11px] tracking-widest uppercase text-[color:var(--color-text-tertiary)] leading-relaxed"
            >
              One email a month · Unsubscribe in one click
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
