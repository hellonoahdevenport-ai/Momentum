"use client";

import { useState } from "react";

const CATEGORIES = ["Factual accuracy", "Outdated reference", "Scoring / rubric issue", "Accessibility", "Other"];

export default function ContentConcernForm({ cases }: { cases: { id: string; title: string; version: string }[] }) {
  const [caseId, setCaseId] = useState(cases[0]?.id ?? "");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      const raw = localStorage.getItem("casebook_content_concerns");
      const list = raw ? JSON.parse(raw) : [];
      list.push({ caseId, category, description, submittedAt: Date.now() });
      localStorage.setItem("casebook_content_concerns", JSON.stringify(list));
    } catch {
      // ignore
    }
    setSubmitted(true);
    setDescription("");
  }

  if (submitted) {
    return (
      <div className="mt-4 rounded-xl bg-good-soft px-4 py-3 text-sm text-good">
        Thanks — this concern was recorded (locally, in this demo).{" "}
        <button onClick={() => setSubmitted(false)} className="focus-ring font-bold underline">
          Report another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <div>
        <label htmlFor="concern-case" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
          Case
        </label>
        <select
          id="concern-case"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
        >
          {cases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} (v{c.version})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="concern-category" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
          Issue category
        </label>
        <select
          id="concern-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="concern-desc" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
          What’s the issue? (no patient identifiers)
        </label>
        <textarea
          id="concern-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="focus-ring mt-1.5 min-h-[90px] w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
        />
      </div>
      <button type="submit" className="btn-press focus-ring self-start rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white">
        Submit concern
      </button>
    </form>
  );
}
