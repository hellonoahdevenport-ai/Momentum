import Link from "next/link";
import { ER_SCENARIOS } from "@/lib/er/scenarios";
import Badge from "@/components/ui/Badge";

export const metadata = { title: "ER timed scenarios" };

export default function ErLibraryPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <Badge tone="coral">Needs clinical review</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">Emergency room — timed scenarios</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        A countdown is running. Choose orders fast — miss the time-critical ones, add a harmful one, or run out the
        clock, and the patient declines. This is for order-entry and prioritization practice under pressure, not a
        realistic simulation of any single institution’s protocol.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {ER_SCENARIOS.map((s) => (
          <Link key={s.id} href={`/app/er/${s.id}`} className="card-lift block rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-lg font-bold text-foreground">{s.title}</span>
              <Badge tone="neutral">{s.timeLimitSeconds}s</Badge>
            </div>
            <p className="mt-1.5 text-sm text-foreground-dim">{s.patientSummary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
