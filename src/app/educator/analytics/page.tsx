"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import { loadProgress, type ProgressStore } from "@/lib/progress";
import HeatmapCalendar from "@/components/charts/HeatmapCalendar";

export default function EducatorAnalyticsPage() {
  const [progress, setProgress] = useState<ProgressStore | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const attempts = progress?.attempts ?? [];
  const buckets = { strong: 0, developing: 0, needs_review: 0 };
  attempts.forEach((a) => buckets[a.verdict]++);
  const total = attempts.length || 1;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Analytics</h2>
      <Badge tone="accent" className="mt-2">
        This device’s real attempts
      </Badge>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        This is real local data from attempts made in this browser — not a cohort. Aggregate, multi-learner
        analytics need real accounts and a database that don’t exist yet.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {(["strong", "developing", "needs_review"] as const).map((k) => (
          <div key={k}>
            <div className="flex justify-between text-xs font-semibold text-foreground-dim">
              <span className="capitalize">{k.replace("_", " ")}</span>
              <span>{buckets[k]}</span>
            </div>
            <div className="mt-1 h-2.5 w-full rounded-full bg-surface-2">
              <div
                className={`h-2.5 rounded-full ${k === "strong" ? "bg-good" : k === "developing" ? "bg-warn" : "bg-bad"}`}
                style={{ width: `${(buckets[k] / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {attempts.length === 0 && <p className="mt-6 text-sm text-foreground-dim">No attempts logged on this device yet.</p>}

      {attempts.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-base font-bold text-foreground">Activity</h3>
          <div className="mt-3">
            <HeatmapCalendar counts={attempts.reduce<Record<string, number>>((acc, a) => {
              const key = new Date(a.completedAt).toISOString().slice(0, 10);
              acc[key] = (acc[key] ?? 0) + 1;
              return acc;
            }, {})} />
          </div>
        </div>
      )}
    </div>
  );
}
