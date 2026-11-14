"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import {
  loadCohorts,
  createCohort,
  deleteCohort,
  toggleCohortCase,
  demoLearnerResults,
  DEMO_LEARNERS,
  type Cohort,
} from "@/lib/cohortDemo";

export default function CohortClient({ cases }: { cases: { id: string; title: string }[] }) {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCohorts(loadCohorts());
    setLoaded(true);
  }, []);

  function addCohort() {
    if (!name.trim()) return;
    setCohorts(createCohort(name.trim()));
    setName("");
  }

  function removeCohort(id: string) {
    setCohorts(deleteCohort(id));
  }

  function toggleCase(cohortId: string, caseId: string) {
    setCohorts(toggleCohortCase(cohortId, caseId));
  }

  if (!loaded) return null;

  return (
    <div className="mt-10">
      <h2 className="font-display text-xl font-bold text-foreground">Cohorts</h2>
      <Badge tone="warn" className="mt-2">
        This device only — scoped MVP
      </Badge>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-dim">
        Cohorts and their assigned cases below are real local state, stored only in this browser. The learner
        progress rows inside each cohort are illustrative sample data ({DEMO_LEARNERS.length} fictional learners,
        not real students) — a real cohort roster needs accounts and a database that don’t exist yet.
      </p>

      <div className="mt-5 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-5">
        <div>
          <label htmlFor="cohort-name" className="block text-xs font-bold uppercase tracking-wide text-foreground-dim">
            Cohort name
          </label>
          <input
            id="cohort-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Fall cohort — Med 2"
            className="focus-ring mt-1.5 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-foreground-dim"
          />
        </div>
        <button
          onClick={addCohort}
          className="btn-press focus-ring rounded-xl bg-accent px-4 py-2.5 font-display text-sm font-bold text-white"
        >
          Create cohort
        </button>
      </div>

      {cohorts.length === 0 ? (
        <p className="mt-5 text-sm text-foreground-dim">No cohorts yet — create one above.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {cohorts.map((cohort) => {
            const results = demoLearnerResults(cohort.id, cohort.caseIds);
            return (
              <div key={cohort.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-foreground">{cohort.name}</h3>
                  <button onClick={() => removeCohort(cohort.id)} className="focus-ring text-xs font-bold text-bad">
                    Delete cohort
                  </button>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-foreground-dim">Assigned cases</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cases.map((c) => {
                      const active = cohort.caseIds.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleCase(cohort.id, c.id)}
                          className={`focus-ring rounded-full px-3 py-1.5 text-xs font-bold ${
                            active ? "bg-accent text-white" : "border border-border text-foreground-dim"
                          }`}
                        >
                          {c.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {cohort.caseIds.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-foreground-dim">Learner progress</span>
                      <Badge tone="neutral">Sample data</Badge>
                    </div>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full min-w-[480px] border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wide text-foreground-dim">
                            <th className="py-2 pr-4">Learner</th>
                            {cohort.caseIds.map((caseId) => (
                              <th key={caseId} className="py-2 pr-4">
                                {cases.find((c) => c.id === caseId)?.title ?? caseId}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {DEMO_LEARNERS.map((learner) => (
                            <tr key={learner} className="border-b border-border text-foreground">
                              <td className="py-2 pr-4 font-semibold">{learner}</td>
                              {cohort.caseIds.map((caseId) => {
                                const r = results.find((res) => res.learner === learner && res.caseId === caseId);
                                return (
                                  <td key={caseId} className="py-2 pr-4">
                                    {r?.completed ? (
                                      <span className="text-good">{r.score}</span>
                                    ) : (
                                      <span className="text-foreground-dim">Not yet</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
