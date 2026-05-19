import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";

/**
 * The Operating Model section.
 *
 * Three editorial SVG diagrams that visualize the VWV thesis:
 *   1. Process debt accumulates silently.
 *   2. The wedge — one team owns strategy and execution.
 *   3. The sprint — timebox, milestones, hand-off.
 *
 * Visual language matches ValueVelocityGraph:
 *   currentColor for ink, var(--color-accent) for Cobalt,
 *   sparse hairlines, traveling dots, breathing pulses.
 *
 * Motion family: Organic-Continuous.
 *   Phase 1 — entrance via inView
 *   Phase 2 — ambient loops (3-5s)
 *
 * Reduced-motion safe.
 */

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

type Panel = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  Diagram: React.FC;
};

const panels: Panel[] = [
  {
    n: "01",
    eyebrow: "The diagnosis",
    title: "Process debt accumulates silently.",
    body:
      "Every workflow your team works around is debt. It does not show on the P&L until the day it does. By then the cycle time has doubled and the team has stopped flagging it.",
    Diagram: ProcessDebtDiagram,
  },
  {
    n: "02",
    eyebrow: "The wedge",
    title: "One team. Strategy and execution.",
    body:
      "Strategy firms produce value they cannot ship. Execution firms produce velocity they cannot judge. We sit in the gap on purpose. Same room, same calendar, same signature.",
    Diagram: WedgeDiagram,
  },
  {
    n: "03",
    eyebrow: "The method",
    title: "Hackathon sprint. Days, not retainers.",
    body:
      "Calendar-day booking. Cross-functional crew arrives on-site. Strategy maps the workflow while the build cycle ships in parallel. Deployment lands inside the sprint, not after it.",
    Diagram: SprintDiagram,
  },
];

