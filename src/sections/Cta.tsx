import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { VMark } from "../components/VMark";
import { AnimatedVMark } from "../components/AnimatedVMark";

export function Cta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-cta-line]", { yPercent: 110, opacity: 0 });
      gsap.set("[data-cta-mark]", { scale: 0.7, opacity: 0 });
      gsap.set("[data-cta-row]", { y: 24, opacity: 0 });

      gsap.to("[data-cta-line]", {
        yPercent: 0,
        opacity: 1,
        duration: 1.0,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.to("[data-cta-mark]", {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.to("[data-cta-row]", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });

      // Floating velocity field
      gsap.to("[data-cta-field]", {
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="cta"
      className="relative isolate overflow-hidden border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]"
    >
      {/* Massive V mark watermark */}
      <div
        data-cta-field
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-32 lg:-right-10 lg:-top-40 opacity-[0.06] text-[color:var(--color-text-primary)]"
      >
        <VMark size={780} />
      </div>

      {/* Cobalt edge wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-[1200px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-[0.12] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-48">
        <div className="flex items-center gap-3 mb-10 lg:mb-14">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            05
          </span>
          <span className="h-px w-12 bg-[color:var(--color-border)]" />
          <p className="eyebrow">Bridge to the agency</p>
        </div>

        <h2 className="font-display font-semibold tracking-tightest leading-[0.95] text-[color:var(--color-text-primary)] text-[clamp(2.75rem,8vw,7rem)] text-balance max-w-5xl">
          <span className="block overflow-hidden">
            <span data-cta-line className="block">
              Read here.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-cta-line className="block">
              Ship there{" "}
              <span data-cta-mark className="inline-flex translate-y-1 text-[color:var(--color-accent)]">
                <AnimatedVMark size={88} interval={4} className="-translate-y-1" />
              </span>{" "}
              .
            </span>
          </span>
        </h2>

        <div
          data-cta-row
          className="mt-16 lg:mt-20 grid gap-12 lg:grid-cols-12 items-end"
        >
          <p className="lg:col-span-7 text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed max-w-2xl">
            valuewithvelocity.com is where the thinking lives. vwv.agency is
            where the work ships. Book a 30-minute intro call. We come back
            with a one-page sprint plan within 48 hours.
          </p>

          <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
            <a
              data-cta-row
              href="https://vwv.agency#book"
              className="group inline-flex items-center justify-between w-full lg:w-auto gap-6 h-14 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-base font-medium hover:bg-[color:var(--color-accent-hover)] transition-all duration-300"
            >
              <span>Book the intro call</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              data-cta-row
              href="https://vwv.agency"
              className="group inline-flex items-center justify-between w-full lg:w-auto gap-6 h-14 px-6 rounded-md border border-[color:var(--color-border)] text-[color:var(--color-text-primary)] text-base font-medium hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              <span>Visit vwv.agency</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Promise strip */}
        <div className="mt-20 lg:mt-24 grid gap-px md:grid-cols-3 bg-[color:var(--color-border-subtle)] border border-[color:var(--color-border-subtle)] rounded-lg overflow-hidden">
          {[
            { k: "Scope", v: "Fixed. One page, one signature." },
            { k: "Timebox", v: "Weeks, not months, not years." },
            { k: "Receipts", v: "The metrics you signed for, reported weekly." },
          ].map((row) => (
            <div
              key={row.k}
              className="bg-[color:var(--color-canvas-raised)] p-6 lg:p-8"
            >
              <p className="eyebrow">{row.k}</p>
              <p className="mt-2 font-display text-base lg:text-lg font-medium text-[color:var(--color-text-primary)] text-pretty">
                {row.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
