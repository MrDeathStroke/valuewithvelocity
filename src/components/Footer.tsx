import { Link } from "react-router-dom";
import { AnimatedVMark } from "./AnimatedVMark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-[color:var(--color-text-primary)]">
              <span className="text-[color:var(--color-accent)]">
                <AnimatedVMark size={36} interval={8} />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tighter">
                VWV
              </span>
            </div>
            <p className="mt-6 max-w-md text-[color:var(--color-text-secondary)] text-pretty">
              Value and velocity move on the same axis. Long-form thinking on
              the end of the SaaS-template era, process debt, and the
              rejoining of strategy with execution.
            </p>
          </div>

          {/* Site map */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#thesis" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Thesis</Link></li>
              <li><Link to="/#principles" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Principles</Link></li>
              <li><Link to="/dispatches" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Dispatches</Link></li>
              <li><Link to="/#cta" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Book a sprint</Link></li>
            </ul>
          </div>

          {/* Cross-link to agency */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Want it shipped, not just read?</p>
            <a
              href="https://vwv.agency"
              className="group block rounded-lg border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-accent)] p-5 transition-colors"
            >
              <p className="font-display text-lg font-semibold text-[color:var(--color-text-primary)]">
                vwv.agency
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                Productized sprints, on your premises. AI automation, KPI dashboard at close-out.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-accent)]">
                Visit
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[color:var(--color-border-subtle)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[color:var(--color-text-tertiary)]">
          <p className="font-mono">
            © {year} VWV. Value With Velocity. All rights reserved.
          </p>
          <p className="font-mono">
            <span className="text-[color:var(--color-text-secondary)]">
              "Value without speed becomes stale. Speed without value becomes noise."
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
