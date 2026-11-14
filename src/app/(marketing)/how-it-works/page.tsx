import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ProductPreview from "@/components/marketing/ProductPreview";

export const metadata: Metadata = {
  title: "How it works",
  description: "Walk through the Momentum case loop: brief, interview, evidence, reasoning, plan, and debrief.",
};

const STAGES = [
  {
    stage: "Brief",
    title: "Start with the scope",
    body: "Every case opens with learning objectives, your level, estimated time, and a content-warning notice where relevant — no surprises.",
  },
  {
    stage: "Interview",
    title: "Ask, don’t read",
    body: "A fictional patient answers only what you actually ask. Findings surface through your questions, with an accessible text chat.",
  },
  {
    stage: "Evidence",
    title: "Order with judgment",
    body: "Search a structured catalog of labs, imaging, and bedside checks. Each one shows whether it’s invasive or costly before you order it — results only appear after you order.",
  },
  {
    stage: "Reasoning",
    title: "Commit, with confidence",
    body: "Pick a leading diagnosis or priority, keep a differential, log your confidence, and name what single finding would change your mind.",
  },
  {
    stage: "Plan",
    title: "Reason through next steps",
    body: "Write the plan in your own words against a visible safety checklist — scored by a transparent rubric, not a black box.",
  },
  {
    stage: "Debrief",
    title: "See the whole rubric",
    body: "The hidden answer key, what you caught, what you missed, and a suggested next learning goal — never shown before you submit.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <Badge tone="accent">How it works</Badge>
      <h1 className="font-display mt-4 text-4xl font-extrabold text-foreground">One loop, worked all the way through</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-dim">
        Every Momentum case moves through the same six stages. Here’s what each one actually looks like, using the
        real case workspace.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="flex flex-col gap-8">
          {STAGES.map((s, i) => (
            <div key={s.stage} className="flex gap-4">
              <div className="flex flex-none flex-col items-center">
                <div className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                  {i + 1}
                </div>
                {i < STAGES.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
              </div>
              <div className="pb-2">
                <div className="text-xs font-bold uppercase tracking-wide text-accent">{s.stage}</div>
                <div className="font-display mt-1 text-lg font-bold text-foreground">{s.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-24">
          <ProductPreview />
          <p className="mt-3 text-center text-xs text-foreground-dim">
            A real screen from the Maya Chen case — not a stock mockup.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-surface p-8 text-center">
        <h2 className="font-display text-xl font-bold text-foreground">Try it yourself</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground-dim">
          The full loop above is playable right now, no sign-up required.
        </p>
        <Link
          href="/app"
          className="btn-press focus-ring mt-5 inline-block rounded-xl bg-accent px-6 py-3 font-display font-bold text-white hover:bg-accent-dark"
        >
          Explore the demo &rarr;
        </Link>
      </div>
    </div>
  );
}
