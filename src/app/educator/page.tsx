import Link from "next/link";
import { listCases } from "@/lib/cases/registry";
import Badge from "@/components/ui/Badge";

export default function EducatorOverviewPage() {
  const cases = listCases();
  const needsReview = cases.filter((c) => c.meta.reviewStatus === "needs_clinical_review").length;

  return (
    <div>
      <Badge tone="warn">Scoped MVP</Badge>
      <h2 className="font-display mt-3 text-2xl font-bold text-foreground">Overview</h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        This workspace is an early, scoped MVP. Cohorts, real rosters, and multi-user assignments need real accounts
        and a database, which this demo doesn’t have yet — the sections below are clearly labeled where they’re
        sample data versus real, device-local data.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Authored cases</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-foreground">{cases.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Needing clinical review</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-warn">{needsReview}</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Tracks</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-foreground">2</div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/educator/content-review" className="focus-ring rounded-xl border border-border px-4 py-2.5 font-display text-sm font-bold text-foreground">
          Review case content &rarr;
        </Link>
        <Link href="/educator/analytics" className="focus-ring rounded-xl border border-border px-4 py-2.5 font-display text-sm font-bold text-foreground">
          View this device’s analytics &rarr;
        </Link>
      </div>
    </div>
  );
}
