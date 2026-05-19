import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { gsap } from "../lib/gsap";
import { ValueVelocityGraph } from "../components/ValueVelocityGraph";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-h-line]", { yPercent: 110, opacity: 0 });
      gsap.set("[data-h-lede]", { y: 18, opacity: 0 });
      gsap.set("[data-h-cta]", { y: 12, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.18 });
      intro
        .to("[data-h-line]", {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
          stagger: 0.07,
        })
        .to(
          "[data-h-lede]",
          { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
          "-=0.55"
        )
        .to(
          "[data-h-cta]",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.08,
          },
          "-=0.45"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden min-h-[100svh]"
    >
      {/* Velocity-field stripes background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
      >
        <div className="absolute inset-0 flex items-end">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                background:
                  i % 6 === 0
                    ? "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-text-primary) 4%, transparent) 100%)"
                    : "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-text-primary) 2%, transparent) 100%)",
                borderRight:
                  i < 23
                    ? "1px solid color-mix(in oklab, var(--color-text-primary) 3%, transparent)"
                    : "none",
              }}
            />
          ))}
        </div>
        <div className="absolute -bottom-32 left-1/2 h-96 w-[1200px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 lg:px-10 pt-32 lg:pt-36 pb-16">
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-12 items-center">
          {/* Left — manifesto headline */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-semibold text-[color:var(--color-text-primary)] tracking-tightest leading-[0.95] text-balance text-[clamp(2.5rem,6vw,5rem)] m-0">
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-h-line className="block will-change-transform">
                  Value and velocity
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-h-line className="block will-change-transform">
                  move on the same axis<span className="text-[color:var(--color-accent)]">.</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span
                  data-h-line
                  className="block will-change-transform text-[color:var(--color-text-secondary)] text-[0.6em] font-medium tracking-tight leading-tight mt-3"
                >
                  Or they don't move at all.
                </span>
              </span>
            </h1>

            <p
              data-h-lede
              className="mt-8 max-w-xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
            >
              VWV is a strategy-and-execution studio for non-tech firms. We
              diagnose process debt, then ship the AI automation that retires
              it. One team. One sprint. One signature.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                data-h-cta
                href="#manifesto"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-[15px] font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-all duration-300"
              >
                Read the manifesto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                data-h-cta
                href="https://vwv.agency"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-primary)] text-[15px] font-medium transition-colors"
              >
                Book the call
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — the manifesto rendered as a graph */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 text-[color:var(--color-text-primary)]">
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow">The graph</p>
                <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-accent)]">
                  V × V
                </p>
              </div>
              <ValueVelocityGraph height={320} />
              <p className="mt-2 text-xs text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
                Two curves climbing together. One team owns both. That is the
                wedge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
