import { useRef, useEffect, useState } from "react";
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
 *   Velocity (Cobalt) — slightly ahead at the start.
 *   Value (Carbon / Bone in dark) — catches up at the midpoint.
 *
 * From midpoint to upper-right they animate at the same rate.
 *
 * Motion family (per wiggle/methodology): Organic-Continuous.
 *   Phase 1 — Entrance (~1.6s):
 *     curves draw in via pathLength 0 -> 1, expo.out.
 *   Phase 2 — Ambient (post-entrance, looping):
 *     traveling indicator dots ride along each curve (5s loop, staggered).
 *     convergence dot pulses (scale 1 -> 1.15 -> 1) at 2.6s rhythm.
 *     convergence halo breathes (r 14 -> 18 -> 14, opacity 0.4 -> 0.15 -> 0.4).
 *
 * Reduced-motion safe: both phases short-circuit to a static final state.
 */

type Props = {
  className?: string;
  /** Size hint. SVG is fluid (preserveAspectRatio meet) and scales. */
  height?: number | string;
  /** Show axes hairlines, the convergence dot, and curve labels. */
  showAnnotations?: boolean;
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

// Velocity (Cobalt). Ahead at start, slightly steeper early curve.
const VELOCITY_PATH =
  "M 60 420 C 200 360, 320 290, 440 230 C 560 170, 660 110, 740 60";

// Value (Carbon). Behind at start, catches up at the midpoint.
const VALUE_PATH =
  "M 60 450 C 200 430, 320 380, 440 250 C 560 170, 660 110, 740 60";

// Phase 1 takes ~1.6s + 0.18s delay. Ambient starts after that.
const AMBIENT_DELAY_MS = 1900;

export function ValueVelocityGraph({
  className,
  height = "100%",
  showAnnotations = true,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();

  // Gate the ambient/looping motion until after the entrance completes.
  // Native SVG <animateMotion> starts immediately on mount, so we only
  // mount the traveling dots once Phase 1 is done.
  const [ambient, setAmbient] = useState(false);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setAmbient(false);
      return;
    }
    const t = setTimeout(() => setAmbient(true), AMBIENT_DELAY_MS);
    return () => clearTimeout(t);
  }, [inView, reduced]);

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

      {/* Axis labels */}
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

      {/* Faint grid */}
      {showAnnotations && (
        <g stroke="currentColor" strokeOpacity="0.04" strokeWidth="1">
          {[160, 260, 360].map((y) => (
            <line key={y} x1="60" y1={y} x2="760" y2={y} />
          ))}
        </g>
      )}

      {/* VALUE curve — drawn first behind velocity */}
      <motion.path
        id="vvg-value-path"
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

      {/* VELOCITY curve — slightly ahead at start */}
      <motion.path
        id="vvg-velocity-path"
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

      {/* Phase 2 ambient — traveling indicator dots ride along each curve.
          Mounted only after Phase 1 finishes so they don't appear during
          the draw-in. SVG-native animateMotion is buttery and doesn't
          recompute on React renders. */}
      {ambient && (
        <>
          {/* Value travel dot — Carbon/Bone (currentColor), slightly muted */}
          <circle r="4.5" fill="currentColor" opacity="0.5">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              rotate="auto"
              begin="0s"
            >
              <mpath href="#vvg-value-path" />
            </animateMotion>
          </circle>
          {/* Velocity travel dot — Cobalt, full opacity, staggered */}
          <circle r="5" fill="var(--color-accent)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              rotate="auto"
              begin="-0.6s"
            >
              <mpath href="#vvg-velocity-path" />
            </animateMotion>
            {/* Subtle accent glow ring on the velocity dot */}
            <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2.6s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      {/* Convergence dot + halo + label */}
      {showAnnotations && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            reduced || inView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 0.5, delay: 0.95, ease: EASE_OUT }}
          style={{ transformOrigin: "440px 240px" }}
        >
          {/* Outer halo — breathing ring during ambient phase */}
          <motion.circle
            cx="440"
            cy="240"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
            initial={{ r: 14, strokeOpacity: 0.4 }}
            animate={
              ambient
                ? { r: [14, 19, 14], strokeOpacity: [0.4, 0.12, 0.4] }
                : { r: 14, strokeOpacity: 0.4 }
            }
            transition={{
              duration: 2.6,
              repeat: ambient ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          {/* Inner dot — pulse during ambient */}
          <motion.circle
            cx="440"
            cy="240"
            r="6"
            fill="var(--color-accent)"
            initial={{ scale: 1 }}
            animate={ambient ? { scale: [1, 1.18, 1] } : { scale: 1 }}
            transition={{
              duration: 2.6,
              repeat: ambient ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "440px 240px" }}
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

      {/* Curve labels — appear after entrance animation */}
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
