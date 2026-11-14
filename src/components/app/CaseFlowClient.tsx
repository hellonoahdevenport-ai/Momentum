"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  startInterview,
  askPatient,
  orderEvidence,
  gradeInterpretationAction,
  gradeReasoningAndPlanAction,
} from "@/lib/cases/actions";
import type { CasePublicView, EvidenceResult, InterpretationGradeResult, DebriefResult } from "@/lib/cases/types";
import { recordCaseAttempt, loadProgress } from "@/lib/progress";
import Badge from "@/components/ui/Badge";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import LiveVitalsStrip from "@/components/LiveVitalsStrip";
import AnatomyDiagram from "@/components/AnatomyDiagram";
import RadialProgress from "@/components/ui/RadialProgress";
import CountUp from "@/components/ui/CountUp";
import SampleActivityFeed from "@/components/app/SampleActivityFeed";
import { useToast } from "@/context/ToastContext";

type PipelineStage = "ordered" | "collected" | "in-lab";
const PIPELINE_ORDER: PipelineStage[] = ["ordered", "collected", "in-lab"];
const PIPELINE_LABEL: Record<PipelineStage, string> = {
  ordered: "Ordered",
  collected: "Collected",
  "in-lab": "In lab",
};

interface ChatTurn {
  role: "patient" | "you";
  text: string;
  atTime?: string;
}

