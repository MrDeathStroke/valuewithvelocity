import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getDispatch, getPrevNext, getRelated } from "../dispatches/content";
import type { Block, Dispatch } from "../dispatches/types";
import { AnimatedVMark } from "../components/AnimatedVMark";

export function DispatchArticle() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = slug ? getDispatch(slug) : undefined;

  // Reset scroll position whenever we land on a new article.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!dispatch) return <DispatchNotFound />;

  const { prev, next } = getPrevNext(dispatch.slug);
  const related = getRelated(dispatch.slug, 2);

  return (
    <article className="relative">
      {/* Hero / header */}
      <header className="relative isolate overflow-hidden border-b border-[color:var(--color-border-subtle)]">
        {/* Background field */}
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

        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-32 lg:pt-40 pb-20 lg:pb-28">
          {/* Crumbs */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-[color:var(--color-text-tertiary)]"
          >
            <Link
              to="/"
              className="eyebrow hover:text-[color:var(--color-accent)] transition-colors"
            >
              VWV
            </Link>
            <span className="text-[10px]">/</span>
            <Link
              to="/dispatches"
              className="eyebrow hover:text-[color:var(--color-accent)] transition-colors"
            >
              Dispatches
            </Link>
            <span className="text-[10px]">/</span>
            <span className="eyebrow text-[color:var(--color-text-secondary)]">
              {dispatch.tag}
            </span>
          </motion.nav>

          {/* Meta */}
          <motion.div
            className="mt-10 flex items-center gap-3 text-[color:var(--color-text-tertiary)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-[color:var(--color-accent)]">
              {dispatch.kind}
            </span>
            <span className="h-px w-8 bg-[color:var(--color-border)]" />
            <span className="font-mono text-xs">{dispatch.dateLabel}</span>
            <span className="h-px w-8 bg-[color:var(--color-border)]" />
            <span className="font-mono text-xs">
              {dispatch.minutes} min read
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mt-8 font-display font-semibold tracking-tightest leading-[1.02] text-[color:var(--color-text-primary)] text-[clamp(2.25rem,5.5vw,4.5rem)] text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {dispatch.title}
          </motion.h1>

          {/* Deck */}
          <motion.p
            className="mt-8 max-w-2xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {dispatch.deck}
          </motion.p>

          {/* Byline */}
          <motion.div
            className="mt-10 flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
              Dispatch from
            </span>
            <span className="font-display text-sm font-semibold text-[color:var(--color-text-primary)]">
              VWV
            </span>
          </motion.div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-20 lg:py-28">
        <Body body={dispatch.body} />
      </div>

      {/* Prev / Next */}
      <PrevNext prev={prev} next={next} />

      {/* Related */}
      {related.length > 0 && <Related items={related} />}

      {/* Back to all */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 pb-32 pt-16">
        <Link
          to="/dispatches"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className="transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All dispatches
        </Link>
      </div>
    </article>
  );
}

/** Body renderer ─ each block type maps to a JSX shape. */
function Body({ body }: { body: Block[] }) {
  return (
    <div className="space-y-7">
      {body.map((block, i) => (
        <BlockNode key={i} block={block} index={i} />
      ))}
    </div>
  );
}

function BlockNode({ block }: { block: Block; index: number }) {
  switch (block.type) {
    case "lede":
      return (
        <p className="font-display text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.45] tracking-tight text-[color:var(--color-text-primary)] text-pretty first-letter:font-display first-letter:text-[3.5em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[color:var(--color-accent)] first-letter:font-semibold">
          {block.text}
        </p>
      );

    case "p":
      return (
        <p className="text-[17px] lg:text-[18px] leading-[1.7] text-[color:var(--color-text-secondary)] text-pretty">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2 className="font-display font-semibold tracking-tighter leading-[1.15] text-[color:var(--color-text-primary)] text-[clamp(1.5rem,2.5vw,2rem)] mt-12 mb-2 text-balance">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="font-display font-semibold tracking-tight leading-snug text-[color:var(--color-text-primary)] text-xl lg:text-2xl mt-8 mb-2">
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="relative my-12 pl-6 lg:pl-10 border-l-2 border-[color:var(--color-accent)]">
          <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.25] tracking-tight text-[color:var(--color-text-primary)] text-balance">
            “{block.text}”
          </p>
          {block.cite && (
            <cite className="mt-4 block font-mono text-xs not-italic text-[color:var(--color-text-tertiary)]">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="my-10 relative bg-[color:var(--color-canvas-raised)] border border-[color:var(--color-border-subtle)] rounded-lg p-6 lg:p-8">
          {block.label && (
            <p className="eyebrow !text-[color:var(--color-accent)] mb-3">
              {block.label}
            </p>
          )}
          <p className="text-[16px] lg:text-[17px] leading-[1.6] text-[color:var(--color-text-primary)] text-pretty">
            {block.text}
          </p>
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-[color:var(--color-accent)]"
          />
        </aside>
      );

    case "ol":
      return (
        <ol className="my-6 space-y-4 counter-reset-list">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-5 text-[17px] lg:text-[18px] leading-[1.7] text-[color:var(--color-text-secondary)]"
            >
              <span className="font-mono text-xs text-[color:var(--color-accent)] mt-[0.55em] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "ul":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-4 text-[17px] lg:text-[18px] leading-[1.7] text-[color:var(--color-text-secondary)]"
            >
              <span
                aria-hidden
                className="mt-[0.9em] h-px w-4 bg-[color:var(--color-accent)]"
              />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "kpi":
      return (
        <dl className="my-8 grid gap-px bg-[color:var(--color-border-subtle)] border border-[color:var(--color-border-subtle)] rounded-lg overflow-hidden">
          {block.rows.map((row) => (
            <div
              key={row.k}
              className="grid grid-cols-3 gap-4 bg-[color:var(--color-canvas-raised)] p-4 lg:p-5"
            >
              <dt className="eyebrow col-span-1">{row.k}</dt>
              <dd className="col-span-2 font-mono text-sm text-[color:var(--color-text-primary)]">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "divider":
      return (
        <div className="my-12 flex items-center gap-4">
          <span className="text-[color:var(--color-accent)]">
            <AnimatedVMark size={18} interval={0} />
          </span>
          <span className="h-px flex-1 bg-[color:var(--color-border-subtle)]" />
        </div>
      );

    case "signature":
      return (
        <p className="mt-16 pt-6 border-t border-[color:var(--color-border-subtle)] font-mono text-xs uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
          {block.text}
        </p>
      );

    default:
      return null;
  }
}

function PrevNext({
  prev,
  next,
}: {
  prev: Dispatch | null;
  next: Dispatch | null;
}) {
  if (!prev && !next) return null;
  return (
    <div className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 grid gap-px md:grid-cols-2 bg-[color:var(--color-border-subtle)]">
        {next ? (
          <DispatchLink dispatch={next} label="Newer" align="left" />
        ) : (
          <div className="bg-[color:var(--color-canvas-sunken)]" />
        )}
        {prev ? (
          <DispatchLink dispatch={prev} label="Older" align="right" />
        ) : (
          <div className="bg-[color:var(--color-canvas-sunken)]" />
        )}
      </div>
    </div>
  );
}

function DispatchLink({
  dispatch,
  label,
  align,
}: {
  dispatch: Dispatch;
  label: string;
  align: "left" | "right";
}) {
  return (
    <Link
      to={`/dispatches/${dispatch.slug}`}
      className={`group block bg-[color:var(--color-canvas)] hover:bg-[color:var(--color-canvas-raised)] p-8 lg:p-10 transition-colors ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {align === "left" && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className="text-[color:var(--color-accent)] transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        )}
        <span className="eyebrow !text-[color:var(--color-accent)]">{label}</span>
        {align === "right" && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className="text-[color:var(--color-accent)] transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        )}
      </div>
      <p className="mt-4 font-display text-xl lg:text-2xl font-semibold tracking-tighter leading-[1.2] text-[color:var(--color-text-primary)] text-balance">
        {dispatch.title}
      </p>
      <p className="mt-2 font-mono text-xs text-[color:var(--color-text-tertiary)]">
        {dispatch.tag} · {dispatch.minutes} min
      </p>
    </Link>
  );
}

function Related({ items }: { items: Dispatch[] }) {
  return (
    <section className="bg-[color:var(--color-canvas)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            More
          </span>
          <span className="h-px w-12 bg-[color:var(--color-border)]" />
          <p className="eyebrow">Related dispatches</p>
        </div>
        <div className="grid gap-px md:grid-cols-2 bg-[color:var(--color-border-subtle)] border border-[color:var(--color-border-subtle)] rounded-lg overflow-hidden">
          {items.map((d) => (
            <Link
              key={d.slug}
              to={`/dispatches/${d.slug}`}
              className="group bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 hover:bg-[color:var(--color-canvas)] transition-colors"
            >
              <p className="eyebrow">{d.tag}</p>
              <p className="mt-3 font-display text-lg lg:text-xl font-semibold tracking-tighter leading-snug text-[color:var(--color-text-primary)] text-balance">
                {d.title}
              </p>
              <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] text-pretty line-clamp-2">
                {d.deck}
              </p>
              <p className="mt-4 font-mono text-xs text-[color:var(--color-text-tertiary)]">
                {d.kind} · {d.minutes} min · {d.dateLabel}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DispatchNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 lg:px-10 py-32 lg:py-48 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-4xl lg:text-5xl font-semibold tracking-tightest text-[color:var(--color-text-primary)]">
        That dispatch hasn't shipped.
      </h1>
      <p className="mt-6 text-[color:var(--color-text-secondary)]">
        Either the link is wrong or the piece is still in draft. Head back to
        the index for everything that is live.
      </p>
      <Link
        to="/dispatches"
        className="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors"
      >
        All dispatches
      </Link>
    </div>
  );
}
