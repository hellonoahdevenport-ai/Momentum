"use client";

import Link from "next/link";
import { useState } from "react";
import EcgStrip from "@/components/EcgStrip";
import { checkRhythmAnswer, checkNextStepAnswer } from "@/lib/ecg/actions";
import type { EcgRhythmPublic } from "@/lib/ecg/types";
import { useToast } from "@/context/ToastContext";

interface QuestionPublic {
  id: string;
  prompt: string;
  options: string[];
}

export default function EcgPracticeClient({ rhythm, nextStepQuestion }: { rhythm: EcgRhythmPublic; nextStepQuestion: QuestionPublic }) {
  const [rhythmPicked, setRhythmPicked] = useState<number | null>(null);
  const [rhythmResult, setRhythmResult] = useState<{ correct: boolean; correctIndex: number; rationale: string; teachingNote: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const [stepPicked, setStepPicked] = useState<number | null>(null);
  const [stepResult, setStepResult] = useState<{ correct: boolean; correctIndex: number; rationale: string } | null>(null);
  const [stepBusy, setStepBusy] = useState(false);
  const { push: pushToast } = useToast();

  async function submitRhythm(i: number) {
    if (rhythmResult || busy) return;
    setRhythmPicked(i);
    setBusy(true);
    try {
      const res = await checkRhythmAnswer(rhythm.id, i);
      setRhythmResult(res);
    } finally {
      setBusy(false);
    }
  }

  async function submitStep(i: number) {
    if (stepResult || stepBusy) return;
    setStepPicked(i);
    setStepBusy(true);
    try {
      const res = await checkNextStepAnswer(rhythm.id, i);
      setStepResult(res);
      pushToast({
        title: res.correct ? "Correct — strip complete" : "Rhythm strip complete",
        body: rhythm.shortLabel,
        tone: res.correct ? "good" : "warn",
      });
    } finally {
      setStepBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <Link href="/app/ecg" className="focus-ring font-display text-sm font-bold text-accent">
        &larr; ECG library
      </Link>
      <h1 className="font-display mt-3 text-2xl font-bold text-foreground">{rhythm.shortLabel}</h1>
      <p className="mt-1 text-sm text-foreground-dim">{rhythm.patientContext}</p>

      <div className="mt-5">
        <EcgStrip waveform={rhythm.waveform} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <p className="font-display text-[15px] font-bold text-foreground">What rhythm is this?</p>
        <div className="mt-3 flex flex-col gap-2">
          {rhythm.rhythmOptions.map((opt, i) => {
            const isPicked = rhythmPicked === i;
            let style = "border-border";
            if (rhythmResult) {
              if (i === rhythmResult.correctIndex) style = "border-good bg-good-soft";
              else if (isPicked) style = "border-bad bg-bad-soft";
            }
            return (
              <button
                key={opt}
                onClick={() => submitRhythm(i)}
                disabled={!!rhythmResult || busy}
                className={`focus-ring rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold text-foreground ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {rhythmResult && (
          <div className="mt-3 rounded-xl bg-surface-2 p-3.5 text-sm leading-relaxed text-foreground-dim">
            <strong className={rhythmResult.correct ? "text-good" : "text-bad"}>{rhythmResult.correct ? "Correct. " : "Not quite. "}</strong>
            {rhythmResult.rationale}
            <div className="mt-1.5">{rhythmResult.teachingNote}</div>
          </div>
        )}
      </div>

      {rhythmResult && (
        <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
          <p className="font-display text-[15px] font-bold text-foreground">{nextStepQuestion.prompt}</p>
          <div className="mt-3 flex flex-col gap-2">
            {nextStepQuestion.options.map((opt, i) => {
              const isPicked = stepPicked === i;
              let style = "border-border";
              if (stepResult) {
                if (i === stepResult.correctIndex) style = "border-good bg-good-soft";
                else if (isPicked) style = "border-bad bg-bad-soft";
              }
              return (
                <button
                  key={opt}
                  onClick={() => submitStep(i)}
                  disabled={!!stepResult || stepBusy}
                  className={`focus-ring rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold text-foreground ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {stepResult && (
            <div className="mt-3 rounded-xl bg-surface-2 p-3.5 text-sm leading-relaxed text-foreground-dim">
              <strong className={stepResult.correct ? "text-good" : "text-bad"}>{stepResult.correct ? "Correct. " : "Not quite. "}</strong>
              {stepResult.rationale}
            </div>
          )}
        </div>
      )}

      {stepResult && (
        <div className="mt-6 flex justify-end">
          <Link href="/app/ecg" className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
            Back to the library &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
