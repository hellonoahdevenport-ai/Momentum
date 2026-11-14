"use client";

import { useEffect, useState } from "react";
import {
  getReviewWorkflow,
  setReviewWorkflow,
  REVIEW_WORKFLOW_STATES,
  type ReviewWorkflowState,
} from "@/lib/reviewWorkflowDemo";

export default function ReviewWorkflowControls({ caseId }: { caseId: string }) {
  const [state, setState] = useState<ReviewWorkflowState>("not_started");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const entry = getReviewWorkflow(caseId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(entry.state);
    setAssignedTo(entry.assignedTo);
    setNotes(entry.notes);
    setLoaded(true);
  }, [caseId]);

  if (!loaded) return null;

  return (
    <div className="mt-4 rounded-xl border border-dashed border-border bg-surface-2 p-3.5">
      <span className="text-[10.5px] font-bold uppercase tracking-wide text-foreground-dim">
        Local demo workflow — stored only in this browser, not connected to a real review system yet
      </span>
      <div className="mt-2.5 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={`${caseId}-state`} className="block text-[11px] font-semibold text-foreground-dim">
            Status
          </label>
          <select
            id={`${caseId}-state`}
            value={state}
            onChange={(e) => {
              const next = e.target.value as ReviewWorkflowState;
              setState(next);
              setReviewWorkflow(caseId, { state: next });
            }}
            className="focus-ring mt-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground"
          >
            {REVIEW_WORKFLOW_STATES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${caseId}-assigned`} className="block text-[11px] font-semibold text-foreground-dim">
            Assigned to
          </label>
          <input
            id={`${caseId}-assigned`}
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            onBlur={() => setReviewWorkflow(caseId, { assignedTo })}
            placeholder="Reviewer name"
            className="focus-ring mt-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground placeholder:text-foreground-dim"
          />
        </div>
      </div>
      <div className="mt-2.5">
        <label htmlFor={`${caseId}-notes`} className="block text-[11px] font-semibold text-foreground-dim">
          Review notes
        </label>
        <textarea
          id={`${caseId}-notes`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => setReviewWorkflow(caseId, { notes })}
          placeholder="Notes for this review pass…"
          className="focus-ring mt-1 min-h-[60px] w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground placeholder:text-foreground-dim"
        />
      </div>
    </div>
  );
}
