"use client";

import Link from "next/link";
import { useState } from "react";
import { checkQuizAnswer } from "@/lib/cases/actions";
import type { TrackKey } from "@/lib/tracks";
import CountUp from "@/components/ui/CountUp";
import { useToast } from "@/context/ToastContext";

interface QuizQuestionPublic {
  id: string;
  prompt: string;
  options: string[];
}

export default function QuizClient({
  caseId,
  trackKey,
  title,
  questions,
}: {
  caseId: string;
  trackKey: TrackKey;
  title: string;
  questions: QuizQuestionPublic[];
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<{ correct: boolean; correctIndex: number; rationale: string } | null>(null);
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const { push: pushToast } = useToast();

  const q = questions[index];

  async function pick(i: number) {
    if (picked !== null || busy) return;
    setPicked(i);
    setBusy(true);
    try {
      const res = await checkQuizAnswer(caseId, q.id, i);
      setResult(res);
      if (res.correct) setScore((s) => s + 1);
    } finally {
      setBusy(false);
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      setDone(true);
      pushToast({
        title: `Quick check complete — ${score}/${questions.length}`,
        body: title,
        tone: score / questions.length >= 0.8 ? "good" : score / questions.length >= 0.5 ? "warn" : "bad",
      });
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setResult(null);
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8">
        <p className="text-sm text-foreground-dim">No quiz questions are authored for this case yet.</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className={`track-${trackKey} mx-auto max-w-xl px-5 pt-16 pb-24 text-center sm:px-8`}>
        <div className={`font-display mx-auto text-[52px] font-extrabold ${pct >= 80 ? "text-good" : pct >= 50 ? "text-warn" : "text-bad"}`}>
          <CountUp value={score} durationMs={500} />/{questions.length}
        </div>
        <p className="mt-2 text-sm text-foreground-dim">Quick check &middot; {title}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/app/tracks" className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
            Back to curriculum
          </Link>
          <button
            onClick={() => {
              setDone(false);
              setIndex(0);
              setPicked(null);
              setResult(null);
              setScore(0);
            }}
            className="focus-ring font-display text-sm font-bold text-accent"
          >
            Try again &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`track-${trackKey} mx-auto max-w-xl px-5 pt-10 pb-24 sm:px-8`}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
          Quick check &middot; {title}
        </span>
        <span className="font-data text-xs text-foreground-dim">
          {index + 1} / {questions.length}
        </span>
      </div>

      <h2 className="font-display mt-5 text-xl font-bold leading-snug text-foreground">{q.prompt}</h2>

      <div className="mt-5 flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const showResult = result !== null;
          let style = "border-border";
          if (showResult) {
            if (i === result.correctIndex) style = "border-good bg-good-soft";
            else if (isPicked) style = "border-bad bg-bad-soft";
          }
          return (
            <button
              key={opt}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`focus-ring flex items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold text-foreground ${style}`}
            >
              {opt}
              {result && i === result.correctIndex && <span className="text-good">&#10003;</span>}
              {result && isPicked && i !== result.correctIndex && <span className="text-bad">&#10007;</span>}
            </button>
          );
        })}
      </div>

      {result && <div className="mt-4 rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground-dim">{result.rationale}</div>}

      <div className="mt-6 flex justify-end">
        <button
          onClick={next}
          disabled={picked === null}
          className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
        >
          {index + 1 >= questions.length ? "Finish" : "Next"} &rarr;
        </button>
      </div>
    </div>
  );
}
