import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const lines = [
  ["Value", "without", "speed", "becomes"],
  ["stale.", "Speed", "without", "value", "becomes"],
  ["noise."],
];

export function Thesis() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Scroll-scrubbed word reveal — set initial dim state, animate to bright
      gsap.set("[data-thesis-word]", { opacity: 0.1, y: 20 });
      gsap.to("[data-thesis-word]", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });

      gsap.set("[data-thesis-eyebrow]", { opacity: 0, y: 14 });
      gsap.to("[data-thesis-eyebrow]", {
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
      id="thesis"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-48">
        <div
          data-thesis-eyebrow
          className="flex items-center gap-3 mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            01
          </span>
          <span className="h-px w-12 bg-[color:var(--color-border)]" />
          <p className="eyebrow">Thesis</p>
        </div>

        <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2.5rem,7vw,6rem)] text-balance">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span
                  key={`${li}-${wi}`}
                  data-thesis-word
                  className={
                    word === "stale." || word === "noise."
                      ? "inline-block mr-[0.25em] text-[color:var(--color-accent)]"
                      : "inline-block mr-[0.25em]"
                  }
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="mt-12 lg:mt-16 max-w-2xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
          We are a new-generation studio for organizations that refuse the
          legacy consulting cycle. Every engagement is a productized sprint
          with fixed scope, a fixed timebox, and{" "}
          <span className="text-[color:var(--color-text-primary)] font-medium">
            outcomes named on the contract before the first day of work.
          </span>{" "}
          If the numbers we signed for do not move, we do not ship. If we do
          not ship, we should not have started.
        </p>
      </div>
    </section>
  );
}
