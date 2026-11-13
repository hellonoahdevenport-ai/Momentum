"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, dueReviewItems, recordReviewResult, type ProgressStore } from "@/lib/progress";
import Badge from "@/components/ui/Badge";

export default function ReviewPage() {
  const [progress, setProgress] = useState<ProgressStore | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  if (!progress) return null;

  const due = dueReviewItems(progress);
  const upcoming = progress.reviewQueue.filter((i) => !due.includes(i));

  function respond(itemId: string, gotIt: boolean) {
    const next = recordReviewResult(progress!, itemId, gotIt);
    setProgress(next);
    setRevealedId(null);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Spaced review</h1>
      <p className="mt-2 text-sm text-foreground-dim">
        Missed findings resurface here on a schedule. There’s no penalty for &ldquo;still working on it&rdquo; — that’s the
        point of spaced review.
      </p>

      {due.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface-2 p-6 text-center">
          <p className="text-sm text-foreground-dim">Nothing due right now. Finish a case to add items here.</p>
          <Link href="/app/tracks" className="focus-ring mt-3 inline-block font-display text-sm font-bold text-accent">
            Go to a case &rarr;
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {due.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-surface p-5">
              <Badge tone="coral">Due now</Badge>
              <p className="font-display mt-3 text-[15px] font-bold text-foreground">{item.prompt}</p>
              {revealedId === item.id ? (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-dim">{item.answer}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => respond(item.id, true)}
                      className="btn-press focus-ring rounded-xl bg-good px-4 py-2 font-display text-sm font-bold text-white"
                    >
                      Got it now
                    </button>
                    <button
                      onClick={() => respond(item.id, false)}
                      className="focus-ring rounded-xl border border-border px-4 py-2 font-display text-sm font-bold text-foreground-dim"
                    >
                      Still working on it
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={() => setRevealedId(item.id)} className="focus-ring mt-3 font-display text-sm font-bold text-accent">
                  Show the explanation &rarr;
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Scheduled later</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {upcoming.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-2.5 text-sm text-foreground-dim">
                {item.prompt}
                <span className="font-data text-xs">{new Date(item.dueAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
