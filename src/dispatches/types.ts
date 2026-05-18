// Content type definitions for dispatches. Each dispatch's body is an array
// of typed blocks rendered by the article page.

export type Block =
  | { type: "lede"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; label?: string; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "kpi"; rows: { k: string; v: string }[] }
  | { type: "divider" }
  | { type: "signature"; text: string };

export type DispatchKind = "Essay" | "Dispatch" | "Field note";

export type Dispatch = {
  slug: string;
  kind: DispatchKind;
  tag: string;
  date: string;         // YYYY-MM-DD
  dateLabel: string;    // "2026 · 05 · 14"
  minutes: number;
  title: string;
  deck: string;
  body: Block[];
};
