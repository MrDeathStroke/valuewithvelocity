import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "../lib/gsap";
import { AnimatedVMark } from "./AnimatedVMark";
import { useTheme } from "../hooks/useTheme";

const links = [
  { label: "Thesis", to: "/#thesis" },
  { label: "Principles", to: "/#principles" },
  { label: "Dispatches", to: "/dispatches" },
  { label: "Sprint", to: "/#cta" },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useGSAP(
    () => {
      gsap.set(ref.current, { y: -28, opacity: 0 });
      gsap.to(ref.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.1,
      });
    },
    { scope: ref }
  );

  return (
    <>
      <header
        ref={ref}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "backdrop-blur-xl bg-[color:var(--color-canvas)]/85 border-b border-[color:var(--color-border-subtle)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10 h-14 sm:h-16 lg:h-20">
          {/* Brand mark */}
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-2.5 text-[color:var(--color-text-primary)]"
            aria-label="VWV. Value With Velocity"
            onClick={() => setOpen(false)}
          >
            {/* V mark inherits text-primary so it reads at the same brightness as the wordmark */}
            <span className="inline-flex items-center text-[color:var(--color-text-primary)] transition-transform duration-500 group-hover:scale-110">
              <AnimatedVMark size={22} interval={0} />
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tighter leading-none">
              VWV
              <span className="text-[color:var(--color-accent)]">.</span>
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-[color:var(--color-border)] ml-1.5" />
            <span className="hidden sm:inline-block eyebrow !text-[10px]">
              Value With Velocity
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-3 py-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] transition-colors"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 group-hover:scale-x-100 hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Theme toggle — visible on all sizes */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="h-9 w-9 grid place-items-center rounded-md border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] transition-all"
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </button>

            {/* Desktop CTA */}
            <Link
              to="/#cta"
              className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-sm font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-colors"
            >
              Book a sprint
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden h-9 w-9 grid place-items-center rounded-md border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-primary)] transition-all"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-[color:var(--color-canvas)]"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -16 }}
              animate={{ y: 0 }}
              exit={{ y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-24 pb-10 px-5 sm:px-6 flex flex-col h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex-1 flex flex-col gap-1 border-t border-[color:var(--color-border-subtle)] pt-6">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={l.to}
                      className="group flex items-center justify-between py-5 border-b border-[color:var(--color-border-subtle)] text-[color:var(--color-text-primary)]"
                    >
                      <span className="font-display text-3xl font-semibold tracking-tighter">
                        {l.label}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        className="text-[color:var(--color-text-tertiary)] group-hover:text-[color:var(--color-accent)] transition-all group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10"
              >
                <Link
                  to="/#cta"
                  className="flex items-center justify-between gap-3 h-14 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-base font-medium"
                >
                  <span>Book a scoping call</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <p className="mt-6 eyebrow">
                  hello@valuewithvelocity.com
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
