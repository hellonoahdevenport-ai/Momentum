"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import { openingLinePrompt } from "@/lib/prompts";
import { loadProgress, recordAttempt } from "@/lib/progress";
import type { CaseData, ChatTurn, GradeResult, TrackKey } from "@/lib/types";

type Stage = "loading" | "error" | "interview" | "evidence" | "assessment" | "feedback";

interface Feedback extends GradeResult {
  conclusionCorrect: boolean;
  overallScore: number;
  verdict: "correct" | "partially_correct" | "incorrect";
}

export default function CaseFlowClient({ trackKey, unitKey }: { trackKey: TrackKey; unitKey: string }) {
  const router = useRouter();
  const track = TRACKS[trackKey];
  const unit = unitByKey(unitKey)!;

  const [stage, setStage] = useState<Stage>("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseData | null>(null);

  const [chatTurns, setChatTurns] = useState<ChatTurn[]>([]); // index 0 is the hidden kickoff turn
  const [chatBusy, setChatBusy] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [evidenceStatus, setEvidenceStatus] = useState<Record<string, "ordered" | "done">>({});

  const [selectedConclusion, setSelectedConclusion] = useState("");
  const [actionText, setActionText] = useState("");
  const [assessmentBusy, setAssessmentBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [elapsed, setElapsed] = useState("0:00");

  useEffect(() => {
    startedAt.current = Date.now();
    const t = setInterval(() => {
      const s = Math.floor((Date.now() - startedAt.current) / 1000);
      setElapsed(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  async function openInterview(c: CaseData) {
    setChatBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: trackKey, caseData: c, turns: [] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't reach the patient.");
      setChatTurns([openingLinePrompt(), { role: "assistant", content: data.reply }]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setChatBusy(false);
    }
  }

  // --- load the case, then kick off the interview ---
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setStage("loading");
      setErrorMsg(null);
      try {
        const res = await fetch("/api/case", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track: trackKey, unit: unitKey }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Couldn't generate a case.");
        if (cancelled) return;
        setCaseData(data.caseData as CaseData);
        setStage("interview");
        await openInterview(data.caseData as CaseData);
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        setStage("error");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackKey, unitKey]);

  async function sendMessage() {
    const text = chatInput.trim();
    if (!text || chatBusy || !caseData) return;
    setChatInput("");
    const withUser = [...chatTurns, { role: "user" as const, content: text }];
    setChatTurns(withUser);
    setChatBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: trackKey, caseData, turns: withUser }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't reach the patient.");
      setChatTurns([...withUser, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setChatTurns(chatTurns); // revert optimistic turn
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setChatBusy(false);
      requestAnimationFrame(() => {
        transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight });
      });
    }
  }

  function toggleEvidence(id: string) {
    if (evidenceStatus[id]) return;
    setOrderedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  function pullSelectedEvidence() {
    const ids = orderedIds.filter((id) => !evidenceStatus[id]);
    if (!ids.length) return;
    setEvidenceStatus((s) => {
      const next = { ...s };
      ids.forEach((id) => (next[id] = "ordered"));
      return next;
    });
    ids.forEach((id, i) => {
      const delay = 450 + Math.random() * 1000 + i * 140;
      setTimeout(() => {
        setEvidenceStatus((s) => ({ ...s, [id]: "done" }));
      }, delay);
    });
  }

  async function submitAssessment() {
    if (!selectedConclusion || assessmentBusy || !caseData) return;
    setAssessmentBusy(true);
    setErrorMsg(null);
    const conclusionCorrect = selectedConclusion === caseData.conclusion;
    const orderedEvidenceNames = Object.keys(evidenceStatus).map((id) => {
      const item = caseData.evidenceItems.find((e) => e.id === id);
      return item ? `${item.name}: ${item.result}` : id;
    });

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: trackKey,
          caseData,
          transcript: chatTurns.slice(1),
          orderedEvidenceNames,
          actionText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Grading failed.");
      const grade = data.grade as GradeResult;
      const overallScore = Math.round((conclusionCorrect ? 50 : 0) + grade.actionScore * 0.5);
      const verdict: Feedback["verdict"] =
        conclusionCorrect && grade.actionScore >= 70
          ? "correct"
          : conclusionCorrect || grade.actionScore >= 50
            ? "partially_correct"
            : "incorrect";
      setFeedback({ ...grade, conclusionCorrect, overallScore, verdict });
      setStage("feedback");
    } catch (err) {
      setErrorMsg(
        (err instanceof Error ? err.message : "Grading failed") +
          " Showing a basic assessment instead.",
      );
      const overallScore = conclusionCorrect ? 70 : 25;
      setFeedback({
        actionScore: 50,
        actionFeedback: `The recommended response: ${caseData.recommendedAction}`,
        evidenceFeedback: "Automatic grading is unavailable right now, so evidence gathering wasn't scored in detail.",
        missedConsiderations: caseData.keyConsiderations,
        outcome: conclusionCorrect ? caseData.goodOutcome : caseData.badOutcome,
        conclusionCorrect,
        overallScore,
        verdict: conclusionCorrect ? "partially_correct" : "incorrect",
      });
      setStage("feedback");
    } finally {
      setAssessmentBusy(false);
    }
  }

  function finishUnit() {
    if (feedback) {
      const progress = loadProgress();
      recordAttempt(progress, trackKey, unitKey, feedback.overallScore);
    }
    router.push(`/learn/${trackKey}`);
  }

  if (stage === "loading") {
    return (
      <div className={`track-${trackKey} flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center`}>
        <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-border border-t-accent" />
        <div className="font-data text-sm text-foreground-dim">Building a new case&hellip;</div>
      </div>
    );
  }

  if (stage === "error" || !caseData) {
    return (
      <div className={`track-${trackKey} mx-auto max-w-xl px-6 py-20 text-center`}>
        <p className="text-sm text-bad">{errorMsg ?? "Something went wrong."}</p>
        <p className="mt-3 text-xs text-foreground-dim">
          Check that <code className="font-data">ANTHROPIC_API_KEY</code> is set in{" "}
          <code className="font-data">.env.local</code> and the dev server was restarted.
        </p>
        <Link href={`/learn/${trackKey}`} className="mt-6 inline-block font-display text-sm font-bold text-accent">
          &larr; Back to skill path
        </Link>
      </div>
    );
  }

  const stages: { key: Stage; label: string }[] = [
    { key: "interview", label: "Interview" },
    { key: "evidence", label: "Evidence" },
    { key: "assessment", label: track.conclusionLabel },
    { key: "feedback", label: "Feedback" },
  ];
  const order: Stage[] = ["interview", "evidence", "assessment", "feedback"];
  const currentIdx = order.indexOf(stage);

  return (
    <div className={`track-${trackKey} mx-auto max-w-2xl px-6 pb-24`}>
      {/* case header */}
      <div className="sticky top-0 z-10 -mx-6 border-b border-border bg-background px-6 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {unit.label}
          </span>
          <div className="flex items-center gap-3.5">
            <Link href={`/learn/${trackKey}`} className="font-display text-sm font-bold text-accent">
              Exit
            </Link>
            <span className="font-data text-xs text-foreground-dim">{elapsed}</span>
          </div>
        </div>
        <h2 className="mt-2.5 text-[22px] font-bold">{caseData.subjectName}</h2>
        <p className="text-sm text-foreground-dim">{caseData.subjectSummary}</p>
        <p className="mt-2 text-sm leading-snug">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Presenting </span>
          {caseData.presentingIssue}
        </p>
        <div className="font-data mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-xs">
          {caseData.snapshotFacts.map((f) => (
            <span key={f.label}>
              <span className="text-foreground-dim">{f.label} </span>
              {f.value}
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {stages.map((s) => {
            const idx = order.indexOf(s.key);
            const locked = s.key === "feedback" && !feedback;
            const active = stage === s.key;
            return (
              <button
                key={s.key}
                disabled={locked}
                onClick={() => setStage(s.key)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 font-display text-[13px] font-bold ${
                  active
                    ? "bg-accent text-white"
                    : idx < currentIdx
                      ? "text-accent"
                      : "text-foreground-dim"
                } ${locked ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {errorMsg && stage !== "feedback" && (
        <div className="mt-4 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm text-warn">{errorMsg}</div>
      )}

      {stage === "interview" && (
        <div className="mt-5">
          <div ref={transcriptRef} className="flex max-h-[420px] flex-col overflow-y-auto pr-0.5">
            {chatTurns.slice(1).map((t, i) => (
              <div key={i} className="border-b border-border py-3">
                <div className={`mb-1 text-[11px] font-bold uppercase tracking-wide ${t.role === "user" ? "text-accent" : "text-foreground-dim"}`}>
                  {t.role === "user" ? "You" : caseData.subjectName}
                </div>
                <p className="text-[15px] leading-relaxed">{t.content}</p>
              </div>
            ))}
            {chatBusy && (
              <div className="border-b border-border py-3">
                <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-foreground-dim">
                  {caseData.subjectName}
                </div>
                <p className="text-[15px] italic text-foreground-dim">&hellip;</p>
              </div>
            )}
          </div>
          <div className="mt-3.5 flex items-center gap-2 rounded-2xl bg-surface-2 py-1.5 pl-4 pr-1.5">
            <input
              value={chatInput}
              disabled={chatBusy}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={chatBusy ? "Waiting for a reply..." : `Ask ${caseData.subjectName.split(" ")[0]} something...`}
              className="flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-foreground-dim"
            />
            <button
              disabled={chatBusy}
              onClick={sendMessage}
              className="rounded-xl bg-accent px-4 py-2 font-display text-sm font-bold text-white disabled:opacity-40"
            >
              Ask
            </button>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setStage("evidence")}
              className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white"
            >
              Proceed to evidence &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "evidence" && (
        <div className="mt-5">
          <div className="rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-foreground-dim">
              Initial assessment
            </span>
            {caseData.initialAssessment}
          </div>

          {track.evidenceCategories.map((cat) => {
            const items = caseData.evidenceItems.filter((e) => e.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="mt-5">
                <h4 className="font-display mb-1.5 text-[15px] font-bold">{cat}</h4>
                {items.map((item) => {
                  const status = evidenceStatus[item.id];
                  const selected = orderedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => !status && toggleEvidence(item.id)}
                      className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${!status ? "cursor-pointer hover:bg-surface-2" : ""}`}
                    >
                      {!status ? (
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleEvidence(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 accent-accent"
                        />
                      ) : (
                        <span className="w-4" />
                      )}
                      <div className="flex-1 text-sm">{item.name}</div>
                      {status === "ordered" && <div className="font-data text-xs text-foreground-dim">pending&hellip;</div>}
                      {status === "done" && (
                        <div className="flex items-center gap-1.5 text-right text-xs text-foreground-dim">
                          {item.significant && <span className="h-1.5 w-1.5 rounded-full bg-warn" />}
                          {item.result}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-sm text-foreground-dim">
              {orderedIds.filter((id) => !evidenceStatus[id]).length} selected
            </div>
            <button
              disabled={orderedIds.filter((id) => !evidenceStatus[id]).length === 0}
              onClick={pullSelectedEvidence}
              className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-5 py-2.5 font-display font-bold text-white disabled:opacity-40"
            >
              Pull selected evidence
            </button>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setStage("assessment")}
              className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white"
            >
              Proceed to {track.conclusionLabel.toLowerCase()} &rarr;
            </button>
          </div>
        </div>
      )}

      {stage === "assessment" && (
        <div className="mt-5">
          <div className="mb-5">
            <label className="font-display mb-1.5 block text-[15px] font-bold">{track.conclusionLabel}</label>
            <select
              value={selectedConclusion}
              onChange={(e) => setSelectedConclusion(e.target.value)}
              className="w-full rounded-2xl border-2 border-transparent bg-surface-2 px-3.5 py-3 text-sm outline-none focus:border-accent"
            >
              <option value="">&mdash; choose your leading {track.conclusionLabel.toLowerCase()} &mdash;</option>
              {caseData.conclusionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-foreground-dim">Multiple choice, board-style &mdash; one best answer.</p>
          </div>

          <div className="mb-5">
            <label className="font-display mb-1.5 block text-[15px] font-bold">{track.actionLabel}</label>
            <textarea
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="What would you do next?"
              className="min-h-[90px] w-full rounded-2xl border-2 border-transparent bg-surface-2 px-3.5 py-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={!selectedConclusion || assessmentBusy}
              onClick={submitAssessment}
              className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white disabled:opacity-40"
            >
              {assessmentBusy ? "Grading…" : "Submit for grading"}
            </button>
          </div>
        </div>
      )}

      {stage === "feedback" && feedback && (
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-2 p-4">
            <div
              className={`font-display text-[46px] font-extrabold leading-none ${
                feedback.overallScore >= 80 ? "text-good" : feedback.overallScore >= 50 ? "text-warn" : "text-bad"
              }`}
            >
              {feedback.overallScore}
            </div>
            <div>
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                  feedback.verdict === "correct"
                    ? "bg-good-soft text-good"
                    : feedback.verdict === "partially_correct"
                      ? "bg-warn-soft text-warn"
                      : "bg-bad-soft text-bad"
                }`}
              >
                {feedback.verdict === "correct" ? "Correct" : feedback.verdict === "partially_correct" ? "Partially correct" : "Incorrect"}
              </span>
              <div className="mt-1.5 text-sm text-foreground-dim">
                You said: &ldquo;{selectedConclusion}&rdquo; {feedback.conclusionCorrect ? "✓" : "✗"}
              </div>
            </div>
          </div>

          <div className="mt-4 border-b border-border pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">
              Correct {track.conclusionLabel.toLowerCase()}
            </span>
            <div className="font-display mt-1 text-lg font-bold text-accent">{caseData.conclusion}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{caseData.conclusionExplanation}</p>
          </div>

          <FeedbackBlock title={`On your ${track.actionLabel.toLowerCase()}`} text={feedback.actionFeedback} />
          <FeedbackBlock title="On your evidence gathering" text={feedback.evidenceFeedback} />

          {feedback.missedConsiderations.length > 0 && (
            <div className="border-b border-border py-3.5">
              <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground-dim">
                What you didn&rsquo;t catch
              </h4>
              <ul className="flex flex-col gap-1.5 text-[14.5px] leading-relaxed">
                {feedback.missedConsiderations.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-bad">&mdash;</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-accent-soft p-4 text-sm leading-relaxed">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-accent">What happens next</span>
            {feedback.outcome}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
            <Link href={`/learn/${trackKey}/${unitKey}/quiz`} className="font-display text-sm font-bold text-accent">
              Quick check quiz &rarr;
            </Link>
            <button
              onClick={finishUnit}
              className="btn-chunky rounded-2xl border-b-4 border-accent-dark bg-accent px-6 py-3 font-display font-bold text-white"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FeedbackBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-border py-3.5">
      <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground-dim">{title}</h4>
      <p className="text-[14.5px] leading-relaxed">{text}</p>
    </div>
  );
}
