import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const principles = [
  {
    n: "P1",
    title: "Velocity is the product.",
    body: "We don't sell time or headcount. We sell speed-to-outcome, on a fixed timebox. A sprint either ships in weeks or it doesn't ship.",
  },
  {
    n: "P2",
    title: "Outcomes are measurable or they don't count.",
    body: "Every sprint reports against the metrics signed for on the plan. Faster workflows. Lower run cost. Fewer manual errors. No vibes, no qualitative impact stories with no number behind them.",
  },
  {
    n: "P3",
    title: "Process disruption, not process documentation.",
    body: "We rebuild workflows around AI orchestration and automation. We do not paint over the old ones. If the workflow can't be rebuilt, the sprint shouldn't run.",
  },
  {
    n: "P4",
    title: "AI-native, technically specific.",
    body: "We name the architecture, not the trend. Orchestration layer, automation runners, operational data. Specificity is a trust signal, not a liability.",
  },
  {
    n: "P5",
    title: "Builders, not advisors.",
    body: "We deploy systems clients can see, use, and own. Not PDFs and frameworks. The deliverable is software in production, not slides in a folder.",
  },
  {
    n: "P6",
    title: "Direct beats hedged.",
    body: "We make declarative claims and stand behind them. If we can't say it directly with a metric attached, we don't say it.",
  },
];

export function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-principle]", { y: 40, opacity: 0 });
      const cards = gsap.utils.toArray<HTMLElement>("[data-principle]");
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          delay: (i % 3) * 0.06,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="principles"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-40">
        <div className="flex items-center gap-3 mb-12 lg:mb-16">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            02
          </span>
          <span className="h-px w-12 bg-[color:var(--color-border)]" />
          <p className="eyebrow">Principles · six operating rules</p>
        </div>

        <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
          How we work, distilled to six.
        </h2>

        <div className="mt-16 grid gap-px bg-[color:var(--color-border-subtle)] md:grid-cols-2 lg:grid-cols-3 border border-[color:var(--color-border-subtle)] rounded-lg overflow-hidden">
          {principles.map((p) => (
            <article
              key={p.n}
              data-principle
              className="group relative bg-[color:var(--color-canvas)] p-8 lg:p-10 transition-colors duration-500 hover:bg-[color:var(--color-canvas-raised)]"
            >
              {/* Index */}
              <p className="font-mono text-xs text-[color:var(--color-text-tertiary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                {p.n}
              </p>

              {/* Title */}
              <h3 className="mt-6 font-display text-2xl lg:text-[28px] font-semibold tracking-tighter leading-[1.1] text-[color:var(--color-text-primary)] text-balance">
                {p.title}
              </h3>

              {/* Body */}
              <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-text-secondary)] text-pretty">
                {p.body}
              </p>

              {/* Hairline edge — animates on hover */}
              <span
                aria-hidden
                className="absolute left-0 bottom-0 h-px w-0 bg-[color:var(--color-accent)] group-hover:w-full transition-[width] duration-700 ease-out"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
