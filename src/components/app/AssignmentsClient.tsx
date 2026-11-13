"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";

interface Assignment {
  id: string;
  caseId: string;
  dueDate: string;
}

const STORAGE_KEY = "casebook_demo_assignments";

export default function AssignmentsClient({ cases }: { cases: { id: string; title: string }[] }) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [caseId, setCaseId] = useState(cases[0]?.id ?? "");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setAssignments(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function save(next: Assignment[]) {
    setAssignments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function addAssignment() {
    if (!caseId || !dueDate) return;
    save([...assignments, { id: `${caseId}-${Date.now()}`, caseId, dueDate }]);
    setDueDate("");
  }

  function removeAssignment(id: string) {
    save(assignments.filter((a) => a.id !== id));
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Assignments</h2>
      <Badge tone="warn" className="mt-2">
        This device only — scoped MVP
      </Badge>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Assignments created here are stored only in this browser, as a working preview of the flow. Assigning to a
        real cohort needs accounts and a database that don’t exist yet.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-5">
        <div>
          <label htmlFor="assign-case" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
            Case
          </label>
          <select
            id="assign-case"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="focus-ring mt-1.5 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assign-due" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
            Due date
          </label>
          <input
            id="assign-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="focus-ring mt-1.5 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
          />
        </div>
        <button onClick={addAssignment} className="btn-press focus-ring rounded-xl bg-accent px-4 py-2.5 font-display text-sm font-bold text-white">
          Add assignment
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {assignments.length === 0 && <p className="text-sm text-foreground-dim">No assignments yet.</p>}
        {assignments.map((a) => (
          <div key={a.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-foreground">{cases.find((c) => c.id === a.caseId)?.title ?? a.caseId}</div>
              <div className="text-xs text-foreground-dim">Due {a.dueDate}</div>
            </div>
            <button onClick={() => removeAssignment(a.id)} className="focus-ring text-xs font-bold text-bad">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
