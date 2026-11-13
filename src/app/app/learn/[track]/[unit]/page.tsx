import Link from "next/link";
import { notFound } from "next/navigation";
import { isTrackKey, TRACKS } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import Badge from "@/components/ui/Badge";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";

export default async function UnitWorkspacePage({
  params,
}: {
  params: Promise<{ track: string; unit: string }>;
}) {
  const { track, unit: unitKey } = await params;
  if (!isTrackKey(track)) notFound();
  const unit = unitByKey(unitKey);
  if (!unit) notFound();

  const t = TRACKS[track];
  const caseFile = casesForUnit(track, unitKey)[0];

  if (!caseFile) {
    return (
      <div className={`track-${track} mx-auto max-w-3xl px-5 py-16 text-center sm:px-8`}>
        <Badge tone="neutral">Planned</Badge>
        <h1 className="font-display mt-4 text-2xl font-bold text-foreground">{unit.label} is on the roadmap</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground-dim">
          This unit is in Casebook’s taxonomy, but no case has been authored for {t.label} here yet. It’s shown
          honestly as planned rather than hidden.
        </p>
        <Link href={`/app/tracks/${track}`} className="focus-ring mt-6 inline-block font-display text-sm font-bold text-accent">
          &larr; Back to the curriculum map
        </Link>
      </div>
    );
  }

  return (
    <div className={`track-${track} mx-auto max-w-3xl px-5 py-10 sm:px-8`}>
      <Link href={`/app/tracks/${track}`} className="focus-ring font-display text-sm font-bold text-accent">
        &larr; {t.label} curriculum
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold text-white"
          style={{ background: unit.color }}
        >
          {unit.mono}
        </span>
        <span className="text-sm font-semibold text-foreground-dim">{unit.label}</span>
        <ReviewStatusBadge status={caseFile.meta.reviewStatus} />
      </div>

      <h1 className="font-display mt-3 text-3xl font-extrabold text-foreground">{caseFile.meta.title}</h1>
      <p className="mt-2 text-sm text-foreground-dim">
        {caseFile.meta.targetLevel} &middot; about {caseFile.meta.estimatedMinutes} minutes
      </p>

      {caseFile.meta.contentWarning && (
        <div className="mt-4 rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn">{caseFile.meta.contentWarning}</div>
      )}

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-base font-bold text-foreground">Learning objectives</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {caseFile.meta.learningObjectives.map((o) => (
            <li key={o} className="flex gap-2.5 text-sm leading-relaxed text-foreground-dim">
              <span className="mt-0.5 text-accent">&#10003;</span>
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/app/case/${caseFile.meta.id}`}
          className="btn-press focus-ring card-lift rounded-2xl bg-accent px-5 py-5 font-display text-white"
        >
          <div className="text-sm font-bold uppercase tracking-wide text-white/80">Case practice</div>
          <div className="mt-1 text-lg font-extrabold">Work the case &rarr;</div>
          <p className="mt-1 text-xs font-medium text-white/80">{t.loopStages.join(" → ")}</p>
        </Link>
        <Link
          href={`/app/quiz/${caseFile.meta.id}`}
          className="btn-press focus-ring card-lift rounded-2xl border border-border bg-surface px-5 py-5"
        >
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Quick check</div>
          <div className="font-display mt-1 text-lg font-extrabold text-foreground">Short quiz &rarr;</div>
          <p className="mt-1 text-xs text-foreground-dim">A few questions pulled from this case’s key findings.</p>
        </Link>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface-2 p-5">
        <h2 className="text-xs font-bold uppercase tracking-wide text-foreground-dim">References &amp; sources</h2>
        <ul className="mt-2 flex flex-col gap-1.5">
          {caseFile.meta.sources.map((s) => (
            <li key={s.title} className="text-xs text-foreground-dim">
              {s.title} — <span className="italic">{s.owner}</span>. {s.versionOrDate}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-foreground-dim">
          Content status: this case needs a licensed clinician or nursing-faculty review and has not completed one.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/app/review" className="focus-ring font-display text-sm font-bold text-accent">
          Go to spaced review &rarr;
        </Link>
        <Link href="/app/library" className="focus-ring font-display text-sm font-bold text-foreground-dim">
          Browse the full library &rarr;
        </Link>
      </div>
    </div>
  );
}
