"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TRACKS } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import type { QuizQuestion, TrackKey } from "@/lib/types";

export default function QuizClient({ trackKey, unitKey }: { trackKey: TrackKey; unitKey: string }) {
  const track = TRACKS[trackKey];
  const unit = unitByKey(unitKey)!;

  const [status, setStatus] = useState<"loading" | "error" | "ready" | "done">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatus("loading");
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track: trackKey, unit: unitKey }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Couldn't build a quiz.");
        if (cancelled) return;
        setQuestions(data.questions as QuizQuestion[]);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [trackKey, unitKey]);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (questions[index].correctIndex === i) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= questions.length) {
      setStatus("done");
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  if (status === "loading") {
    return (
      <div className={`track-${trackKey} flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center`}>
        <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-border border-t-accent" />
        <div className="font-data text-sm text-foreground-dim">Writing a quick check&hellip;</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`track-${trackKey} mx-auto max-w-xl px-6 py-20 text-center`}>
        <p className="text-sm text-bad">{errorMsg}</p>
        <Link href={`/learn/${trackKey}/${unitKey}`} className="mt-6 inline-block font-display text-sm font-bold text-accent">
          &larr; Back to case
        </Link>
      </div>
    );
  }

  if (status === "done") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className={`track-${trackKey} mx-auto max-w-xl px-6 pt-16 pb-24 text-center`}>
        <div
          className={`font-display mx-auto text-[52px] font-extrabold ${
            pct >= 80 ? "text-good" : pct >= 50 ? "text-warn" : "text-bad"
          }`}
        >
          {score}/{questions.length}
        </div>
        <p className="mt-2 text-sm text-foreground-dim">
          Quick check &middot; {unit.label}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/learn/${trackKey}`}
            className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white"
          >
            Back to skill path
          </Link>
          <Link href={`/learn/${trackKey}/${unitKey}/quiz`} className="font-display text-sm font-bold text-accent">
            Try another set &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className={`track-${trackKey} mx-auto max-w-xl px-6 pt-10 pb-24`}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
          {track.label} &middot; Quick check &middot; {unit.label}
        </span>
        <span className="font-data text-xs text-foreground-dim">
          {index + 1} / {questions.length}
        </span>
      </div>

      <h2 className="font-display mt-5 text-xl font-bold leading-snug">{q.question}</h2>

      <div className="mt-5 flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.correctIndex;
          let style = "border-border";
          if (picked !== null) {
            if (isCorrect) style = "border-good bg-good-soft";
            else if (isPicked) style = "border-bad bg-bad-soft";
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold ${style}`}
            >
              {opt}
              {picked !== null && isCorrect && <span className="text-good">&#10003;</span>}
              {picked !== null && isPicked && !isCorrect && <span className="text-bad">&#10007;</span>}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4 rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground-dim">
          {q.explanation}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={next}
          disabled={picked === null}
          className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
        >
          {index + 1 >= questions.length ? "Finish" : "Next"} &rarr;
        </button>
      </div>
    </div>
  );
}
