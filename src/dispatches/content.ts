import type { Dispatch } from "./types";

/**
 * The dispatches. Each is a self-contained editorial piece written in brand
 * voice: confident, outcomes-first, technically specific, allergic to slide
 * decks. New essays go at the top of the array.
 */
export const dispatches: Dispatch[] = [
  {
    slug: "sprints-not-engagements",
    kind: "Essay",
    tag: "Operating model",
    date: "2026-05-14",
    dateLabel: "2026 · 05 · 14",
    minutes: 12,
    title:
      "Why we sell sprints, not engagements. What changes the day you do.",
    deck:
      "Engagements are open-ended. Sprints are falsifiable. The shift from one to the other reorganises scope, pricing, and accountability in a single move.",
    body: [
      {
        type: "lede",
        text: "The day we stopped writing the words Statement of Work was the day our pipeline became readable. A Statement of Work invites a buyer into a relationship of unknown duration. A Sprint Plan invites a buyer into a contract of known shape: this is what we will ship, this is when we will ship it, this is the number that will move when we do.",
      },
      {
        type: "p",
        text: "Most consulting is sold as an engagement. The word is doing a lot of work, and it is doing it for the seller. Engagements have no end. They have phases, extensions, follow-ups, retainers. The day an engagement starts, no one can tell you with confidence the day it ends, and no one can tell you which number on the business will move because of it. The buyer accepts this because the alternative on offer is usually worse.",
      },
      {
        type: "p",
        text: "A sprint is the alternative. A sprint has a fixed scope, a fixed price, a fixed duration, and a fixed metric. The metric is named in the first paragraph of the plan and reported every week. The scope cannot grow without a new sprint. The duration cannot stretch without breaking the contract. The price does not move because there is no clock to bill against.",
      },
      { type: "divider" },
      {
        type: "h2",
        text: "What this changes for the buyer",
      },
      {
        type: "p",
        text: "The first thing a sprint changes is what the buyer is allowed to ask. Engagements force buyers to ask vague questions because they have no shared object to point at. Sprints give them a shared object: the one-page plan. Now the questions are sharp. What happens if Cycle Time does not move? What is the exit if Week Three reports red on Manual Error Rate? Why is OPEX not on the plan? Those are the right questions, and an engagement structure makes them unaskable.",
      },
      {
        type: "p",
        text: "The second thing it changes is procurement. A sprint is a fixed-price line item with a fixed end date. It moves through procurement at the speed of any other capital expense. Engagements move at the speed of legal review on indefinite obligations, which is to say: not at the speed of velocity.",
      },
      {
        type: "callout",
        label: "Field note",
        text: "The CFO test: read your scope of work to your CFO. If the CFO cannot tell you when the work ends and which line on the P&L will move when it does, you have written an engagement, not a sprint.",
      },
      {
        type: "h2",
        text: "What this changes for the seller",
      },
      {
        type: "p",
        text: "The seller is the one whose life changes most. Engagements reward time on the clock. Sprints reward speed to outcome. The economic incentive flips: the faster you ship a sprint, the more sprints you can sell against a fixed roster of people. You start to design your operation around shipping, not around staying.",
      },
      {
        type: "p",
        text: "A sprint also makes your case studies trivial to write. Each one is the same five lines. Problem. Sprint. Cycle Time delta. OPEX delta. Manual Error Rate delta. There is nothing to embellish because there is nothing to hide.",
      },
      {
        type: "h2",
        text: "How a sprint is structured",
      },
      {
        type: "ol",
        items: [
          "A one-page plan, signed before kick-off. The plan names the workflow being rebuilt, the three metrics being moved, the team being deployed, the date being committed.",
          "A weekly receipts call. Fifteen minutes. The three metrics are read out. The buyer asks the sharp questions. The team commits to next week's deltas.",
          "A close-out shipment. The new workflow runs in production. The buyer owns the system. The final receipts are signed. The next sprint, if there is one, is scoped on the same page.",
        ],
      },
      {
        type: "h2",
        text: "When sprints do not work",
      },
      {
        type: "p",
        text: "Sprints are not for every problem. They do not work on questions that have no metric. They do not work on transformations whose value is real but whose value is unmeasurable for two years. They do not work when the buyer has not yet decided whether the workflow should exist at all.",
      },
      {
        type: "p",
        text: "For everything else — the AI deployment that needs to ship by Q-end, the workflow that is bleeding OPEX, the manual reconciliation costing twelve hours a week — sprints are the structure. Engagements were how the old generation sold consulting. Sprints are how the new generation ships work.",
      },
      {
        type: "signature",
        text: "Filed under Operating model. Read next: The three numbers that should anchor every AI deployment.",
      },
    ],
  },

  {
    slug: "three-numbers-ai-deployment",
    kind: "Dispatch",
    tag: "Measurement",
    date: "2026-05-01",
    dateLabel: "2026 · 05 · 01",
    minutes: 6,
    title:
      "The three numbers that should anchor every AI deployment in your org.",
    deck:
      "Cycle Time. OPEX. Manual Error Rate. Anything else on the dashboard is decoration. Here is why these three, how to instrument them, and what to do when only one moves.",
    body: [
      {
        type: "lede",
        text: "Most AI deployments fail twice. First in production, where the model misbehaves. Second on the metric report, where nobody can read whether the deployment was worth the effort. The first failure is forgivable. The second is the reason organisations stop deploying.",
      },
      {
        type: "p",
        text: "The fix is to commit to three numbers, in writing, before the deployment begins. Not four. Not eight. Three. Each one names a different category of business value, and together they cover the entire surface area worth measuring.",
      },
      {
        type: "h2",
        text: "1. Cycle Time",
      },
      {
        type: "p",
        text: "Cycle Time is the time from work-arrival to work-complete on a named workflow. If you do not have a named workflow, you do not have a Cycle Time, and you have not yet defined the problem precisely enough to ship a solution.",
      },
      {
        type: "p",
        text: "Cycle Time screens out an enormous class of bad AI deployments. If a deployment cannot reduce a Cycle Time, it is not making the business faster. If it is not making the business faster, it is making the business decorative. Velocity is the product. If velocity is not moving, the deployment is not earning its keep.",
      },
      {
        type: "kpi",
        rows: [
          { k: "Anchor question", v: "How long does this workflow take, start to finish?" },
          { k: "Unit", v: "Hours, days, or weeks. Whatever is the natural unit." },
          { k: "Reported", v: "Weekly, on the receipts call." },
        ],
      },
      {
        type: "h2",
        text: "2. OPEX Reduction",
      },
      {
        type: "p",
        text: "OPEX captures the cost side. A deployment that speeds up a workflow but costs the same as the team it replaced is a moral victory, not a business one. OPEX is the number that proves the work has compounded into the income statement.",
      },
      {
        type: "p",
        text: "Annualised OPEX delta, in dollars, is the right framing. Hours saved is not the right framing because hours are reallocated to the next problem rather than removed from the budget. The CFO is buying dollars, not hours.",
      },
      {
        type: "kpi",
        rows: [
          { k: "Anchor question", v: "What recurring line on the budget does this deployment shrink?" },
          { k: "Unit", v: "Annualised dollars." },
          { k: "Reported", v: "Sprint close, with a CFO sign-off." },
        ],
      },
      {
        type: "h2",
        text: "3. Manual Error Rate",
      },
      {
        type: "p",
        text: "Manual Error Rate is the quality number. A deployment can be fast and cheap and wrong. Manual Error Rate is the proof that the new workflow is at least as correct as the old one, ideally more correct, and that the correctness can be measured without taking somebody's word for it.",
      },
      {
        type: "p",
        text: "The definition of an error is workflow-specific. For reconciliation, an error is a mismatch that requires human re-entry. For underwriting, an error is a decision that is overturned on review. For onboarding, an error is a customer record that must be corrected within thirty days. Whatever the definition, it is written down before the sprint begins.",
      },
      {
        type: "kpi",
        rows: [
          { k: "Anchor question", v: "What is an error in this workflow, and how often does it happen?" },
          { k: "Unit", v: "Percentage of total work units, or absolute count per week." },
          { k: "Reported", v: "Weekly. Anomalies are escalated within 24 hours." },
        ],
      },
      { type: "divider" },
      {
        type: "h2",
        text: "What to do when only one number moves",
      },
      {
        type: "p",
        text: "Sometimes Cycle Time drops but OPEX is flat. This means the deployment is fast but the team is still in place. Either the team is being reallocated to higher-value work, which is fine but should be named, or the deployment has not actually replaced the work, which is a failure mode.",
      },
      {
        type: "p",
        text: "Sometimes OPEX drops but Manual Error Rate climbs. This means the deployment is cheap and wrong. The system is rejecting fewer cases that should be rejected, or accepting more cases that should be reviewed. The deployment is over-trusted. Pull back the autonomy until error rate is recovered, then push forward again with monitoring.",
      },
      {
        type: "p",
        text: "Sometimes Manual Error Rate drops but Cycle Time is flat. This means the deployment has added a safety layer without removing any human steps. Useful, but not the same as velocity. The work is still being done by people.",
      },
      {
        type: "callout",
        label: "Rule of thumb",
        text: "If only one number moves and the other two are flat, the deployment is half-finished. If two of three numbers move in the wrong direction, the deployment is a regression, not a launch. Roll back.",
      },
      {
        type: "h2",
        text: "Why these three and not others",
      },
      {
        type: "p",
        text: "Adoption rate, model accuracy, user satisfaction, NPS — these are real numbers, but they are not anchor numbers. They tell you whether the deployment is being used. They do not tell you whether the deployment is earning its keep on the business. The three anchor numbers tell you that, and they tell you in a vocabulary the CFO and the engineering team can both read.",
      },
      {
        type: "p",
        text: "Use the secondary numbers for diagnosis, never for justification. If the three anchor numbers do not move, no amount of secondary-metric storytelling will save the deployment. And if the three anchor numbers do move, no amount of secondary-metric concern will sink it.",
      },
      {
        type: "signature",
        text: "Filed under Measurement. Read next: Why we sell sprints, not engagements.",
      },
    ],
  },

  {
    slug: "documentation-is-a-tax",
    kind: "Field note",
    tag: "Method",
    date: "2026-04-18",
    dateLabel: "2026 · 04 · 18",
    minutes: 4,
    title:
      "Process documentation is a tax. Process disruption is the dividend.",
    deck:
      "Mapping current state is necessary, but it is not the work. The work begins where the swim-lane diagram ends, and most consulting stops there.",
    body: [
      {
        type: "lede",
        text: "The eighty-page process audit is a souvenir of the work you did not do. It is well-bound, neatly diagrammed, and structurally identical to the audit the last firm delivered four years ago. It catalogues the workflow in exhausting detail. It does not change the workflow.",
      },
      {
        type: "p",
        text: "Mapping current state has a function. It tells you what exists. It tells you who owns which step. It tells you where the queue is. These are useful facts. They are not the work. The work is rebuilding the workflow so that the queue is shorter, the steps are fewer, and the ownership is consolidated.",
      },
      {
        type: "h2",
        text: "Why documentation survives",
      },
      {
        type: "p",
        text: "Documentation survives because it is safe. The map is delivered, the deck is signed off, the firm goes home. Nothing in the business has changed, so nothing in the business can fail. The audit becomes a reference document that nobody opens, except to argue that the next firm should be hired to act on it.",
      },
      {
        type: "p",
        text: "Disruption is the opposite of safe. Disruption means the workflow no longer runs the way it ran on the day you arrived. Somebody has to operate the new version. Something will go wrong on the first Tuesday. The audit-firm contract is structured to avoid this. The sprint contract is structured to absorb it.",
      },
      {
        type: "callout",
        label: "Heuristic",
        text: "If the deliverable is a PDF, it is a tax. If the deliverable is a running system, it is a dividend.",
      },
      {
        type: "h2",
        text: "Skip the swim-lane, build the new path",
      },
      {
        type: "p",
        text: "In a sprint we look at current state long enough to find the queue, the bottleneck, and the error source. That is usually two or three working days, not two or three months. From that point on, the work is constructive: build the new path, retire the old one, train the people who operate at the boundary, sign off the receipts.",
      },
      {
        type: "p",
        text: "The new path is its own documentation. A workflow that runs in production teaches the team how it runs by running. The artifact is the system, not the audit of the system. The audit, if anyone wants one, can be generated from the system later, in an afternoon, by someone who actually uses it.",
      },
      {
        type: "h2",
        text: "The cost of the tax",
      },
      {
        type: "p",
        text: "Documentation is not free. It costs money to produce, it costs attention to read, it costs credibility when the next thing you want to ship runs into the cohort of stakeholders who remember the last audit and are wary of more paper. Every audit you ship without a deployment behind it makes the next deployment harder to sell.",
      },
      {
        type: "p",
        text: "Conversely, every workflow you rebuild and ship makes the next one easier. The dividend compounds. The tax does not.",
      },
      {
        type: "signature",
        text: "Filed under Method. Read next: What AI-native actually means when there is no slide to hide behind.",
      },
    ],
  },

  {
    slug: "ai-native-no-slide",
    kind: "Essay",
    tag: "Architecture",
    date: "2026-03-30",
    dateLabel: "2026 · 03 · 30",
    minutes: 9,
    title:
      "What AI-native actually means when there is no slide to hide behind.",
    deck:
      "The phrase has become a description of pitch decks, not architectures. Here is what it means when you have to deploy on Monday.",
    body: [
      {
        type: "lede",
        text: "AI-native is the most overused adjective in enterprise software, and the most under-defined. It appears on landing pages, in board decks, on the side of mugs. It rarely appears in architecture diagrams, because architecture diagrams do not let you hide behind a font choice.",
      },
      {
        type: "p",
        text: "A system is AI-native when removing the model from the system causes the system to stop, not slow down. A system is AI-bolted-on when removing the model causes the system to revert to its previous workflow, the one that ran before the model arrived. The distinction is binary, observable, and almost always misrepresented in marketing copy.",
      },
      {
        type: "h2",
        text: "Three signals an organisation has actually built AI-native architecture",
      },
      {
        type: "ol",
        items: [
          "The model is in the data path, not adjacent to it. AI-native systems route work through the model. AI-bolted-on systems route work past the model and use the output for suggestions, summaries, or analytics. If the workflow runs without the model, the model is decoration.",
          "The orchestration is stateful and tool-aware. AI-native systems treat the model as one node in a graph of tool calls, evaluators, and fallbacks. There is a state machine. There is a notion of a step that succeeded and a step that did not. There is a clear handoff to a human at the boundaries where the model cannot proceed safely. AI-bolted-on systems treat the model as a chat box.",
          "Evaluation is continuous, not episodic. AI-native systems run evals on every production trace. Pass rates, regression rates, hallucination rates are tracked as first-class operational metrics, on the same dashboards as latency and error rate. AI-bolted-on systems run evals when somebody asks why the output got worse.",
        ],
      },
      {
        type: "h2",
        text: "What this looks like in practice",
      },
      {
        type: "p",
        text: "A finance-ops reconciliation workflow rebuilt the AI-native way looks like this. A transaction arrives. It is routed to an orchestration layer. The orchestrator calls a classifier model to decide which of the seven sub-workflows applies. The classifier returns with a confidence score. If the score is above a threshold, the work is routed to a tool-calling agent that completes the sub-workflow autonomously. If the score is below the threshold, the work is routed to a human queue with the classifier's reasoning attached.",
      },
      {
        type: "p",
        text: "Every step writes to a trace store. Every trace is evaluated overnight against a held-out test set. Drift, regression, and pass-rate changes are visible on the same dashboard the finance team uses to watch Manual Error Rate. The workflow does not exist without the model: the routing, the autonomous completion, the threshold logic are all collapsed when the model is removed. That is the test.",
      },
      {
        type: "callout",
        label: "The migration test",
        text: "If you have to migrate it, it is not native. AI-native architectures are designed from the first sketch around the model. AI-bolted-on architectures are described as AI-native after they have shipped, which is the giveaway.",
      },
      {
        type: "h2",
        text: "Why the distinction matters",
      },
      {
        type: "p",
        text: "It matters because the two architectures fail in opposite ways and require opposite responses. AI-native systems fail loudly: a model regression breaks the workflow and the operations team sees it within minutes. AI-bolted-on systems fail quietly: the model output is ignored and the underlying workflow continues, gradually accumulating the same kind of process debt the model was supposed to retire.",
      },
      {
        type: "p",
        text: "It also matters because the economics are different. AI-native systems compound. Each evaluation cycle improves the model, the routing, the thresholds. AI-bolted-on systems do not compound. The model is a feature, not a substrate. The next quarter's improvement comes from the team that built the bolted layer, not from the model itself.",
      },
      {
        type: "h2",
        text: "How to tell, in a single question",
      },
      {
        type: "p",
        text: "Ask the operator of the workflow this. If the model went away tonight, what would happen tomorrow? If the answer is the workflow stops, you have AI-native architecture. If the answer is the team handles it the way they used to, you have AI-bolted-on architecture and you are paying twice: once for the model, and once for the original workflow that still exists underneath it.",
      },
      {
        type: "p",
        text: "There is nothing wrong with AI-bolted-on as a transitional state. There is everything wrong with claiming it as the destination. The phrase AI-native has a meaning. It is worth using it only when it is true.",
      },
      {
        type: "signature",
        text: "Filed under Architecture. Read next: Process documentation is a tax. Process disruption is the dividend.",
      },
    ],
  },
];

export function getDispatch(slug: string) {
  return dispatches.find((d) => d.slug === slug);
}

export function getRelated(slug: string, count = 2) {
  const idx = dispatches.findIndex((d) => d.slug === slug);
  if (idx === -1) return dispatches.slice(0, count);
  // Pick the two nearest neighbours in publication order.
  const neighbours = [dispatches[idx - 1], dispatches[idx + 1]].filter(
    Boolean
  ) as Dispatch[];
  while (neighbours.length < count) {
    const fill = dispatches.find(
      (d) => d.slug !== slug && !neighbours.includes(d)
    );
    if (!fill) break;
    neighbours.push(fill);
  }
  return neighbours.slice(0, count);
}

export function getPrevNext(slug: string) {
  const idx = dispatches.findIndex((d) => d.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: dispatches[idx + 1] ?? null,   // older
    next: dispatches[idx - 1] ?? null,   // newer
  };
}