function nowLabel(): string {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function CaseFlowClient({ caseId, initial }: { caseId: string; initial: CasePublicView }) {
  const router = useRouter();
  const { push: pushToast } = useToast();
  const stages = initial.stages;
  const [stageIndex, setStageIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const stage = stages[stageIndex].key;
  const evidenceStageIndex = stages.findIndex((s) => s.key === "evidence");
  const reasoningStageIndex = stages.findIndex((s) => s.key === "reasoning");

  // --- problem list & differential ("Momentum learning") ---
  const [listsOpen, setListsOpen] = useState(false);
  const [problemItems, setProblemItems] = useState<string[]>([]);
  const [differentialItems, setDifferentialItems] = useState<string[]>([]);
  const [problemDraft, setProblemDraft] = useState("");
  const [differentialDraft, setDifferentialDraft] = useState("");
  const listsLocked = reasoningStageIndex >= 0 && stageIndex >= reasoningStageIndex;

  // --- interview ---
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [chatBusy, setChatBusy] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [askedTopicIds, setAskedTopicIds] = useState<string[]>([]);
  const [aiLiveThisCase, setAiLiveThisCase] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // --- evidence ---
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, EvidenceResult | PipelineStage | undefined>>({});
  const [marks, setMarks] = useState<Record<string, "normal" | "abnormal">>({});

  // --- interpretation ---
  const [answers, setAnswers] = useState<Record<string, number | number[] | string[]>>({});
  const [rankOrder, setRankOrder] = useState<Record<string, string[]>>({});
  const dragFrom = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [interpGrade, setInterpGrade] = useState<InterpretationGradeResult | null>(null);
  const [interpSubmitting, setInterpSubmitting] = useState(false);

  // --- reasoning ---
  const [conclusionIndex, setConclusionIndex] = useState<number | null>(null);
  const [differential, setDifferential] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<number>(3);
  const [changeMindText, setChangeMindText] = useState("");

  // --- plan ---
  const [planText, setPlanText] = useState("");

  // --- event / debrief ---
  const [eventChoiceId, setEventChoiceId] = useState<string | null>(null);
  const [debrief, setDebrief] = useState<DebriefResult | null>(null);
  const [grading, setGrading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const startedAt = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState("0:00");

  useEffect(() => {
    startedAt.current = Date.now();
    const t = setInterval(() => {
      const s = Math.floor((Date.now() - (startedAt.current ?? Date.now())) / 1000);
      setElapsed(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  function goTo(i: number) {
    if (i <= furthest) setStageIndex(i);
  }

  function advance() {
    const next = stageIndex + 1;
    setStageIndex(next);
    setFurthest((f) => Math.max(f, next));
  }

  async function beginInterview() {
    setChatBusy(true);
    try {
      const { text } = await startInterview(caseId);
      setTurns([{ role: "patient", text, atTime: nowLabel() }]);
    } catch {
      setErrorMsg("Couldn’t start the interview. Try again.");
    } finally {
      setChatBusy(false);
    }
    advance();
  }

  async function sendQuestion() {
    const q = chatInput.trim();
    if (!q || chatBusy) return;
    setChatInput("");
    setTurns((t) => [...t, { role: "you", text: q, atTime: nowLabel() }]);
    setChatBusy(true);
    try {
      const { text, topicId, usedAI } = await askPatient(caseId, q, askedTopicIds, turns);
      if (topicId) setAskedTopicIds((ids) => (ids.includes(topicId) ? ids : [...ids, topicId]));
      if (usedAI) setAiLiveThisCase(true);
      setTurns((t) => [...t, { role: "patient", text, atTime: nowLabel() }]);
    } catch {
      setErrorMsg("Couldn’t reach the patient. Try again.");
    } finally {
      setChatBusy(false);
      requestAnimationFrame(() => transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight }));
    }
  }

  function toggleEvidence(id: string) {
    if (results[id]) return;
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function pullEvidence() {
    const ids = selected.filter((id) => !results[id]);
    if (!ids.length) return;
    setResults((r) => {
      const next = { ...r };
      ids.forEach((id) => (next[id] = "ordered"));
      return next;
    });
    ids.forEach((id, i) => {
      const base = i * 180;
      setTimeout(() => setResults((r) => (r[id] === "ordered" ? { ...r, [id]: "collected" } : r)), base + 350);
      setTimeout(() => setResults((r) => (r[id] === "collected" ? { ...r, [id]: "in-lab" } : r)), base + 750);
    });
    try {
      const fetched = await orderEvidence(caseId, ids);
      fetched.forEach((item, i) => {
        const base = i * 180;
        setTimeout(() => setResults((r) => ({ ...r, [item.id]: item })), base + 1150);
      });
    } catch {
      setErrorMsg("Couldn’t pull results. Try again.");
    }
  }

  function setRanking(qid: string, items: string[]) {
    setRankOrder((r) => ({ ...r, [qid]: items }));
    setAnswers((a) => ({ ...a, [qid]: items }));
  }

  function moveRankItem(qid: string, items: string[], index: number, dir: -1 | 1) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setRanking(qid, next);
  }

  function reorderRankItem(qid: string, items: string[], fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setRanking(qid, next);
  }

  async function submitInterpretation() {
    setInterpSubmitting(true);
    setErrorMsg(null);
    try {
      // A ranking question's displayed order is an implicit answer even if
      // the learner never touches the reorder buttons, so fill in the
      // untouched default order before grading rather than submitting
      // nothing for it.
      const finalAnswers = { ...answers };
      initial.interpretationQuestions.forEach((q) => {
        if (q.type === "ranking" && finalAnswers[q.id] === undefined) {
          finalAnswers[q.id] = rankOrder[q.id] ?? q.items;
        }
      });
      const grade = await gradeInterpretationAction(caseId, finalAnswers);
      setInterpGrade(grade);
    } catch {
      setErrorMsg("Couldn’t grade those answers. Try again.");
    } finally {
      setInterpSubmitting(false);
    }
  }

  async function finishCase(finalEventChoiceId: string | null) {
    setGrading(true);
    setErrorMsg(null);
    try {
      const result = await gradeReasoningAndPlanAction(caseId, {
        conclusionChoiceIndex: conclusionIndex ?? -1,
        differentialChoiceIndices: differential,
        confidence,
        changeMyMindText: changeMindText,
        planText,
        eventChoiceId: finalEventChoiceId,
      });
      setDebrief(result);
      setStageIndex(stages.length - 1);
      setFurthest(stages.length - 1);
      pushToast({
        title: `Debrief ready — ${result.overallScore}/100`,
        body: result.verdict === "strong" ? "Strong work on this case." : "Take a look at what to revisit.",
        tone: result.overallScore >= 80 ? "good" : result.overallScore >= 55 ? "warn" : "bad",
      });
    } catch {
      setErrorMsg("Grading failed. Try again.");
    } finally {
      setGrading(false);
    }
  }

  function submitPlan() {
    if (initial.unfoldingEvent) {
      advance();
    } else {
      finishCase(null);
    }
  }

  function finishAndSave() {
    if (!debrief || finished) return;
    setFinished(true);
    const progress = loadProgress();
    const missed = interpGrade
      ? interpGrade.perQuestion
          .filter((p) => !p.correct)
          .map((p) => ({
            id: `${caseId}:${p.id}`,
            caseId,
            prompt: initial.interpretationQuestions.find((q) => q.id === p.id)?.prompt ?? "Review this finding.",
            answer: p.rationale,
          }))
      : [];
    recordCaseAttempt(
      progress,
      {
        caseId,
        trackKey: initial.meta.trackKey,
        unitKey: initial.meta.unitKey,
        completedAt: Date.now(),
        overallScore: debrief.overallScore,
        verdict: debrief.verdict,
        conclusionCorrect: debrief.conclusionCorrect,
        confidence,
        calibration: debrief.calibration,
      },
      missed,
    );
    router.push(`/app/learn/${initial.meta.trackKey}/${initial.meta.unitKey}`);
  }

  const canProceedReasoning = conclusionIndex !== null && differential.length > 0 && changeMindText.trim().length > 0;

  return (
    <div className={`track-${initial.meta.trackKey} mx-auto max-w-2xl px-5 pb-28 sm:px-8`}>
      <div className="-mx-5 border-b border-border bg-background px-5 pb-3 pt-4 sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge tone="accent">{initial.meta.estimatedMinutes} min</Badge>
            <ReviewStatusBadge status={initial.meta.reviewStatus} />
          </div>
          <div className="flex items-center gap-3.5">
            <Link href={`/app/learn/${initial.meta.trackKey}/${initial.meta.unitKey}`} className="focus-ring font-display text-sm font-bold text-accent">
              Exit
            </Link>
            <span className="font-data text-xs text-foreground-dim">{elapsed}</span>
          </div>
        </div>
        <h1 className="mt-2.5 text-[21px] font-bold text-foreground">{initial.patient.name}</h1>
        <p className="text-sm text-foreground-dim">{initial.patient.summary}</p>
        <p className="mt-1 text-sm leading-snug text-foreground">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Chief concern </span>
          {initial.presentingIssue}
        </p>
        <div className="mt-2">
          <LiveVitalsStrip snapshotFacts={initial.snapshotFacts} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {stage === "interview" && (
            <Badge tone={aiLiveThisCase ? "good" : "neutral"}>
              {aiLiveThisCase ? "AI-powered dialogue" : "Scripted demo dialogue"}
            </Badge>
          )}
          {stageIndex >= evidenceStageIndex && (
            <button
              type="button"
              onClick={() => setListsOpen((v) => !v)}
              className="focus-ring rounded-full border border-border px-3 py-1 text-xs font-bold text-foreground-dim hover:text-foreground"
            >
              {listsOpen ? "Hide" : "Show"} problem list &amp; differential
              {(problemItems.length > 0 || differentialItems.length > 0) && ` (${problemItems.length + differentialItems.length})`}
            </button>
          )}
        </div>
        {listsOpen && stageIndex >= evidenceStageIndex && (
          <div className="mt-3 grid gap-3 rounded-2xl border border-border bg-surface-2 p-4 sm:grid-cols-2">
            <ListEditor
              title="Problem list"
              items={problemItems}
              draft={problemDraft}
              onDraftChange={setProblemDraft}
              onAdd={() => {
                if (!problemDraft.trim() || listsLocked) return;
                setProblemItems((items) => [...items, problemDraft.trim()]);
                setProblemDraft("");
              }}
              onRemove={(i) => setProblemItems((items) => items.filter((_, idx) => idx !== i))}
              locked={listsLocked}
            />
            <ListEditor
              title="Differential"
              items={differentialItems}
              draft={differentialDraft}
              onDraftChange={setDifferentialDraft}
              onAdd={() => {
                if (!differentialDraft.trim() || listsLocked) return;
                setDifferentialItems((items) => [...items, differentialDraft.trim()]);
                setDifferentialDraft("");
              }}
              onRemove={(i) => setDifferentialItems((items) => items.filter((_, idx) => idx !== i))}
              locked={listsLocked}
            />
            <p className="col-span-full text-[11px] text-foreground-dim">
              {listsLocked
                ? "Locked once you reach Reasoning — this is your working list from the interview and evidence stages."
                : "Your own running notes as you go. Not graded — a scratchpad for momentum, not a scored answer."}
            </p>
          </div>
        )}
        <div className="scrollbar-thin mt-3 flex gap-1.5 overflow-x-auto">
          {stages.map((s, i) => (
            <button
              key={s.key}
              disabled={i > furthest}
              onClick={() => goTo(i)}
              className={`focus-ring whitespace-nowrap rounded-full px-3 py-1.5 font-display text-[12.5px] font-bold ${
                i === stageIndex ? "bg-accent text-white" : i < stageIndex ? "text-accent" : "text-foreground-dim"
              } ${i > furthest ? "cursor-not-allowed opacity-40" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {errorMsg && <div className="mt-4 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm text-warn">{errorMsg}</div>}

      {stage === "brief" && (
        <div className="mt-6">
          <h2 className="font-display text-lg font-bold text-foreground">{initial.meta.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground-dim">{initial.presentingIssue}</p>
          {initial.meta.contentWarning && (
            <div className="mt-3 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm text-warn">{initial.meta.contentWarning}</div>
          )}
          <div className="mt-5 rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground-dim">
            This is a fictional case for education and simulation only — not a substitute for supervision, local
            policy, or professional judgment.
          </div>
          <div className="mt-4">
            <SampleActivityFeed />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={beginInterview}
              disabled={chatBusy}
              className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
            >
              Begin the {initial.meta.trackKey === "nursing" ? "assessment" : "interview"} &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "interview" && (
        <div className="mt-5">
          <div ref={transcriptRef} className="flex max-h-[420px] flex-col overflow-y-auto pr-0.5">
            {turns.map((t, i) => (
              <div key={i} className="border-b border-border py-3">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${t.role === "you" ? "text-accent" : "text-foreground-dim"}`}>
                    {t.role === "you" ? "You" : initial.patient.name}
                  </span>
                  {t.atTime && <span className="font-data text-[10px] text-foreground-dim">{t.atTime}</span>}
                </div>
                <p className="text-[15px] leading-relaxed text-foreground">{t.text}</p>
              </div>
            ))}
            {chatBusy && (
              <div className="flex items-center gap-1.5 py-3" aria-live="polite" aria-label={`${initial.patient.name} is typing`}>
                <span className="text-[11px] font-bold uppercase tracking-wide text-foreground-dim">{initial.patient.name}</span>
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-foreground-dim" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3.5 flex items-center gap-2 rounded-2xl bg-surface-2 py-1.5 pl-4 pr-1.5">
            <label htmlFor="chat-input" className="sr-only">
              Ask {initial.patient.name} a question
            </label>
            <input
              id="chat-input"
              value={chatInput}
              disabled={chatBusy}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendQuestion();
                }
              }}
              placeholder={`Ask ${initial.patient.name.split(" ")[0]} something...`}
              className="flex-1 bg-transparent py-2 text-[15px] text-foreground outline-none placeholder:text-foreground-dim"
            />
            <button
              disabled={chatBusy || !chatInput.trim()}
              onClick={sendQuestion}
              className="focus-ring rounded-xl bg-accent px-4 py-2 font-display text-sm font-bold text-white disabled:opacity-40"
            >
              Ask
            </button>
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={advance} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
              Proceed to {stages[stageIndex + 1]?.label.toLowerCase()} &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "evidence" && (
        <div className="mt-5">
          <div className="rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground-dim">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Initial assessment</span>
            {initial.initialAssessment}
          </div>

          <div className="mt-4">
            <AnatomyDiagram findings={initial.examFindings} />
          </div>

          {initial.evidenceCategories.map((cat) => {
            const items = initial.evidenceCatalog.filter((e) => e.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="mt-5">
                <h4 className="font-display mb-1.5 text-[15px] font-bold text-foreground">{cat}</h4>
                {items.map((item) => {
                  const result = results[item.id];
                  const isSelected = selected.includes(item.id);
                  return (
                    <div key={item.id} className="flex items-start gap-3 rounded-xl px-2.5 py-2.5">
                      {!result ? (
                        <input
                          type="checkbox"
                          id={`ev-${item.id}`}
                          checked={isSelected}
                          onChange={() => toggleEvidence(item.id)}
                          className="mt-0.5 h-4 w-4 accent-accent"
                        />
                      ) : (
                        <span className="mt-0.5 w-4" />
                      )}
                      <label htmlFor={`ev-${item.id}`} className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
                          {item.name}
                          {item.invasive && <Badge tone="warn">Invasive</Badge>}
                          {item.costNote === "higher cost" && <Badge tone="coral">Higher cost</Badge>}
                        </div>
                        {typeof result === "string" && (
                          <div className="mt-1.5 flex items-center gap-2">
                            {PIPELINE_ORDER.map((stage, i) => {
                              const currentIdx = PIPELINE_ORDER.indexOf(result);
                              const done = i < currentIdx;
                              const active = i === currentIdx;
                              return (
                                <div key={stage} className="flex items-center gap-1.5">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${active ? "pulse-dot bg-accent" : done ? "bg-accent" : "bg-border-strong"}`}
                                  />
                                  <span className={`font-data text-[10px] ${active ? "text-accent" : "text-foreground-dim"}`}>
                                    {PIPELINE_LABEL[stage]}
                                  </span>
                                  {i < PIPELINE_ORDER.length - 1 && <span className="h-px w-3 bg-border-strong" />}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {result && typeof result !== "string" && (() => {
                          const mark = marks[item.id];
                          const actuallyAbnormal = result.resultFlag !== "normal";
                          const markCorrect = mark ? (mark === "abnormal") === actuallyAbnormal : false;
                          return (
                            <div className="mt-1 text-xs leading-relaxed">
                              <span className={mark ? (result.resultFlag === "critical" ? "font-bold text-bad" : result.resultFlag === "abnormal" ? "font-semibold text-warn" : "text-foreground") : "text-foreground"}>
                                {result.resultText}
                              </span>
                              {result.referenceRange && <span className="text-foreground-dim"> (ref: {result.referenceRange})</span>}
                              {!mark ? (
                                <div className="mt-1.5 flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setMarks((m) => ({ ...m, [item.id]: "normal" }));
                                    }}
                                    className="focus-ring rounded-md border border-border px-2 py-1 text-[11px] font-bold text-foreground-dim hover:border-border-strong"
                                  >
                                    Mark normal
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setMarks((m) => ({ ...m, [item.id]: "abnormal" }));
                                    }}
                                    className="focus-ring rounded-md border border-border px-2 py-1 text-[11px] font-bold text-foreground-dim hover:border-border-strong"
                                  >
                                    Mark abnormal
                                  </button>
                                </div>
                              ) : (
                                <div className={`mt-1 font-semibold ${markCorrect ? "text-good" : "text-bad"}`}>
                                  {markCorrect ? "Correct — " : "Not quite — "}
                                  this is {actuallyAbnormal ? "abnormal" : "normal"}.
                                </div>
                              )}
                              <div className="mt-0.5 text-foreground-dim">{result.teachingNote}</div>
                            </div>
                          );
                        })()}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-sm text-foreground-dim">{selected.filter((id) => !results[id]).length} selected</div>
            <button
              disabled={selected.filter((id) => !results[id]).length === 0}
              onClick={pullEvidence}
              className="btn-press focus-ring rounded-xl bg-accent px-5 py-2.5 font-display font-bold text-white disabled:opacity-40"
            >
              Pull selected evidence
            </button>
          </div>

          <div className="mt-5 flex justify-end">
            <button onClick={advance} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
              Proceed to {stages[stageIndex + 1]?.label.toLowerCase()} &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "interpretation" && (
        <div className="mt-5 flex flex-col gap-7">
          {initial.interpretationQuestions.map((q) => {
            const graded = interpGrade?.perQuestion.find((p) => p.id === q.id);
            return (
              <div key={q.id} className="rounded-2xl border border-border bg-surface p-5">
                <p className="font-display text-[15px] font-bold text-foreground">{q.prompt}</p>

                {q.type === "mcq" && q.display === "dropdown" && (
                  <select
                    disabled={!!interpGrade}
                    value={typeof answers[q.id] === "number" ? (answers[q.id] as number) : ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: Number(e.target.value) }))}
                    className="focus-ring mt-3 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground"
                  >
                    <option value="" disabled>
                      &mdash; choose one &mdash;
                    </option>
                    {q.options.map((opt, i) => (
                      <option key={opt} value={i}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === "mcq" && q.display === "radio" && (
                  <div className="mt-3 flex flex-col gap-2">
                    {q.options.map((opt, i) => (
                      <label key={opt} className="flex items-center gap-2.5 text-sm text-foreground">
                        <input
                          type="radio"
                          name={q.id}
                          disabled={!!interpGrade}
                          checked={answers[q.id] === i}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                          className="h-4 w-4 accent-accent"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === "multi-select" && (
                  <div className="mt-3 flex flex-col gap-2">
                    {q.options.map((opt, i) => {
                      const picked = Array.isArray(answers[q.id]) ? (answers[q.id] as number[]) : [];
                      return (
                        <label key={opt} className="flex items-center gap-2.5 text-sm text-foreground">
                          <input
                            type="checkbox"
                            disabled={!!interpGrade}
                            checked={picked.includes(i)}
                            onChange={() =>
                              setAnswers((a) => {
                                const cur = Array.isArray(a[q.id]) ? (a[q.id] as number[]) : [];
                                const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
                                return { ...a, [q.id]: next };
                              })
                            }
                            className="h-4 w-4 accent-accent"
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                )}

                {q.type === "ranking" && (
                  <ol className="mt-3 flex flex-col gap-2">
                    {(rankOrder[q.id] ?? q.items).map((item, i) => {
                      const currentItems = rankOrder[q.id] ?? q.items;
                      return (
                      <li
                        key={item}
                        draggable={!interpGrade}
                        onDragStart={() => {
                          dragFrom.current = i;
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverIndex(i);
                        }}
                        onDragLeave={() => setDragOverIndex((d) => (d === i ? null : d))}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragFrom.current !== null) reorderRankItem(q.id, currentItems, dragFrom.current, i);
                          dragFrom.current = null;
                          setDragOverIndex(null);
                        }}
                        onDragEnd={() => {
                          dragFrom.current = null;
                          setDragOverIndex(null);
                        }}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-foreground transition-colors ${
                          dragOverIndex === i ? "border-accent bg-accent-soft" : "border-border bg-surface-2"
                        } ${!interpGrade ? "cursor-grab active:cursor-grabbing" : ""}`}
                      >
                        <span className="text-foreground-dim" aria-hidden="true">
                          &#8942;&#8942;
                        </span>
                        <span className="font-data text-xs text-foreground-dim">{i + 1}</span>
                        <span className="flex-1">{item}</span>
                        <button
                          type="button"
                          disabled={!!interpGrade}
                          onClick={() => moveRankItem(q.id, rankOrder[q.id] ?? q.items, i, -1)}
                          className="focus-ring rounded px-1.5 py-0.5 text-foreground-dim disabled:opacity-30"
                          aria-label={`Move ${item} up`}
                        >
                          &uarr;
                        </button>
                        <button
                          type="button"
                          disabled={!!interpGrade}
                          onClick={() => moveRankItem(q.id, rankOrder[q.id] ?? q.items, i, 1)}
                          className="focus-ring rounded px-1.5 py-0.5 text-foreground-dim disabled:opacity-30"
                          aria-label={`Move ${item} down`}
                        >
                          &darr;
                        </button>
                      </li>
                      );
                    })}
                  </ol>
                )}

                {graded && (
                  <div className={`mt-3 rounded-lg px-3 py-2 text-xs leading-relaxed ${graded.correct ? "bg-good-soft text-good" : "bg-warn-soft text-warn"}`}>
                    <strong>{graded.correct ? "Correct. " : `Score: ${graded.score}/100. `}</strong>
                    {graded.rationale}
                  </div>
                )}
              </div>
            );
          })}

          {!interpGrade ? (
            <div className="flex justify-end">
              <button
                onClick={submitInterpretation}
                disabled={interpSubmitting}
                className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
              >
                {interpSubmitting ? "Checking…" : "Check my answers"}
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button onClick={advance} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
                Continue to {stages[stageIndex + 1]?.label.toLowerCase()} &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {stage === "reasoning" && (
        <div className="mt-5 flex flex-col gap-7">
          <div>
            <label className="font-display block text-[15px] font-bold text-foreground">{initial.conclusionLabel}</label>
            <div className="mt-3 flex flex-col gap-2">
              {initial.conclusionOptions.map((opt, i) => (
                <label key={opt} className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-foreground">
                  <input
                    type="radio"
                    name="conclusion"
                    checked={conclusionIndex === i}
                    onChange={() => setConclusionIndex(i)}
                    className="h-4 w-4 accent-accent"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-display block text-[15px] font-bold text-foreground">Differential — keep in mind</label>
            <p className="mt-1 text-xs text-foreground-dim">Select every hypothesis worth keeping on the differential.</p>
            <div className="mt-3 flex flex-col gap-2">
              {initial.differentialOptions.map((opt, i) => (
                <label key={opt} className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={differential.includes(i)}
                    onChange={() => setDifferential((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))}
                    className="h-4 w-4 accent-accent"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-display block text-[15px] font-bold text-foreground">How confident are you?</label>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfidence(n)}
                  className={`focus-ring h-10 w-10 rounded-full font-display text-sm font-bold ${
                    confidence === n ? "bg-accent text-white" : "border border-border text-foreground-dim"
                  }`}
                  aria-pressed={confidence === n}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-foreground-dim">1 = not confident at all, 5 = very confident</p>
          </div>

          <div>
            <label htmlFor="change-mind" className="font-display block text-[15px] font-bold text-foreground">
              What finding would change your mind?
            </label>
            <textarea
              id="change-mind"
              value={changeMindText}
              onChange={(e) => setChangeMindText(e.target.value)}
              placeholder="If ___ were true, I’d reconsider because ___"
              className="focus-ring mt-2 min-h-[80px] w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-sm text-foreground outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={!canProceedReasoning}
              onClick={advance}
              className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
            >
              Continue to {stages[stageIndex + 1]?.label.toLowerCase()} &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "plan" && (
        <div className="mt-5">
          <label htmlFor="plan-text" className="font-display block text-[15px] font-bold text-foreground">
            {initial.planPrompt.label}
          </label>
          <textarea
            id="plan-text"
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
            placeholder={initial.planPrompt.placeholder}
            className="focus-ring mt-2 min-h-[140px] w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-sm text-foreground outline-none"
          />
          <div className="mt-4 rounded-xl bg-surface-2 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Consider covering</div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {initial.planPrompt.safetyChecklist.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-foreground-dim">
                  <span className="text-accent">&bull;</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              disabled={planText.trim().length === 0 || grading}
              onClick={submitPlan}
              className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
            >
              {grading ? "Grading…" : "Submit for grading"}
            </button>
          </div>
        </div>
      )}

      {stage === "event" && initial.unfoldingEvent && (
        <div className="mt-5">
          <div className="rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground">{initial.unfoldingEvent.prompt}</div>
          <div className="mt-4 flex flex-col gap-2.5">
            {initial.unfoldingEvent.choices.map((c) => (
              <button
                key={c.id}
                disabled={grading}
                onClick={() => {
                  setEventChoiceId(c.id);
                  finishCase(c.id);
                }}
                className="focus-ring rounded-xl border border-border bg-surface px-4 py-3 text-left text-sm font-semibold text-foreground hover:border-accent disabled:opacity-40"
              >
                {c.label}
              </button>
            ))}
          </div>
          {grading && <p className="mt-3 text-sm text-foreground-dim">Grading&hellip;</p>}
        </div>
      )}

      {stage === "debrief" && debrief && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-2 p-4">
            <RadialProgress
              value={debrief.overallScore}
              size={78}
              strokeWidth={7}
              color={debrief.overallScore >= 80 ? "var(--good)" : debrief.overallScore >= 55 ? "var(--warn)" : "var(--bad)"}
            >
              <span
                className={`font-display text-2xl font-extrabold leading-none ${
                  debrief.overallScore >= 80 ? "text-good" : debrief.overallScore >= 55 ? "text-warn" : "text-bad"
                }`}
              >
                <CountUp value={debrief.overallScore} />
              </span>
            </RadialProgress>
            <div>
              <Badge tone={debrief.verdict === "strong" ? "good" : debrief.verdict === "developing" ? "warn" : "bad"}>
                {debrief.verdict === "strong" ? "Strong" : debrief.verdict === "developing" ? "Developing" : "Needs review"}
              </Badge>
              <div className="mt-1.5 text-sm text-foreground-dim">
                {debrief.conclusionCorrect ? "Your leading answer matched the reviewed case." : "Your leading answer didn’t match the reviewed case."}
              </div>
            </div>
          </div>

          {debrief.calibration !== "unknown" && (
            <div className="mt-3 rounded-xl bg-violet-soft px-3.5 py-2.5 text-sm text-violet">
              Confidence check: you were{" "}
              {debrief.calibration === "well_calibrated"
                ? "well calibrated"
                : debrief.calibration === "overconfident"
                  ? "more confident than your performance supports"
                  : "less confident than your performance deserved"}
              .
            </div>
          )}

          {eventChoiceId && debrief.eventConsequence && (
            <div className="mt-4 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-foreground">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-accent">What happened next</span>
              {debrief.eventConsequence}
            </div>
          )}

          <div className="mt-4 border-b border-border pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">{debrief.content.correctConclusionLabel}</span>
            <div className="font-display mt-1 text-lg font-bold text-accent">{debrief.content.correctConclusion}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{debrief.content.conclusionExplanation}</p>
          </div>

          <div className="border-b border-border py-3.5">
            <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground-dim">
              On your {initial.actionLabel.toLowerCase()} ({debrief.planScore}/100)
            </h4>
            <p className="text-[14.5px] leading-relaxed text-foreground">{debrief.planFeedback}</p>
          </div>

          {debrief.missedConsiderations.length > 0 && (
            <div className="border-b border-border py-3.5">
              <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground-dim">What to revisit</h4>
              <ul className="flex flex-col gap-1.5 text-[14.5px] leading-relaxed text-foreground">
                {debrief.missedConsiderations.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-bad">&mdash;</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-foreground-dim">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Next learning goal</span>
            {debrief.content.nextLearningGoalHint}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
            <Link href={`/app/quiz/${caseId}`} className="focus-ring font-display text-sm font-bold text-accent">
              Quick check quiz &rarr;
            </Link>
            <button onClick={finishAndSave} disabled={finished} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-60">
              {finished ? "Saved — redirecting…" : "Finish & save progress"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ListEditor({
  title,
  items,
  draft,
  onDraftChange,
  onAdd,
  onRemove,
  locked,
}: {
  title: string;
  items: string[];
  draft: string;
  onDraftChange: (v: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  locked: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">{title}</div>
      <ul className="mt-1.5 flex flex-col gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-sm text-foreground">
            {item}
            {!locked && (
              <button type="button" onClick={() => onRemove(i)} className="focus-ring text-xs font-bold text-foreground-dim hover:text-bad" aria-label={`Remove ${item}`}>
                &#10005;
              </button>
            )}
          </li>
        ))}
        {items.length === 0 && <li className="text-xs text-foreground-dim">Nothing added yet.</li>}
      </ul>
      {!locked && (
        <div className="mt-2 flex gap-1.5">
          <input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAdd();
              }
            }}
            placeholder="Add an item…"
            className="focus-ring flex-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-foreground outline-none"
          />
          <button type="button" onClick={onAdd} className="focus-ring rounded-lg bg-accent px-2.5 py-1.5 text-xs font-bold text-white">
            Add
          </button>
        </div>
      )}
    </div>
  );
}
