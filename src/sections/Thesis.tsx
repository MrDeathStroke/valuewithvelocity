import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { gsap } from "../lib/gsap";

/**
 * The Manifesto section (formerly Thesis).
 * Carries the strategy-vs-execution diagnosis and the wedge statement.
 */

const lines = ["Strategy firms", "produce value", "they cannot ship."];
const lines2 = ["Execution firms", "produce velocity", "they cannot judge."];

export function Thesis() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-mf-word]", { opacity: 0.1, y: 18 });
      gsap.to("[data-mf-word]", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.6,
        },
      });

      gsap.set("[data-mf-eyebrow]", { opacity: 0, y: 14 });
      gsap.to("[data-mf-eyebrow]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-48">
        {/* Eyebrow */}
        <div
          data-mf-eyebrow
          className="flex items-center gap-3 mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            01
          </span>
          <span className="h-px w-12 bg-[color:var(--color-border)]" />
          <p className="eyebrow">The Manifesto</p>
        </div>

        {/* The two-stanza diagnosis */}
        <h2 className="font-display font-semibold tracking-tightest leading-[1.02] text-[color:var(--color-text-primary)] text-[clamp(2rem,5.5vw,4.5rem)] text-balance max-w-5xl">
          <span className="block">
            {lines.map((w, i) => (
              <span
                key={`a-${i}`}
                data-mf-word
                className={
                  w === "produce value" || w === "they cannot ship."
                    ? "inline-block mr-[0.25em] text-[color:var(--color-text-secondary)]"
                    : "inline-block mr-[0.25em]"
                }
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block mt-2">
            {lines2.map((w, i) => (
              <span
                key={`b-${i}`}
                data-mf-word
                className={
                  w === "produce velocity" || w === "they cannot judge."
                    ? "inline-block mr-[0.25em] text-[color:var(--color-text-secondary)]"
                    : "inline-block mr-[0.25em]"
                }
              >
                {w}
              </span>
            ))}
          </span>
        </h2>

        {/* The wedge line */}
        <motion.p
          className="mt-12 lg:mt-16 font-display font-semibold tracking-tightest leading-tight text-[color:var(--color-accent)] text-[clamp(1.5rem,3.5vw,2.75rem)] max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          VWV is built on the bet that one team can do both.
        </motion.p>

        {/* Body essay */}
        <div className="mt-16 grid gap-12 lg:gap-20 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6 text-[17px] lg:text-[18px] leading-[1.7] text-[color:var(--color-text-secondary)] text-pretty">
            <p>
              The split between strategy and execution is structural, not
              accidental. Strategy people sit on retainers, code people sit
              on Jira tickets. Two budgets, two KPIs, two buildings. The deck
              gets delivered. The dev shop receives a deck someone else
              wrote. By the time the workflow ships, the strategy has aged.
            </p>
            <p>
              The cost shows up on the P&amp;L the same way every time. Value
              that was real on the day it was approved becomes stale by the
              day it deploys. Velocity that was real on the day work began
              ships against a judgement nobody re-validated. The two curves
              never travel on the same axis. One always lags.
            </p>
            <p>
              VWV exists to retire that lag. One team in the room, one
              signature on the plan. Strategy and execution share a sprint,
              a budget, and a calendar. The decision that gets made on
              Monday gets shipped by Friday, or it gets unmade together.
              That is the structural innovation. Everything else is method.
            </p>
            <p className="text-[color:var(--color-text-primary)] font-medium">
              We pick non-tech firms on purpose. They are where the
              SaaS-template era left the deepest debt, and where AI-built
              bespoke systems will rewrite the next decade of operations.
            </p>
          </div>

          {/* Signature column — VWV institutional voice */}
          <motion.aside
            className="lg:col-span-5 lg:sticky lg:top-28 self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8">
              <p className="eyebrow !text-[color:var(--color-accent)]">
                What we believe
              </p>

              <p className="mt-6 text-[15px] leading-relaxed text-[color:var(--color-text-secondary)] text-pretty">
                A decade across technology, consulting, strategy, and AI
                taught us that value and velocity travel on the same axis, or
                they don't move at all. We are early adopters by default,
                disruption-enablers by craft, stubborn optimists about what
                AI lets non-tech firms finally build for themselves instead
                of renting it from a SaaS template.
              </p>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                On the ground in Ahmedabad and Mumbai. Working globally.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
