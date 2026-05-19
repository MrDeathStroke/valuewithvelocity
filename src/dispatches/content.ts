import type { Dispatch } from "./types";

/**
 * The dispatches. Each is a self-contained editorial piece written in brand
 * voice: confident, outcomes-first, technically specific, allergic to slide
 * decks. New essays go at the top of the array.
 */
export const dispatches: Dispatch[] = [
  {
    slug: "template-era-ending",
    kind: "Essay",
    tag: "Manifesto",
    date: "2026-05-19",
    dateLabel: "2026 · 05 · 19",
    minutes: 14,
    title: "The template era is ending. What replaces it.",
    deck:
      "Salesforce, micro-SaaS, the whole stack of templated tools sold non-tech firms a deal that worked for two decades. That deal is over. Two things broke it. The next decade of operations gets built differently.",
    body: [
      {
        type: "lede",
        text: "For twenty years, the deal was simple. Non-tech firms paid the template tax. They rented a CRM, an HRMS, a project tool, a marketing platform. They moulded their operations to the template because building their own software was a decade-long project they could not afford. The template won by default. It was the only thing available.",
      },
      {
        type: "p",
        text: "Look around. The deal is over. Two things broke it and a third changed the shape of who can take advantage.",
      },
      { type: "divider" },
      { type: "h2", text: "The first break: differentiation moved into operations" },
      {
        type: "p",
        text: "Twenty years ago, two companies on the same street ran the same processes. The luxury jeweller on Mirzapur Road did inventory the same way as the one down the lane. The hospitality chain on the highway booked guests the same way as the chain across the road. The supply-chain operator out of Bhiwandi tracked shipments with the same playbook as everyone else in the gali. Sameness was the cost of belonging to a category.",
      },
      {
        type: "p",
        text: "It is not like that anymore. Two restaurants on the same lane in Lower Parel run wildly different workflows for table turnover, reservation management, supplier negotiation, food-cost tracking, social-media response. One closes books in three days; one takes nine. One reads its own data; one ships reports to a consultant who reads them back. The unique selling proposition moved off the menu and into the operations. Customers can feel the difference even when they cannot name it.",
      },
      {
        type: "callout",
        label: "The shift",
        text: "Differentiation used to live on the storefront. Now it lives in the workflow. The template was built for sameness, and sameness no longer wins.",
      },
      { type: "h2", text: "The second break: bespoke got cheap" },
      {
        type: "p",
        text: "A custom software build, in 2010, looked like this. Twelve engineers. Eighteen months. A product manager who left halfway. A QA team. A devops engineer who joined month nine. Total cost north of a crore, often two. Most non-tech firms could not justify the bet. They paid the template tax instead.",
      },
      {
        type: "p",
        text: "The same build, today, looks like this. Four people. Eight weeks. AI agents handle the boilerplate, the integrations, the test scaffolding, the documentation. The team spends time on the parts that actually need taste: the workflow design, the edge cases, the operator hand-off. The economics inverted in five years. Bespoke is now cheaper than the template, faster than the template, and built around the workflow the company actually runs.",
      },
      {
        type: "kpi",
        rows: [
          { k: "Cost", v: "Down 70-85% versus a 2010 custom build" },
          { k: "Time", v: "Eight weeks where eighteen months used to live" },
          { k: "Fit", v: "Built around the workflow, not vice-versa" },
        ],
      },
      { type: "h2", text: "The third change: who can take the deal" },
      {
        type: "p",
        text: "Here is the catch. Just because bespoke is cheap does not mean non-tech firms can build it themselves. They never developed the in-house capability. Their IT teams maintain SaaS subscriptions and Excel. Their finance teams export CSVs. There is no architecture practice, no eval pipeline, no orchestration layer, no anyone-on-staff who has ever shipped an AI agent that calls tools across the company stack.",
      },
      {
        type: "p",
        text: "The new deal requires a partner. Specifically, a partner with both sides: business depth to read the workflow correctly, and tech depth to ship the bespoke replacement. That partner is structurally rare. The strategy industry has the first half and not the second. The dev-shop industry has the second half and not the first. Whoever owns both, owns the next decade.",
      },
      {
        type: "callout",
        label: "The wedge",
        text: "Bespoke is now cheap. But the buyer cannot build it alone. The market belongs to whoever rejoins strategy and execution under one roof.",
      },
      { type: "h2", text: "What the next ten years look like" },
      {
        type: "p",
        text: "The template economy does not disappear. Salesforce will still sell licences. Twelve years from now, a horizontal CRM will still exist for companies whose workflows really are commoditised. But the centre of gravity moves. The companies that win in the next decade are the ones who treat their operations as their own software, not as someone else's product roadmap. They invest in bespoke replacements for the templates that no longer serve them. They hire partners who can deliver both halves of the equation in one sprint.",
      },
      {
        type: "p",
        text: "Below that line, an entire category of vendor is in trouble. The micro-SaaS that solved one workflow function with a template lacks a moat. The HRMS vendor charging eight dollars per seat per month watches AI-native HR agents deliver the same outcome embedded in the firm's own system, for less, with better fit. The mid-market CRM watches non-tech firms commission their own customer-data platforms because the workflow is now too specific to share.",
      },
      {
        type: "p",
        text: "We are not predicting the end of SaaS. We are predicting the end of the SaaS template's grip on workflows that should never have been templated. The two are different. The first is a category. The second is a stranglehold.",
      },
      { type: "h2", text: "What we built VWV to do" },
      {
        type: "p",
        text: "VWV is built on the bet that the next decade pays partners who own both sides of the work. Strategy and execution in one team, one sprint, one signature. The hackathon-style sprint runs on the client's premises with their major stakeholders in the room. The parallel software cycle ships during the sprint, not after. The deliverable is a bespoke system the client owns, configured against KPIs we signed for on day one.",
      },
      {
        type: "p",
        text: "We picked the sectors deliberately. Sales-led organisations. Manufacturing. Real estate. Healthcare. Hospitality. Restaurants. Entertainment. Luxury jewellers. Direct-to-consumer ecom. Offline events. Education. Production companies. Supply chain. These are the firms the template era served worst and that AI-built bespoke serves best.",
      },
      {
        type: "p",
        text: "The template era is ending. The bespoke era replaces it. The firms that get there first will look unfair to the ones that arrive late.",
      },
      {
        type: "signature",
        text: "Filed under Manifesto. Read next: Process debt is the line nobody measures.",
      },
    ],
  },
  {
    slug: "process-debt",
    kind: "Essay",
    tag: "Manifesto",
    date: "2026-05-19",
    dateLabel: "2026 · 05 · 19",
    minutes: 11,
    title: "Process debt is the line nobody measures.",
    deck:
      "Every operations team carries it. Almost none measure it. It is the largest unrecorded cost on the P&L of every non-tech firm we have walked into. Here is the term, the definition, and the way to instrument it.",
    body: [
      {
        type: "lede",
        text: "Technical debt has a name because engineering teams agreed to give it one. Every engineering org tracks it, complains about it, prioritises sprints around it. The shared vocabulary makes the cost visible. Visible costs get managed. Invisible costs do not. Operations teams across non-tech firms carry an equivalent burden and have no shared name for it. We call it process debt. It is the line on the P&L nobody measures.",
      },
      { type: "h2", text: "What process debt is" },
      {
        type: "p",
        text: "Process debt is the accumulated weight of workarounds, swivel-chair handoffs, manual reconciliations, undocumented exceptions, and 'we do it this way because Rajesh used to do it that way' that sits inside an operations team. It is the answer to the question: why does this workflow take longer this year than it did last year, even though the volume is the same?",
      },
      {
        type: "p",
        text: "Some examples we have personally watched accumulate.",
      },
      {
        type: "ul",
        items: [
          "Month-end financial close requiring three FTEs to manually reconcile entries across two ERPs because nobody documented the merger integration eighteen months ago.",
          "A real-estate sales workflow where six brokers email different versions of the same lead spreadsheet to a centralised inbox that nobody owns.",
          "A hospitality group running three booking systems because each property was acquired separately and nobody has retired the legacy ones.",
          "A luxury jeweller tracking custom-order specifications on WhatsApp because the CRM does not handle the field structure their artisans need.",
          "A supply-chain operator manually re-keying data between their TMS and their customer's portal twice a week because the API requires authentication credentials that expired last quarter.",
        ],
      },
      {
        type: "p",
        text: "Every one of these costs money. Most of them are uncomplained-about because the people doing the work do not see the alternative. The cost compounds quietly. It is what makes a fast-growing business feel slower every year.",
      },
      { type: "h2", text: "Why nobody measures it" },
      {
        type: "p",
        text: "Three structural reasons. First, the cost is distributed across many small workflows, none of which crosses a single threshold large enough to attract executive attention. Second, the cost is paid in time, not cash, and time costs do not show up on the P&L the same way contractor invoices do. Third, the people who feel the cost most directly are operators with no budget authority. The people with budget authority do not feel it.",
      },
      {
        type: "p",
        text: "The result is a P&L that looks healthy and an organisation that runs progressively slower. Process debt does not show up in the audit report. It shows up in the inability to scale.",
      },
      { type: "h2", text: "How to instrument it" },
      {
        type: "p",
        text: "Process debt is invisible by default. To make it visible, you have to pick a workflow and measure three things against it.",
      },
      {
        type: "kpi",
        rows: [
          { k: "Cycle time", v: "How long does the workflow take, end to end, today" },
          { k: "Touch count", v: "How many distinct human interventions does it require" },
          { k: "Manual error rate", v: "What percentage of work units come back for rework" },
        ],
      },
      {
        type: "p",
        text: "Together, these three numbers tell you what the workflow is costing you. Cycle time tells you the velocity tax. Touch count tells you the headcount tax. Manual error rate tells you the quality tax. The product of the three is the process-debt load on that workflow.",
      },
      {
        type: "p",
        text: "Instrument three or four critical workflows this way and you have an operational dashboard most non-tech firms have never possessed. The first time you run the numbers, the result is usually uncomfortable. Workflows the team had been calling 'fine' turn out to carry six-figure annualised drag. That is the point. Process debt management starts with measurement, because debt that is not measured does not get paid down.",
      },
      { type: "h2", text: "How VWV retires it" },
      {
        type: "p",
        text: "A Build sprint is structured around a single workflow's process debt. The first three days on-premises are spent mapping the workflow as it actually runs, not as the org chart says it runs. Touch points get counted. Cycle time gets timed. Error rate gets defined. The baseline is signed before any code ships.",
      },
      {
        type: "p",
        text: "Then the workflow gets rebuilt around AI orchestration: agents handle the boilerplate decisions, humans handle the boundaries that need judgement, evals run continuously against held-out test cases. The same three numbers get measured against the new workflow. The deltas are what the CFO signs on close-out.",
      },
      {
        type: "p",
        text: "Process debt is the line nobody measures. We measure it, we retire it, we hand over a dashboard that keeps it from coming back. That is the work.",
      },
      {
        type: "signature",
        text: "Filed under Manifesto. Read next: The template era is ending.",
      },
    ],
  },
  {
    slug: "strategy-execution-split",
    kind: "Essay",
    tag: "Manifesto",
    date: "2026-05-19",
    dateLabel: "2026 · 05 · 19",
    minutes: 10,
    title: "Strategy firms can't ship. Execution firms can't strategise.",
    deck:
      "The split is structural. Two industries, two budgets, two KPIs, two buildings. The split is also the largest single source of waste in the consulting market. Here is why it persists, why AI changed the calculus, and what one team that owns both looks like in practice.",
    body: [
      {
        type: "lede",
        text: "If you are buying advice from a strategy firm and execution from a dev shop, you are paying for two halves of a transaction that should be one. The cost of the split is hidden in the handoff. By the time the strategy reaches the people who have to ship it, the strategy has aged, the budget has been spent on slides, and the dev shop is interpreting a document written by people who will not be in the room when the workflow goes live. The handoff is where value goes to die.",
      },
      { type: "h2", text: "Why the split exists" },
      {
        type: "p",
        text: "The split is not stupid. It is structural. Strategy firms were built around partners with two decades of pattern-matching experience and the willingness to bill at four-figure hourly rates. Their economics depend on selling judgement. Execution firms were built around the opposite economics: ratecard pricing, billable utilisation, a workforce trained in delivery against fixed specs. Their economics depend on selling capacity. The two business models are incompatible. So they live in different buildings.",
      },
      {
        type: "p",
        text: "The buyer pays for the gap. Twice. Once when the strategy is bought. Again when the strategy has to be translated into a brief for the execution firm, which charges by the hour to interpret the brief and ship against it. The total cost of the engagement is the sum of two industries' margins, plus the cost of the translation layer between them, plus the cost of the time lost while everyone catches up to a strategy that was approved months earlier.",
      },
      {
        type: "callout",
        label: "The hidden cost",
        text: "The handoff is not free. It is where the strategy ages, the velocity dies, and the budget is spent twice on a single decision.",
      },
      { type: "h2", text: "Why the calculus changed" },
      {
        type: "p",
        text: "Three things shifted under our feet. Each one weakened the case for the split.",
      },
      {
        type: "ol",
        items: [
          "AI collapsed the delivery cost of execution. A workflow that used to need twelve engineers now needs four. A four-person team can be led by an operator who is also a strategist. The team becomes small enough to be cross-functional by default, not by aspiration.",
          "Strategy turned into evaluation. Where it used to be 'what should we do' it is now 'which of these three implementations should we ship.' The question collapses if the team that picks the strategy is also the team that builds the prototypes. The strategy becomes the build.",
          "Non-tech firms started buying outcomes, not slides. The buyer's appetite for paying for a deck and then paying again for the build has dropped. They want the deck and the build under one signature. The split is now actively painful, not merely expensive.",
        ],
      },
      { type: "h2", text: "What one team that owns both looks like" },
      {
        type: "p",
        text: "It looks small. Four to six people, deliberately constant across the sprint. A strategist who can read a workflow and write specs. A technologist who can stand up an orchestration layer in days, not months. A designer who is fluent in operator UX. A producer who keeps the engagement on schedule. Sometimes a domain specialist if the workflow lives inside a regulated space.",
      },
      {
        type: "p",
        text: "It looks like one signature. The buyer signs a one-page sprint plan that names the workflow, the timebox, the metrics that will move, and the stop-conditions. There is no second contract for the build. The deck and the deployment are the same engagement, billed once.",
      },
      {
        type: "p",
        text: "It looks like the deck does not exist. There is a sprint plan and there is a deployed system. The slides are written, if at all, after the workflow is live, to document what was built. The team does not stop to render PowerPoint mid-sprint because there is no internal client to update. The buyer is in the room.",
      },
      {
        type: "p",
        text: "It looks like the same team that mapped the workflow on Monday is the team that ships the rebuilt version on Friday. The judgement and the build share a calendar. The strategy never ages.",
      },
      { type: "h2", text: "Why this is hard" },
      {
        type: "p",
        text: "If it were easy, the split would have collapsed already. The reason it is hard is talent. A strategist who can read a workflow at the level a senior partner reads a P&L is rare. An engineer who can ship an AI-orchestrated bespoke workflow in eight weeks is rare. A person who can do both, or a team that can hold both, is rarer still. The strategy industry trains for one half of the work. The execution industry trains for the other. The cross-trained operator does not yet exist in volume.",
      },
      {
        type: "p",
        text: "VWV's bet is that the cross-trained team is the only team that survives this decade. We do not staff-augment. We do not subcontract the strategy out to one firm and the build out to another. The same people who diagnose the workflow ship the rebuild. The structural integrity of that arrangement is the entire moat.",
      },
      {
        type: "h2",
        text: "What this means for the buyer",
      },
      {
        type: "p",
        text: "Three things. First, ask any consulting firm you are evaluating whether they will personally ship the workflow they propose. If the answer is no, you are paying for a handoff. Second, ask any dev shop you are evaluating whether they can re-judge the spec mid-build when reality breaks it. If the answer is no, you are paying for a translation layer. Third, look for the team that can answer yes to both. That team is who you want.",
      },
      {
        type: "p",
        text: "VWV is built to be that team. The structural innovation is rejoining two professions that should never have separated. Everything else, the sprint model, the calendar booking, the on-premises hackathon, the parallel software cycle, the KPI handover, is method that flows from that one architectural choice.",
      },
      {
        type: "signature",
        text: "Filed under Manifesto. Read next: The template era is ending.",
      },
    ],
  },
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
