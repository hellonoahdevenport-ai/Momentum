"use client";

import { useEffect, useState } from "react";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { loadProgress, unitStatus, type ProgressStore } from "@/lib/progress";
import Badge from "@/components/ui/Badge";

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressStore | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const attempts = progress?.attempts ?? [];
  const avgScore = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.overallScore, 0) / attempts.length) : null;
  const calibrationCounts = { well_calibrated: 0, overconfident: 0, underconfident: 0, unknown: 0 };
  attempts.forEach((a) => calibrationCounts[a.calibration]++);

  const unitHasCase = (trackKey: "medicine" | "nursing", unitKey: string) =>
    (trackKey === "medicine" && unitKey === "blood-immune") || (trackKey === "nursing" && unitKey === "gi");

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Progress</h1>
      <p className="mt-2 text-sm text-foreground-dim">Stored only in this browser’s local storage — not on a server.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Attempts</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-foreground">{attempts.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Average score</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-foreground">{avgScore ?? "–"}</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Well-calibrated</div>
          <div className="font-display mt-1 text-3xl font-extrabold text-foreground">
            {attempts.length ? `${calibrationCounts.well_calibrated}/${attempts.length}` : "–"}
          </div>
        </div>
      </div>

      {attempts.length > 0 && (calibrationCounts.overconfident > 0 || calibrationCounts.underconfident > 0) && (
        <div className="mt-4 rounded-xl bg-violet-soft px-4 py-3 text-sm text-violet">
          {calibrationCounts.overconfident > 0 && `${calibrationCounts.overconfident} attempt(s) were more confident than the result supported. `}
          {calibrationCounts.underconfident > 0 && `${calibrationCounts.underconfident} attempt(s) were less confident than the result deserved.`}
        </div>
      )}

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">By track and unit</h2>
      <div className="mt-4 flex flex-col gap-8">
        {TRACK_ORDER.map((key) => {
          const t = TRACKS[key];
          return (
            <div key={key} className={`track-${key}`}>
              <div className="font-display text-base font-bold text-foreground">{t.label}</div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {UNITS.map((u) => {
                  const status = progress ? unitStatus(progress, key, u.key, unitHasCase(key, u.key)) : "planned";
                  return (
                    <div key={u.key} className="rounded-xl border border-border bg-surface px-3 py-2.5">
                      <div className="text-xs font-semibold text-foreground">{u.label}</div>
                      <Badge
                        tone={status === "complete" ? "good" : status === "in_progress" ? "warn" : status === "available" ? "accent" : "neutral"}
                        className="mt-1.5"
                      >
                        {status.replace("_", " ")}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">Attempt history</h2>
      {attempts.length === 0 ? (
        <p className="mt-3 text-sm text-foreground-dim">Nothing logged yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-bold uppercase tracking-wide text-foreground-dim">
                <th className="py-2 pr-4">Case</th>
                <th className="py-2 pr-4">When</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Confidence</th>
                <th className="py-2">Calibration</th>
              </tr>
            </thead>
            <tbody>
              {[...attempts]
                .sort((a, b) => b.completedAt - a.completedAt)
                .map((a, i) => (
                  <tr key={i} className="border-b border-border text-foreground">
                    <td className="py-2.5 pr-4">{a.caseId.replace(/-/g, " ")}</td>
                    <td className="py-2.5 pr-4 text-foreground-dim">{new Date(a.completedAt).toLocaleDateString()}</td>
                    <td className="py-2.5 pr-4">{a.overallScore}</td>
                    <td className="py-2.5 pr-4">{a.confidence}/5</td>
                    <td className="py-2.5 text-foreground-dim">{a.calibration.replace("_", " ")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
