import { listCases } from "@/lib/cases/registry";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import ContentConcernForm from "@/components/app/ContentConcernForm";
import ReviewWorkflowControls from "@/components/app/ReviewWorkflowControls";

export default function ContentReviewPage() {
  const cases = listCases();
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Content review</h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Full governance metadata for every case. Nothing here is marked &ldquo;clinically reviewed&rdquo; unless that review
        actually happened — right now, none has.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {cases.map((c) => (
          <div key={c.meta.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-bold text-foreground">{c.meta.title}</h3>
              <ReviewStatusBadge status={c.meta.reviewStatus} />
            </div>
            <dl className="mt-3 grid gap-2 text-xs text-foreground-dim sm:grid-cols-2">
              <div>
                <dt className="font-bold uppercase tracking-wide">Version</dt>
                <dd>{c.meta.version}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wide">Author</dt>
                <dd>{c.meta.author}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wide">Reviewers</dt>
                <dd>{c.meta.reviewers.length > 0 ? c.meta.reviewers.map((r) => r.name).join(", ") : "None recorded yet"}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wide">Next review due</dt>
                <dd>{c.meta.nextReviewDate ?? "Not scheduled"}</dd>
              </div>
            </dl>
            <div className="mt-3">
              <span className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Sources</span>
              <ul className="mt-1 flex flex-col gap-1">
                {c.meta.sources.map((s) => (
                  <li key={s.title} className="text-xs text-foreground-dim">
                    {s.title} — {s.owner}. {s.versionOrDate}
                  </li>
                ))}
              </ul>
            </div>
            <ReviewWorkflowControls caseId={c.meta.id} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="font-display text-lg font-bold text-foreground">Report a content concern</h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
          Flag an issue with a case for review. Please don’t include any real patient information — these cases are
          fictional and concerns should only ever reference the fictional content.
        </p>
        <ContentConcernForm cases={cases.map((c) => ({ id: c.meta.id, title: c.meta.title, version: c.meta.version }))} />
      </div>
    </div>
  );
}