export function OperatingModel() {
  return (
    <section
      id="model"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-40">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[color:var(--color-accent)]">
              02
            </span>
            <span className="h-px w-12 bg-[color:var(--color-border)]" />
            <p className="eyebrow">The operating model · how it works</p>
          </div>
          <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-4xl text-balance">
            Three moves. One thesis, drawn out.
          </h2>
        </div>

        {/* Panels */}
        <div className="space-y-24 lg:space-y-32">
          {panels.map((p, i) => (
            <PanelRow key={p.n} panel={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelRow({ panel, index }: { panel: Panel; index: number }) {
  const Diagram = panel.Diagram;
  // Z-pattern: even rows diagram-left, odd rows diagram-right
  const reverse = index % 2 === 1;

  return (
    <motion.div
      className="grid gap-10 lg:gap-20 lg:grid-cols-12 items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      {/* Diagram column */}
      <div
        className={`lg:col-span-7 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 aspect-[16/9] flex items-center justify-center overflow-hidden">
          <Diagram />
        </div>
      </div>

      {/* Text column */}
      <div
        className={`lg:col-span-5 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            {panel.n}
          </span>
          <p className="eyebrow">{panel.eyebrow}</p>
        </div>
        <h3 className="font-display font-semibold tracking-tightest leading-[1.05] text-[color:var(--color-text-primary)] text-[clamp(1.5rem,3vw,2.5rem)] text-balance">
          {panel.title}
        </h3>
        <p className="mt-6 text-[15px] lg:text-base leading-relaxed text-[color:var(--color-text-secondary)] text-pretty max-w-md">
          {panel.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 1 — Process Debt
   Five workflow nodes connected horizontally. Below each node a
   "drag line" grows downward, accumulating. Total drag = debt.
   ───────────────────────────────────────────────────────────────── */
function ProcessDebtDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  // Five nodes on a horizontal track
  const nodes = [
    { x: 90, drag: 32 },
    { x: 215, drag: 54 },
    { x: 340, drag: 76 },
    { x: 465, drag: 98 },
    { x: 590, drag: 120 },
  ];
  const trackY = 100;

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 280"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Process debt accumulates across a workflow"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      {/* Track baseline */}
      <motion.line
        x1="60"
        y1={trackY}
        x2="620"
        y2={trackY}
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.0, ease: EASE_OUT, delay: 0.1 }}
      />

      {/* Workflow nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            animate === "visible"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{
            duration: 0.6,
            delay: 0.3 + i * 0.08,
            ease: EASE_OUT,
          }}
          style={{ transformOrigin: `${node.x}px ${trackY}px` }}
        >
          <circle
            cx={node.x}
            cy={trackY}
            r="9"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <circle cx={node.x} cy={trackY} r="3" fill="currentColor" />
        </motion.g>
      ))}

      {/* Drag lines — grow downward, looping */}
      {nodes.map((node, i) => (
        <motion.g key={`drag-${i}`}>
          <motion.line
            x1={node.x}
            y1={trackY + 10}
            x2={node.x}
            y2={trackY + 10}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            strokeLinecap="round"
            initial={{ y2: trackY + 10 }}
            animate={
              animate === "visible" && !reduced
                ? { y2: [trackY + 10, trackY + 10 + node.drag, trackY + 10] }
                : { y2: trackY + 10 + node.drag }
            }
            transition={{
              duration: 4.2,
              delay: 1.0 + i * 0.15,
              repeat: reduced ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Drag terminator dot */}
          <motion.circle
            cx={node.x}
            cy={trackY + 10 + node.drag}
            r="2.5"
            fill="var(--color-accent)"
            initial={{ opacity: 0 }}
            animate={
              animate === "visible"
                ? !reduced
                  ? { opacity: [0, 0.7, 0] }
                  : { opacity: 0.7 }
                : { opacity: 0 }
            }
            transition={{
              duration: 4.2,
              delay: 1.0 + i * 0.15,
              repeat: reduced ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      ))}

      {/* Annotations */}
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <text x="60" y="60" textAnchor="start" style={{ textTransform: "uppercase" }}>
          Workflow
        </text>
        <text x="620" y="60" textAnchor="end" style={{ textTransform: "uppercase" }} fill="var(--color-accent)">
          Debt
        </text>
        <text x="60" y={trackY + 195} textAnchor="start" style={{ textTransform: "uppercase" }} opacity="0.8">
          Cycle time → Cost → Errors
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 2 — The Wedge
   Strategy nodes on left, Execution nodes on right, VWV wedge in
   the middle. Travel dots ride from both sides toward center.
   ───────────────────────────────────────────────────────────────── */
function WedgeDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  const leftX = 90;
  const rightX = 590;
  const centerX = 340;
  const centerY = 140;

  // Strategy nodes (left)
  const leftNodes = [
    { y: 65 },
    { y: 140 },
    { y: 215 },
  ];
  // Execution nodes (right)
  const rightNodes = [
    { y: 65 },
    { y: 140 },
    { y: 215 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 280"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Strategy and execution converging on one team"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      {/* Defs for travel-path geometry */}
      <defs>
        {leftNodes.map((n, i) => (
          <path
            key={`lp-${i}`}
            id={`wedge-left-${i}`}
            d={`M ${leftX} ${n.y} L ${centerX} ${centerY}`}
            fill="none"
          />
        ))}
        {rightNodes.map((n, i) => (
          <path
            key={`rp-${i}`}
            id={`wedge-right-${i}`}
            d={`M ${rightX} ${n.y} L ${centerX} ${centerY}`}
            fill="none"
          />
        ))}
      </defs>

      {/* Connecting lines from left nodes to center */}
      {leftNodes.map((n, i) => (
        <motion.line
          key={`ll-${i}`}
          x1={leftX}
          y1={n.y}
          x2={centerX}
          y2={centerY}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={
            animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }
          }
          transition={{ duration: 1.0, delay: 0.5 + i * 0.05, ease: EASE_OUT }}
        />
      ))}

      {/* Connecting lines from right nodes to center */}
      {rightNodes.map((n, i) => (
        <motion.line
          key={`rl-${i}`}
          x1={rightX}
          y1={n.y}
          x2={centerX}
          y2={centerY}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={
            animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }
          }
          transition={{ duration: 1.0, delay: 0.5 + i * 0.05, ease: EASE_OUT }}
        />
      ))}

      {/* Left column nodes — Strategy */}
      {leftNodes.map((n, i) => (
        <motion.g
          key={`ln-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={
            animate === "visible" ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
          }
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
        >
          <circle
            cx={leftX}
            cy={n.y}
            r="7"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}

      {/* Right column nodes — Execution */}
      {rightNodes.map((n, i) => (
        <motion.g
          key={`rn-${i}`}
          initial={{ opacity: 0, x: 10 }}
          animate={
            animate === "visible" ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }
          }
          transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
        >
          <circle
            cx={rightX}
            cy={n.y}
            r="7"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}

      {/* Center wedge — Cobalt diamond shape */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          animate === "visible"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 0.8, delay: 1.3, ease: EASE_OUT }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      >
        {/* Halo — breathing */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="22"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          initial={{ strokeOpacity: 0.4 }}
          animate={
            animate === "visible" && !reduced
              ? { r: [22, 28, 22], strokeOpacity: [0.4, 0.1, 0.4] }
              : { r: 22, strokeOpacity: 0.4 }
          }
          transition={{
            duration: 3.2,
            repeat: reduced ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Diamond */}
        <motion.rect
          x={centerX - 9}
          y={centerY - 9}
          width="18"
          height="18"
          fill="var(--color-accent)"
          initial={{ rotate: 45 }}
          animate={{ rotate: 45 }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />
      </motion.g>

      {/* Travel dots — left side converging */}
      {animate === "visible" && !reduced &&
        leftNodes.map((_, i) => (
          <circle
            key={`tl-${i}`}
            r="3"
            fill="currentColor"
            opacity="0.7"
          >
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.4}s`}
              keyTimes="0;1"
              keyPoints="0;1"
              calcMode="linear"
            >
              <mpath href={`#wedge-left-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="3.4s"
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.4}s`}
            />
          </circle>
        ))}

      {/* Travel dots — right side converging */}
      {animate === "visible" && !reduced &&
        rightNodes.map((_, i) => (
          <circle
            key={`tr-${i}`}
            r="3"
            fill="var(--color-accent)"
            opacity="0.85"
          >
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.4 + 0.2}s`}
              keyTimes="0;1"
              keyPoints="0;1"
              calcMode="linear"
            >
              <mpath href={`#wedge-right-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.85;0"
              dur="3.4s"
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.4 + 0.2}s`}
            />
          </circle>
        ))}

      {/* Labels */}
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <text x={leftX} y="40" textAnchor="middle" style={{ textTransform: "uppercase" }}>
          Strategy
        </text>
        <text x={rightX} y="40" textAnchor="middle" style={{ textTransform: "uppercase" }}>
          Execution
        </text>
      </motion.g>
      <motion.g
        fill="var(--color-accent)"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <text x={centerX} y={centerY + 50} textAnchor="middle" style={{ textTransform: "uppercase" }}>
          One team
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 3 — The Sprint
   Horizontal timebox with day markers, milestones, and a Cobalt
   progress fill that travels left to right, pulsing milestones
   as it passes them.
   ───────────────────────────────────────────────────────────────── */
function SprintDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  const trackY = 140;
  const trackX1 = 60;
  const trackX2 = 620;

  const milestones = [
    { x: 130, label: "Intro", y: trackY - 30 },
    { x: 230, label: "Map", y: trackY + 40 },
    { x: 340, label: "Build", y: trackY - 30 },
    { x: 450, label: "Ship", y: trackY + 40 },
    { x: 565, label: "KPI", y: trackY - 30 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 280"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Sprint timebox with milestones from intro to KPI handover"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      {/* Track outline */}
      <rect
        x={trackX1}
        y={trackY - 6}
        width={trackX2 - trackX1}
        height="12"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1"
      />

      {/* Progress fill — animates left to right, loops */}
      <motion.rect
        x={trackX1 + 1}
        y={trackY - 5}
        height="10"
        rx="5"
        fill="var(--color-accent)"
        fillOpacity="0.85"
        initial={{ width: 0 }}
        animate={
          animate === "visible"
            ? !reduced
              ? { width: [0, trackX2 - trackX1 - 2, trackX2 - trackX1 - 2] }
              : { width: trackX2 - trackX1 - 2 }
            : { width: 0 }
        }
        transition={{
          duration: 5.2,
          delay: 0.6,
          times: [0, 0.85, 1],
          repeat: reduced ? 0 : Infinity,
          repeatDelay: 1.6,
          ease: "easeInOut",
        }}
      />

      {/* Leading edge indicator — bright dot at the head of the fill */}
      {!reduced && (
        <motion.circle
          cy={trackY}
          r="7"
          fill="var(--color-accent)"
          initial={{ cx: trackX1, opacity: 0 }}
          animate={
            animate === "visible"
              ? {
                  cx: [trackX1, trackX2 - 1, trackX2 - 1],
                  opacity: [0, 1, 0],
                }
              : { cx: trackX1, opacity: 0 }
          }
          transition={{
            duration: 5.2,
            delay: 0.6,
            times: [0, 0.85, 1],
            repeat: Infinity,
            repeatDelay: 1.6,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Day tick marks */}
      {[trackX1, 165, 290, 415, 540, trackX2].map((x, i) => (
        <motion.line
          key={`tick-${i}`}
          x1={x}
          x2={x}
          y1={trackY - 12}
          y2={trackY - 8}
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={
            animate === "visible" ? { opacity: 0.25 } : { opacity: 0 }
          }
          transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
        />
      ))}

      {/* Milestones — alternate above/below track */}
      {milestones.map((m, i) => {
        const isAbove = m.y < trackY;
        return (
          <motion.g
            key={`m-${i}`}
            initial={{ opacity: 0, y: isAbove ? 8 : -8 }}
            animate={
              animate === "visible"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: isAbove ? 8 : -8 }
            }
            transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: EASE_OUT }}
          >
            {/* Connector tick */}
            <line
              x1={m.x}
              x2={m.x}
              y1={trackY + (isAbove ? -8 : 8)}
              y2={m.y + (isAbove ? 6 : -6)}
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            {/* Milestone label */}
            <text
              x={m.x}
              y={m.y}
              textAnchor="middle"
              fill="currentColor"
              fontFamily='"Geist Mono", ui-monospace, monospace'
              fontSize="11"
              letterSpacing="2"
              opacity="0.7"
              style={{ textTransform: "uppercase" }}
            >
              {m.label}
            </text>
          </motion.g>
        );
      })}

      {/* Top and bottom annotations */}
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <text x={trackX1} y="50" textAnchor="start" style={{ textTransform: "uppercase" }}>
          Day 1
        </text>
        <text x={trackX2} y="50" textAnchor="end" style={{ textTransform: "uppercase" }} fill="var(--color-accent)">
          Hand-off
        </text>
        <text x={trackX1} y={trackY + 110} textAnchor="start" style={{ textTransform: "uppercase" }} opacity="0.8">
          Calendar-day timebox
        </text>
      </motion.g>
    </svg>
  );
}
