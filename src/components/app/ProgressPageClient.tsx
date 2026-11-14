"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRACKS, TRACK_ORDER, type TrackKey } from "@/lib/tracks";
import { UNITS, unitByKey } from "@/lib/units";
import { loadProgress, unitStatus, type ProgressStore } from "@/lib/progress";
import { getWeakSpots, getExcellingUnitKeys } from "@/lib/weaknessProfile";
import { getRecommendedNext, type AvailableUnit } from "@/lib/recommendations";
import Badge from "@/components/ui/Badge";
import LineChart from "@/components/charts/LineChart";
import RadarChart from "@/components/charts/RadarChart";
import HeatmapCalendar from "@/components/charts/HeatmapCalendar";

export default function ProgressPageClient({
  availableUnitKeys,
  availableUnits,
}: {
  availableUnitKeys: Record<TrackKey, string[]>;
  availableUnits: AvailableUnit[];
}) {
  const [progress, setProgress] = useState<ProgressStore | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const attempts = progress?.attempts ?? [];
  const avgScore = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.overallScore, 0) / attempts.length) : null;
  const calibrationCounts = { well_calibrated: 0, overconfident: 0, underconfident: 0, unknown: 0 };
  attempts.forEach((a) => calibrationCounts[a.calibration]++);

  const unitHasCase = (trackKey: TrackKey, unitKey: string) => availableUnitKeys[trackKey].includes(unitKey);

  const allUnitKeys = UNITS.map((u) => u.key);
  const weakSpots = progress ? getWeakSpots(progress, allUnitKeys) : [];
  const excellingUnits = progress ? getExcellingUnitKeys(progress, allUnitKeys) : new Set<string>();
  const recommendation = progress ? getRecommendedNext(progress, availableUnits) : null;

  const scoreTrend = [...attempts]
    .sort((a, b) => a.completedAt - b.completedAt)
    .map((a, i) => ({ label: `#${i + 1}`, value: a.overallScore }));

  const radarAxes = UNITS.map((u) => {
    const scores = attempts.filter((a) => a.unitKey === u.key).map((a) => a.overallScore);
    return { label: u.mono, value: scores.length ? Math.max(...scores) : 0 };
  });

  const heatmapCounts: Record<string, number> = {};
  attempts.forEach((a) => {
    const key = new Date(a.completedAt).toISOString().slice(0, 10);
    heatmapCounts[key] = (heatmapCounts[key] ?? 0) + 1;
  });

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Progress</h1>
      <p className="mt-2 text-sm text-foreground-dim">Stored only in this browser’s local storage — not on a server.</p>

      {progress && recommendation && (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft p-5">
          <Badge tone="accent">Recommended next</Badge>
          <div className="font-display mt-2.5 text-lg font-bold text-foreground">{recommendation.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-foreground-dim">{recommendation.reason}</p>
          <Link
            href={`/app/learn/${recommendation.trackKey}/${recommendation.unitKey}`}
            className="btn-press focus-ring mt-3.5 inline-block rounded-xl bg-accent px-4 py-2.5 font-display text-sm font-bold text-white"
          >
            {recommendation.isRetry ? "Retry this case" : "Start this case"} &rarr;
          </Link>
        </div>
      )}

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

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-bold text-foreground">Score trend</h2>
          <div className="mt-3">
            <LineChart points={scoreTrend} />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-bold text-foreground">Competency coverage</h2>
          <div className="mt-1">
            <RadarChart axes={radarAxes} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-bold text-foreground">Activity</h2>
        <div className="mt-3">
          <HeatmapCalendar counts={heatmapCounts} />
        </div>
      </div>

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">Focus areas</h2>
      {!progress ? null : weakSpots.length === 0 ? (
        <p className="mt-3 text-sm text-foreground-dim">
          {attempts.length === 0
            ? "Finish a few cases and your focus areas will show up here."
            : "Nothing flagged right now — your in-progress units are all trending well."}
        </p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {weakSpots.map((w) => {
            const unit = unitByKey(w.unitKey);
            return (
              <div key={`${w.trackKey}:${w.unitKey}`} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{unit?.label ?? w.unitKey}</span>
                  <Badge tone="warn">{w.bestScore}</Badge>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground-dim">{w.reason}</p>
                <Link
                  href={`/app/learn/${w.trackKey}/${w.unitKey}`}
                  className="focus-ring mt-3 inline-block font-display text-xs font-bold text-accent"
                >
                  Retry this case &rarr;
                </Link>
              </div>
            );
          })}
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
                  const excelling = excellingUnits.has(`${key}:${u.key}`);
                  return (
                    <div key={u.key} className="rounded-xl border border-border bg-surface px-3 py-2.5">
                      <div className="text-xs font-semibold text-foreground">{u.label}</div>
                      <Badge
                        tone={status === "complete" ? "good" : status === "in_progress" ? "warn" : status === "available" ? "accent" : "neutral"}
                        className="mt-1.5"
                      >
                        {status.replace("_", " ")}
                      </Badge>
                      {excelling && (
                        <p className="mt-1.5 text-[10px] leading-snug text-good">
                          Excelling here — great foundation for a tougher multisystem case next.
                        </p>
                      )}
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
