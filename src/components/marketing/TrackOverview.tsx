import Link from "next/link";
import { TRACKS, type TrackKey } from "@/lib/tracks";
import { casesForUnit } from "@/lib/cases/registry";
import { UNITS } from "@/lib/units";
import Badge from "@/components/ui/Badge";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";

export default function TrackOverview({ trackKey }: { trackKey: TrackKey }) {
  const t = TRACKS[trackKey];
  const sampleCase = UNITS.map((u) => casesForUnit(trackKey, u.key)[0]).find(Boolean);

  return (
    <div className={`track-${trackKey}`}>
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <Badge tone={trackKey === "medicine" ? "accent" : "teal"}>{t.tierLabel}</Badge>
        <h1 className="font-display mt-4 text-4xl font-extrabold text-foreground">{t.label}</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-dim">{t.longDesc}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/app/tracks/${trackKey}`}
            className="btn-press focus-ring rounded-xl bg-accent px-6 py-3.5 font-display font-bold text-white hover:bg-accent-dark"
          >
            Open {t.label} in the demo &rarr;
          </Link>
          <span className="text-xs text-foreground-dim">{t.mappingNote}</span>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">{t.loopLabel}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.loopStages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2">
                  <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">{stage}</span>
                  {i < t.loopStages.length - 1 && <span className="text-foreground-dim">&rarr;</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">What you’ll practice</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {t.outcomesPreview.map((o) => (
                <li key={o} className="flex gap-2.5 text-sm leading-relaxed text-foreground-dim">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {sampleCase && (
          <div className="mt-12 rounded-3xl border border-border bg-surface p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Sample case</div>
                <h3 className="font-display mt-1 text-xl font-bold text-foreground">{sampleCase.meta.title}</h3>
              </div>
              <ReviewStatusBadge status={sampleCase.meta.reviewStatus} />
            </div>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground-dim">{sampleCase.presentingIssue}</p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {sampleCase.meta.learningObjectives.slice(0, 3).map((o) => (
                <li key={o} className="flex gap-2.5 text-sm text-foreground-dim">
                  <span className="text-accent">&bull;</span>
                  {o}
                </li>
              ))}
            </ul>
            <Link
              href={`/app/case/${sampleCase.meta.id}`}
              className="focus-ring mt-4 inline-block font-display text-sm font-bold text-accent"
            >
              Open this case &rarr;
            </Link>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-lg font-bold text-foreground">Coming later (roadmap)</h2>
          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
            {t.futureTiers.map((f) => (
              <div key={f.name} className="flex-1 rounded-xl border border-border bg-surface-2 px-4 py-3.5">
                <div className="text-sm font-semibold text-foreground">{f.name}</div>
                <div className="text-xs text-foreground-dim">{f.sub}</div>
                <Badge tone="neutral" className="mt-2">
                  Planned
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
