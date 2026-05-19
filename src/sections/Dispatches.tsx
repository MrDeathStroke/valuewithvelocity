import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { dispatches as allDispatches } from "../dispatches/content";
import { SubscribeForm } from "../components/SubscribeForm";

const dispatches = allDispatches.map((d) => ({
  eyebrow: `${d.kind} · ${d.minutes} min read`,
  date: d.dateLabel,
  title: d.title,
  deck: d.deck,
  href: `/dispatches/${d.slug}`,
  tag: d.tag,
}));

export function Dispatches() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-dispatch]", { y: 32, opacity: 0 });
      gsap.to("[data-dispatch]", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-dispatch-list]",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="dispatches"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-40">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                04
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Dispatches · long-form thinking</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              Field reports from the velocity edge.
            </h2>
          </div>
          <Link
            to="/dispatches"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors"
          >
            All dispatches
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <ul data-dispatch-list className="divide-y divide-[color:var(--color-border-subtle)] border-y border-[color:var(--color-border-subtle)]">
          {dispatches.map((d, i) => (
            <li key={d.title} data-dispatch>
              <Link
                to={d.href}
                className="group relative grid grid-cols-12 gap-6 py-8 lg:py-10 items-start lg:items-center transition-colors"
              >
                {/* Index */}
                <div className="col-span-12 lg:col-span-1 flex items-center gap-3">
                  <span className="font-mono text-xs text-[color:var(--color-text-tertiary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Tag + date */}
                <div className="col-span-6 lg:col-span-2">
                  <p className="eyebrow">{d.tag}</p>
                  <p className="mt-2 font-mono text-xs text-[color:var(--color-text-tertiary)]">
                    {d.date}
                  </p>
                </div>

                {/* Title + deck */}
                <div className="col-span-12 lg:col-span-7">
                  <h3 className="font-display text-xl lg:text-[28px] font-semibold tracking-tighter leading-[1.15] text-[color:var(--color-text-primary)] text-balance">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm lg:text-[15px] text-[color:var(--color-text-secondary)] text-pretty max-w-2xl">
                    {d.deck}
                  </p>
                </div>

                {/* Meta + arrow */}
                <div className="col-span-12 lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                    {d.eyebrow}
                  </p>
                  <span className="grid place-items-center h-9 w-9 rounded-md border border-[color:var(--color-border-subtle)] group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent-fg)] text-[color:var(--color-text-secondary)] transition-all duration-300">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Hover hairline at top */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-[color:var(--color-accent)] group-hover:w-full transition-[width] duration-700 ease-out"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Subscribe block */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-12 items-center rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-8 lg:p-10">
          <div>
            <p className="eyebrow">The dispatch · monthly</p>
            <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold tracking-tighter text-[color:var(--color-text-primary)] text-balance">
              One cornerstone essay a month. No noise.
            </h3>
          </div>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
