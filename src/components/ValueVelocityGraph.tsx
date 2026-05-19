import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";

/**
 * The Value-Velocity Graph
 * The second brand primitive (alongside the V mark).
 *
 * Two curves over time:
 *   - Velocity (Cobalt) — slightly ahead at the start.
 *   - Value    (Carbon / Bone in dark) — catches up at the midpoint.
 *
 * From midpoint to upper-right they animate at the same rate.
 * Visually this is the brand: parallel growth, never one outrunning the other.
 *
 * Animation: pathLength 0 → 1 on scroll-into-view, ~1.6s, expo.out.
 * Respects prefers-reduced-motion (renders both curves instantly complete).
 */

type Props = {
  className?: string;
  /** Size hint. The SVG is fluid (preserveAspectRatio meet) and scales. */
  height?: number | string;
  /** Show axes hairlines and the meeting-point dot. Defaults true. */
  showAnnotations?: boolean;
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

// Velocity (Cobalt) — ahead at start, slightly steeper early curve.
const VELOCITY_PATH =
  "M 60 420 C 200 360, 320 290, 440 230 C 560 170, 660 110, 740 60";

// Value (Carbon) — behind at start, catches up by the midpoint.
const VALUE_PATH =
  "M 60 450 C 200 430, 320 380, 440 250 C 560 170, 660 110, 740 60";

export function ValueVelocityGraph({
  className,
  height = "100%",
  showAnnotations = true,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();

  const animate = reduced || inView ? "visible" : "hidden";

  return (
    <svg
      ref={ref}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Value-Velocity Graph: two curves climbing together over time"
      className={className}
      style={{ width: "100%", height }}
    >
      {/* Axes — quiet hairlines */}
      {showAnnotations && (
        <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="1">
          <line x1="60" y1="60" x2="60" y2="460" />
          <line x1="60" y1="460" x2="760" y2="460" />
        </g>
      )}

      {/* Axis labels (mono eyebrows) */}
      {showAnnotations && (
        <g
          fill="currentColor"
          fillOpacity="0.45"
          fontFamily='"Geist Mono", ui-monospace, monospace'
          fontSize="11"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          <text x="60" y="40" textAnchor="start">
            Outcome
          </text>
          <text x="760" y="490" textAnchor="end">
            Time
          </text>
        </g>
      )}

      {/* Faint grid (very subtle, doesn't compete with curves) */}
      {showAnnotations && (
        <g stroke="currentColor" strokeOpacity="0.04" strokeWidth="1">
          {[160, 260, 360].map((y) => (
            <line key={y} x1="60" y1={y} x2="760" y2={y} />
          ))}
        </g>
      )}

      {/* VALUE curve — Carbon (light) / Bone (dark) via currentColor */}
      <motion.path
        d={VALUE_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        animate={animate}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.9,
            transition: {
              pathLength: { duration: 1.6, delay: 0.18, ease: EASE_OUT },
              opacity: { duration: 0.3, delay: 0.18 },
            },
          },
        }}
      />

      {/* VELOCITY curve — Cobalt */}
      <motion.path
        d={VELOCITY_PATH}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        animate={animate}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.6, delay: 0.1, ease: EASE_OUT },
              opacity: { duration: 0.3, delay: 0.1 },
            },
          },
        }}
      />

      {/* Convergence dot — the moment of meeting (around midpoint) */}
      {showAnnotations && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            reduced || inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.5, delay: 0.95, ease: EASE_OUT }}
          style={{ transformOrigin: "440px 240px" }}
        >
          <circle cx="440" cy="240" r="6" fill="var(--color-accent)" />
          <circle
            cx="440"
            cy="240"
            r="14"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="455"
            y="226"
            fill="currentColor"
            fontFamily='"Geist Mono", ui-monospace, monospace'
            fontSize="10"
            letterSpacing="2"
            opacity="0.7"
          >
            CONVERGE
          </text>
        </motion.g>
      )}

      {/* Curve labels — appear after animation */}
      {showAnnotations && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={reduced || inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: EASE_OUT }}
        >
          <g
            fontFamily='"Geist Mono", ui-monospace, monospace'
            fontSize="11"
            letterSpacing="2"
            style={{ textTransform: "uppercase" }}
          >
            <text x="745" y="50" textAnchor="end" fill="var(--color-accent)">
              Velocity
            </text>
            <text
              x="745"
              y="78"
              textAnchor="end"
              fill="currentColor"
              opacity="0.7"
            >
              Value
            </text>
          </g>
        </motion.g>
      )}
    </svg>
  );
}
