"use client";

import Link from "next/link";
import { useState } from "react";
import { gradeChartNote } from "@/lib/chart/actions";
import type { ChartScenarioPublic, ChartFeedback } from "@/lib/chart/types";
import Badge from "@/components/ui/Badge";

const STATUS_LABEL: Record<ChartFeedback["perField"][number]["status"], string> = {
  covered: "Covered",
  partial: "Partially covered",
  not_yet: "Not yet covered",
};

const STATUS_TONE: Record<ChartFeedback["perField"][number]["status"], "good" | "warn" | "bad"> = {
  covered: "good",
  partial: "warn",
  not_yet: "bad",
};

export default function ChartingClient({ scenario }: { scenario: ChartScenarioPublic }) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(scenario.fields.map((f) => [f.id, ""])),
  );
  const [phase, setPhase] = useState<"writing" | "grading" | "feedback">("writing");
  const [feedback, setFeedback] = useState<ChartFeedback | null>(null);

  async function submit() {
    setPhase("grading");
    const result = await gradeChartNote(scenario.id, answers);
    setFeedback(result);
    setPhase("feedback");
  }

  function tryAgain() {
    setAnswers(Object.fromEntries(scenario.fields.map((f) => [f.id, ""])));
    setFeedback(null);
    setPhase("writing");
  }

  const allFilled = scenario.fields.every((f) => answers[f.id]?.trim().length > 0);

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-8 sm:px-8">
      <div className="flex items-center justify-between">
        <Badge tone="teal">{scenario.format}</Badge>
        <Link href="/app/chart" className="focus-ring font-display text-sm font-bold text-accent">
          Exit
        </Link>
      </div>
      <h1 className="mt-2.5 text-[21px] font-bold text-foreground">{scenario.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-foreground-dim">{scenario.snapshot}</p>

      {phase === "writing" && (
        <div className="mt-6 flex flex-col gap-5">
          {scenario.fields.map((f) => (
            <div key={f.id}>
              <label htmlFor={`field-${f.id}`} className="font-display text-sm font-bold text-foreground">
                {f.label}
              </label>
              <textarea
                id={`field-${f.id}`}
                value={answers[f.id]}
                onChange={(e) => setAnswers((a) => ({ ...a, [f.id]: e.target.value }))}
                placeholder={f.placeholder}
                className="focus-ring mt-1.5 min-h-[90px] w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-sm text-foreground outline-none"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              disabled={!allFilled}
              onClick={submit}
              className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
            >
              Submit for feedback &rarr;
            </button>
          </div>
        </div>
      )}

      {phase === "grading" && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="pulse-dot h-2.5 w-2.5 rounded-full bg-accent" />
          <p className="text-sm text-foreground-dim">Checking your note&hellip;</p>
        </div>
      )}

      {phase === "feedback" && feedback && (
        <div className="mt-6">
          <div className="rounded-2xl bg-surface-2 p-5">
            <div className="font-display text-xl font-bold text-foreground">
              {feedback.coveredCount}/{feedback.totalFields} sections fully covered
            </div>
            <p className="mt-1 text-sm text-foreground-dim">
              This checks for a handful of expected keywords per section — it&rsquo;s a completeness nudge, not a
              judgment of your clinical reasoning or writing quality.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {feedback.perField.map((f) => (
              <div key={f.id} className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-foreground">{f.label}</span>
                  <Badge tone={STATUS_TONE[f.status]}>{STATUS_LABEL[f.status]}</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-dim">{f.guidance}</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground-dim">What you wrote: &ldquo;{answers[f.id]}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button onClick={tryAgain} className="focus-ring rounded-xl border border-border px-5 py-2.5 font-display text-sm font-bold text-foreground">
              Try this note again
            </button>
            <Link href="/app/chart" className="btn-press focus-ring rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white">
              Try another scenario
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
