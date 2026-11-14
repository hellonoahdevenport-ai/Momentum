"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { loadProgress, dueReviewItems, type ProgressStore } from "@/lib/progress";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";

export default function AppHomePage() {
  const [progress, setProgress] = useState<ProgressStore | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const attempts = progress?.attempts ?? [];
  const recent = [...attempts].sort((a, b) => b.completedAt - a.completedAt).slice(0, 4);
  const dueCount = progress ? dueReviewItems(progress).length : 0;
  const hasAnyAttempt = attempts.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">
        {hasAnyAttempt ? "Welcome back" : "Let’s start your first case"}
      </h1>
      <p className="mt-2 text-sm text-foreground-dim">
        Everything here runs on seeded demo data stored only in this browser — no account required.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="card-lift rounded-3xl border border-border bg-surface p-7">
          <Badge tone="accent">Recommended next</Badge>
          <h2 className="font-display mt-3 text-xl font-bold text-foreground">
            {hasAnyAttempt ? "Try Maya Chen’s case again, or review what you missed" : "Maya Chen: Fatigue and Shortness of Breath"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-dim">
            A full diagnostic loop: interview, evidence, reasoning, plan, and a transparent debrief. About 20
            minutes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/app/case/maya-chen-iron-deficiency-anemia"
              className="btn-press focus-ring rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white hover:bg-accent-dark"
            >
              {hasAnyAttempt ? "Open case again" : "Start the case"} &rarr;
            </Link>
            <Link
              href="/app/tracks"
              className="focus-ring rounded-xl border border-border px-5 py-2.5 font-display text-sm font-bold text-foreground"
            >
              Choose another activity
            </Link>
          </div>
        </div>

        <div className="card-lift rounded-3xl border border-border bg-surface p-7">
          <Badge tone={dueCount > 0 ? "coral" : "neutral"}>Spaced review</Badge>
          <div className="font-display mt-3 text-4xl font-extrabold text-foreground">{progress ? dueCount : "–"}</div>
          <p className="mt-1 text-sm text-foreground-dim">item{dueCount === 1 ? "" : "s"} due for review</p>
          <Link href="/app/review" className="focus-ring mt-4 inline-block font-display text-sm font-bold text-accent">
            Go to review &rarr;
          </Link>
        </div>
      </div>

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">Your tracks</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {TRACK_ORDER.map((key) => {
          const t = TRACKS[key];
          const trackAttempts = attempts.filter((a) => a.trackKey === key);
          return (
            <Link key={key} href={`/app/tracks/${key}`} className={`track-${key} card-lift block rounded-3xl bg-accent-soft p-6`}>
              <div className="font-display text-lg font-bold text-foreground">{t.label}</div>
              <p className="mt-1 text-xs text-foreground-dim">{t.tierSub}</p>
              <div className="font-data mt-3 text-xs text-foreground-dim">
                {trackAttempts.length} attempt{trackAttempts.length === 1 ? "" : "s"} logged &middot; {UNITS.length}{" "}
                units on the map
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">Skill drills</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Link href="/app/ecg" className="card-lift block rounded-3xl border border-border bg-surface p-6">
          <Badge tone="accent">ECG practice</Badge>
          <div className="font-display mt-3 text-lg font-bold text-foreground">Rhythm strip identification</div>
          <p className="mt-1 text-sm text-foreground-dim">Identify the rhythm, then the next step.</p>
        </Link>
        <Link href="/app/er" className="card-lift block rounded-3xl border border-border bg-surface p-6">
          <Badge tone="coral">Timed scenario</Badge>
          <div className="font-display mt-3 text-lg font-bold text-foreground">Emergency room order entry</div>
          <p className="mt-1 text-sm text-foreground-dim">A countdown is running — move fast.</p>
        </Link>
      </div>

      <h2 className="font-display mt-12 text-lg font-bold text-foreground">Recent performance</h2>
      {!progress ? (
        <div className="mt-4 flex flex-col gap-2.5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <p className="mt-3 text-sm text-foreground-dim">No attempts yet — your first debrief will show up here.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {recent.map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-foreground">{a.caseId.replace(/-/g, " ")}</div>
                <div className="text-xs text-foreground-dim">{new Date(a.completedAt).toLocaleString()}</div>
              </div>
              <Badge tone={a.overallScore >= 80 ? "good" : a.overallScore >= 55 ? "warn" : "bad"}>
                {a.overallScore}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
