import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Momentum is in pilot access. Pricing is not yet set.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <Badge tone="coral">Pricing not finalized</Badge>
      <h1 className="font-display mt-4 text-4xl font-extrabold text-foreground">Pilot access</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-dim">
        Momentum hasn’t set pricing yet. We’d rather tell you that plainly than invent numbers. If you’re a school,
        program, or individual learner who wants in early, reach out — this page is a placeholder that’s easy to
        edit once a model is decided.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="font-display text-lg font-bold text-foreground">Individual learners</div>
          <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
            Explore the demo free, with no account. A paid individual plan is planned but not priced.
          </p>
          <Link href="/app" className="focus-ring mt-4 inline-block font-display text-sm font-bold text-accent">
            Explore the demo &rarr;
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="font-display text-lg font-bold text-foreground">Schools &amp; programs</div>
          <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
            Cohorts, assignments, and analytics for educators. Contact us for pilot access and institutional terms.
          </p>
          <span className="mt-4 inline-block font-display text-sm font-bold text-foreground-dim">Contact us</span>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-surface-2 p-5 text-xs leading-relaxed text-foreground-dim">
        No usage metrics, customer logos, or outcome claims are shown here because none have been collected or
        verified yet. This page will be updated once a pricing model, and any claims about it, can be substantiated.
      </div>
    </div>
  );
}
