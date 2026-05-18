import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { dispatches } from "../dispatches/content";

const ALL = "All";

export function DispatchesIndex() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    dispatches.forEach((d) => set.add(d.tag));
    return [ALL, ...Array.from(set)];
  }, []);

  const [activeTag, setActiveTag] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      activeTag === ALL
        ? dispatches
        : dispatches.filter((d) => d.tag === activeTag),
    [activeTag]
  );

  return (
    <article>
      {/* Header */}
      <header className="relative isolate overflow-hidden border-b border-[color:var(--color-border-subtle)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
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
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 lg:pt-40 pb-16 lg:pb-24">
          {/* Crumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <Link
              to="/"
              className="eyebrow hover:text-[color:var(--color-accent)] transition-colors"
            >
              VWV
            </Link>
            <span className="text-[10px] text-[color:var(--color-text-tertiary)]">
              /
            </span>
            <span className="eyebrow text-[color:var(--color-text-secondary)]">
              Dispatches
            </span>
          </motion.nav>

          <motion.h1
            className="mt-10 font-display font-semibold tracking-tightest leading-[0.95] text-[color:var(--color-text-primary)] text-[clamp(2.5rem,7vw,6rem)] text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            Dispatches.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Long-form thinking on outcome velocity, AI-native operations, and
            the work of rebuilding workflows instead of documenting them. One
            cornerstone essay a month. Field notes in between.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mr-2">Filter</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`h-9 px-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTag === t
                    ? "bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] border border-[color:var(--color-accent)]"
                    : "border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)]"
                }`}
              >
                {t}
                {t !== ALL && (
                  <span className="ml-2 opacity-60">
                    {dispatches.filter((d) => d.tag === t).length}
                  </span>
                )}
                {t === ALL && (
                  <span className="ml-2 opacity-60">{dispatches.length}</span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </header>

      {/* List */}
      <section className="bg-[color:var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
          <ul className="divide-y divide-[color:var(--color-border-subtle)] border-y border-[color:var(--color-border-subtle)]">
            {filtered.map((d, i) => (
              <motion.li
                key={d.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to={`/dispatches/${d.slug}`}
                  className="group relative grid grid-cols-12 gap-6 py-8 lg:py-12 items-start lg:items-center transition-colors"
                >
                  {/* Index */}
                  <div className="col-span-12 lg:col-span-1">
                    <span className="font-mono text-xs text-[color:var(--color-text-tertiary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tag + date */}
                  <div className="col-span-6 lg:col-span-2">
                    <p className="eyebrow">{d.tag}</p>
                    <p className="mt-2 font-mono text-xs text-[color:var(--color-text-tertiary)]">
                      {d.dateLabel}
                    </p>
                  </div>

                  {/* Title + deck */}
                  <div className="col-span-12 lg:col-span-7">
                    <h2 className="font-display text-xl lg:text-[28px] font-semibold tracking-tighter leading-[1.15] text-[color:var(--color-text-primary)] text-balance">
                      {d.title}
                    </h2>
                    <p className="mt-3 text-sm lg:text-[15px] text-[color:var(--color-text-secondary)] text-pretty max-w-2xl">
                      {d.deck}
                    </p>
                  </div>

                  {/* Meta + arrow */}
                  <div className="col-span-12 lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                      {d.kind} · {d.minutes} min
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

                  {/* Hover hairline */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-[color:var(--color-accent)] group-hover:w-full transition-[width] duration-700 ease-out"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-[color:var(--color-text-tertiary)]">
              Nothing tagged {activeTag} has shipped yet.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
