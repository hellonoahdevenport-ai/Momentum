import Link from "next/link";
import { CHART_SCENARIOS } from "@/lib/chart/scenarios";
import Badge from "@/components/ui/Badge";

export const metadata = { title: "Documentation practice" };

export default function ChartLibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <Badge tone="teal">Needs clinical review</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">Documentation practice</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Practice writing a structured clinical note — SOAP, ADPIE, or SBAR — field by field, with completeness
        feedback on each one. For documentation-format practice, not a realistic simulation of any single
        institution&rsquo;s charting system.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {CHART_SCENARIOS.map((s) => (
          <Link key={s.id} href={`/app/chart/${s.id}`} className="card-lift block rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-lg font-bold text-foreground">{s.title}</span>
              <Badge tone="neutral">{s.format}</Badge>
            </div>
            <p className="mt-1.5 text-sm text-foreground-dim">{s.snapshot}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
