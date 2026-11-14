"use client";

// Local-only demo workflow layered on top of each case's real governance
// metadata (meta.reviewStatus, in src/lib/cases/*.ts). This file never
// touches that real metadata — it just tracks an educator's own working
// notes for a review pass, stored in this browser only.
const STORAGE_KEY = "casebook_demo_review_workflow";

export type ReviewWorkflowState = "not_started" | "assigned" | "in_review" | "reviewed_notes";

export interface ReviewWorkflowEntry {
  state: ReviewWorkflowState;
  assignedTo: string;
  notes: string;
  updatedAt: number;
}

export const REVIEW_WORKFLOW_STATES: { key: ReviewWorkflowState; label: string }[] = [
  { key: "not_started", label: "Not started" },
  { key: "assigned", label: "Assigned for review" },
  { key: "in_review", label: "In review" },
  { key: "reviewed_notes", label: "Reviewed — notes attached" },
];

const EMPTY_ENTRY: ReviewWorkflowEntry = { state: "not_started", assignedTo: "", notes: "", updatedAt: 0 };

type Store = Record<string, ReviewWorkflowEntry>;

function load(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function save(store: Store): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function getReviewWorkflow(caseId: string): ReviewWorkflowEntry {
  const store = load();
  return store[caseId] ?? { ...EMPTY_ENTRY };
}

export function setReviewWorkflow(caseId: string, partial: Partial<Omit<ReviewWorkflowEntry, "updatedAt">>): ReviewWorkflowEntry {
  const store = load();
  const current = store[caseId] ?? { ...EMPTY_ENTRY };
  const next: ReviewWorkflowEntry = { ...current, ...partial, updatedAt: Date.now() };
  store[caseId] = next;
  save(store);
  return next;
}
