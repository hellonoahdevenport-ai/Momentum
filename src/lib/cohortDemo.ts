"use client";

// Local-only cohort/classroom demo. Cohorts and their case assignments are
// real local state the educator creates (stored in this browser). The
// per-learner progress rows are illustrative sample data, generated with a
// deterministic (non-random) hash so the same cohort+case+learner always
// shows the same numbers instead of reshuffling on every render — this is
// NOT real student data.
const STORAGE_KEY = "casebook_demo_cohorts";

export interface Cohort {
  id: string;
  name: string;
  caseIds: string[];
  createdAt: number;
}

function load(): Cohort[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Cohort[]) : [];
  } catch {
    return [];
  }
}

function save(cohorts: Cohort[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cohorts));
  } catch {
    // ignore
  }
}

export function loadCohorts(): Cohort[] {
  return load();
}

export function createCohort(name: string): Cohort[] {
  const cohorts = load();
  const next: Cohort = { id: `cohort-${Date.now()}`, name, caseIds: [], createdAt: Date.now() };
  const updated = [...cohorts, next];
  save(updated);
  return updated;
}

export function deleteCohort(cohortId: string): Cohort[] {
  const updated = load().filter((c) => c.id !== cohortId);
  save(updated);
  return updated;
}

export function toggleCohortCase(cohortId: string, caseId: string): Cohort[] {
  const cohorts = load();
  const updated = cohorts.map((c) => {
    if (c.id !== cohortId) return c;
    const has = c.caseIds.includes(caseId);
    return { ...c, caseIds: has ? c.caseIds.filter((id) => id !== caseId) : [...c.caseIds, caseId] };
  });
  save(updated);
  return updated;
}

function seededNumber(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export const DEMO_LEARNERS = ["Sample learner A", "Sample learner B", "Sample learner C", "Sample learner D"];

export interface DemoLearnerCaseResult {
  learner: string;
  caseId: string;
  completed: boolean;
  score: number | null;
}

/** Illustrative sample data only — never real learner records. */
export function demoLearnerResults(cohortId: string, caseIds: string[]): DemoLearnerCaseResult[] {
  const results: DemoLearnerCaseResult[] = [];
  for (const learner of DEMO_LEARNERS) {
    for (const caseId of caseIds) {
      const seed = `${cohortId}:${learner}:${caseId}`;
      const score = 55 + (seededNumber(seed) % 41); // 55-95
      const completed = seededNumber(`${seed}:completed`) % 5 !== 0; // ~4 in 5 "done"
      results.push({ learner, caseId, completed, score: completed ? score : null });
    }
  }
  return results;
}
