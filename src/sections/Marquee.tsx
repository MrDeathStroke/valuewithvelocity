import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

/**
 * Kinetic phrase marquee — Motion-driven infinite loop with hover speed-up
 * and edge fade mask. Built with useAnimationFrame for buttery, predictable
 * scroll that doesn't rely on chained animate() calls.
 *
 * Inspired by 21st.dev's InfiniteSlider pattern; retuned to brand voice.
 */

const phrases = [
  "Outcome velocity",
  "Sprint, not engagement",
  "Cycle Time ↓",
  "OPEX ↓",
  "Manual Error Rate ↓",
  "Ship in weeks",
  "AI-native orchestration",
  "Productized",
  "Process disruption",
  "Fixed scope. Fixed timebox.",
];

export function Marquee() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hovering, setHovering] = useState(false);
  const lastTimeRef = useRef<number | null>(null);
  const halfWidthRef = useRef(0);

  // Measure half-width on mount + on resize
  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) halfWidthRef.current = t.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((t) => {
    if (reduced) return;
    if (lastTimeRef.current == null) {
      lastTimeRef.current = t;
      return;
    }
    const dt = (t - lastTimeRef.current) / 1000;
    lastTimeRef.current = t;
    const pxPerSec = hovering ? 30 : 80;
    let next = x.get() - pxPerSec * dt;
    const half = halfWidthRef.current;
    if (half > 0 && next <= -half) next += half; // seamless wrap
    x.set(next);
  });

  const tokens = [...phrases, ...phrases];

  return (
    <section
      aria-hidden
      className="relative border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)] overflow-hidden py-8 lg:py-10"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex shrink-0 items-center gap-12 px-6 will-change-transform"
        style={{ x }}
      >
        {tokens.map((w, i) => (
          <div key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tightest text-[color:var(--color-text-primary)]">
              {w}
            </span>
            <span className="text-[color:var(--color-accent)] font-display text-[clamp(2rem,5vw,4rem)] font-semibold">
              //
            </span>
          </div>
        ))}
      </motion.div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--color-canvas)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[color:var(--color-canvas)] to-transparent" />
    </section>
  );
}
