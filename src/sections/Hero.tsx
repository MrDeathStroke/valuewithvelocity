import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Set initial hidden state up-front so we never animate FROM, only TO.
      // This avoids races where re-renders re-run from() and leave elements stuck.
      gsap.set("[data-line]", { yPercent: 110, opacity: 0 });
      gsap.set("[data-lede]", { y: 18, opacity: 0 });
      gsap.set("[data-cta]", { y: 12, opacity: 0 });
      gsap.set("[data-meta]", { y: 10, opacity: 0 });
      gsap.set("[data-stripe]", { opacity: 0 });

      const intro = gsap.timeline({ delay: 0.2 });
      intro
        .to(
          "[data-line]",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.07,
          }
        )
        .to(
          "[data-lede]",
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .to(
          "[data-cta]",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "expo.out",
          },
          "-=0.5"
        )
        .to(
          "[data-meta]",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "expo.out",
          },
          "-=0.5"
        );

      // Animated velocity field — vertical stripes that scrub on scroll
      gsap.to("[data-field]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Stripe weight ticker — emulates accelerating velocity
      gsap.to("[data-stripe]", {
        opacity: 0.95,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.04,
        ease: "expo.out",
      });

      // Headline letter spacing breathes on scroll
      gsap.to("[data-headline]", {
        letterSpacing: "-0.06em",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      // Live metric counters
      const metrics = gsap.utils.toArray<HTMLElement>("[data-metric]");
      metrics.forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "expo.out",
              onUpdate: () => {
                const v = obj.v;
                el.textContent =
                  (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) +
                  suffix;
              },
            });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Animated velocity field background */}
      <div
        data-field
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
      >
        <div className="absolute inset-0 flex items-end">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              data-stripe
              className="flex-1 h-full opacity-0"
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
        {/* Cobalt edge wash */}
        <div className="absolute -bottom-32 left-1/2 h-96 w-[1200px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-[0.08] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 lg:px-10 pt-32 lg:pt-40 pb-16 lg:pb-20">
        {/* Headline — split lines for GSAP reveal */}
        <h1
          data-headline
          className="font-display font-semibold text-[color:var(--color-text-primary)] tracking-tightest leading-[0.9] text-balance text-[clamp(3.5rem,13vw,10rem)] m-0"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-line className="block will-change-transform">
              Outcome
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block will-change-transform">
              velocity<span className="text-[color:var(--color-accent)]">.</span>
            </span>
          </span>
        </h1>

        {/* Lede */}
        <p
          data-lede
          className="mt-8 lg:mt-10 max-w-2xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
        >
          VWV engineers measurable business value at maximum velocity through
          AI, automation, and process disruption. Outcomes in weeks, not slide
          decks in months.
        </p>

        {/* CTAs */}
        <div className="mt-10 lg:mt-12 flex flex-wrap items-center gap-3">
          <a
            data-cta
            href="#cta"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-[15px] font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-all duration-300"
          >
            Book a scoping call
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            data-cta
            href="#thesis"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-primary)] text-[15px] font-medium transition-colors"
          >
            Read the thesis
          </a>
        </div>

        {/* Metric strip — three KPIs */}
        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-4 lg:gap-8 border-t border-[color:var(--color-border-subtle)] pt-8 lg:pt-10">
          {[
            { label: "Avg cycle, days", suffix: "", target: 6, prefix: "" },
            { label: "Annualised OPEX out", suffix: "%", target: 31, prefix: "−" },
            { label: "Manual error rate", suffix: "%", target: 94, prefix: "−" },
          ].map((m) => (
            <div data-meta key={m.label} className="min-w-0">
              <p className="eyebrow">{m.label}</p>
              <p className="mt-2 font-display text-3xl lg:text-5xl font-semibold tracking-tighter text-[color:var(--color-text-primary)] tabular-nums">
                <span className="text-[color:var(--color-accent)] mr-1">
                  {m.prefix}
                </span>
                <span
                  data-metric
                  data-target={m.target}
                  data-suffix={m.suffix}
                >
                  0{m.suffix}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 lg:mt-16 flex items-center gap-3 text-[color:var(--color-text-tertiary)]">
          <span className="eyebrow !text-[10px]">Scroll · ↓</span>
          <span className="h-px w-16 bg-[color:var(--color-border)]" />
        </div>
      </div>
    </section>
  );
}
