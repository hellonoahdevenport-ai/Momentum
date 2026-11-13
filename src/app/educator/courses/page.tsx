import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import Badge from "@/components/ui/Badge";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";

export default function EducatorCoursesPage() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Courses &amp; curriculum</h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Every unit on the taxonomy, across both tracks, with its authoring status. Owner and educator previews see
        every unit regardless of a learner’s progress.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        {TRACK_ORDER.map((trackKey) => (
          <div key={trackKey}>
            <h3 className="font-display text-base font-bold text-foreground">{TRACKS[trackKey].label}</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs font-bold uppercase tracking-wide text-foreground-dim">
                    <th className="py-2 pr-4">Unit</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {UNITS.map((u) => {
                    const caseFile = casesForUnit(trackKey, u.key)[0];
                    return (
                      <tr key={u.key} className="border-b border-border text-foreground">
                        <td className="py-2.5 pr-4">{u.label}</td>
                        <td className="py-2.5 pr-4">
                          <Badge tone={caseFile ? "accent" : "neutral"}>{caseFile ? "Authored" : "Planned"}</Badge>
                        </td>
                        <td className="py-2.5">{caseFile ? <ReviewStatusBadge status={caseFile.meta.reviewStatus} /> : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
