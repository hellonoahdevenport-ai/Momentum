"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gradeErScenario } from "@/lib/er/actions";
import type { ErScenarioPublic, ErOutcome } from "@/lib/er/types";
import Badge from "@/components/ui/Badge";

export default function ErScenarioClient({ scenario }: { scenario: ErScenarioPublic }) {
  const [phase, setPhase] = useState<"brief" | "running" | "grading" | "debrief">("brief");
  const [remaining, setRemaining] = useState(scenario.timeLimitSeconds);
  const [chosen, setChosen] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<ErOutcome | null>(null);
  const startedAt = useRef<number | null>(null);
  const finalizing = useRef(false);
  const chosenRef = useRef<string[]>([]);

  async function finalize() {
    if (finalizing.current) return;
    finalizing.current = true;
    setPhase("grading");
    const elapsed = startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : scenario.timeLimitSeconds;
    const result = await gradeErScenario(scenario.id, chosenRef.current, elapsed);
    setOutcome(result);
    setPhase("debrief");
  }

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          finalize();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function start() {
    startedAt.current = Date.now();
    setRemaining(scenario.timeLimitSeconds);
    setPhase("running");
  }

  function toggleOrder(id: string) {
    if (phase !== "running") return;
    const next = chosenRef.current.includes(id) ? chosenRef.current.filter((x) => x !== id) : [...chosenRef.current, id];
    chosenRef.current = next;
    setChosen(next);
  }

  function retry() {
    finalizing.current = false;
    chosenRef.current = [];
    setChosen([]);
    setOutcome(null);
    setPhase("brief");
  }

  const pct = Math.max(0, Math.round((remaining / scenario.timeLimitSeconds) * 100));

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 sm:px-8">
      <div className="sticky top-16 z-10 -mx-5 border-b border-border bg-background px-5 pb-3 pt-4 sm:-mx-8 sm:px-8 lg:top-0">
        <div className="flex items-center justify-between">
          <Link href="/app/er" className="focus-ring font-display text-sm font-bold text-accent">
            &larr; Exit
          </Link>
          {phase === "running" && (
            <span className={`font-data text-lg font-bold ${remaining <= 15 ? "text-bad" : "text-foreground"}`}>{remaining}s</span>
          )}
        </div>
        <h1 className="mt-2.5 text-[21px] font-bold text-foreground">{scenario.title}</h1>
        <div className="font-data mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-xs">
          {scenario.snapshotFacts.map((f) => (
            <span key={f.label}>
              <span className="text-foreground-dim">{f.label} </span>
              {f.value}
            </span>
          ))}
        </div>
        {phase === "running" && (
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-surface-2">
            <div className={`h-1.5 rounded-full transition-all ${remaining <= 15 ? "bg-bad" : "bg-accent"}`} style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      {phase === "brief" && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-foreground-dim">{scenario.patientSummary}</p>
          <div className="mt-4 rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn">
            You have {scenario.timeLimitSeconds} seconds once you start. Fictional scenario, for order-entry practice
            under time pressure — not a substitute for local protocol or professional judgment.
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={start} className="btn-press focus-ring rounded-xl bg-coral px-6 py-3 font-display font-bold text-white">
              Start the clock &rarr;
            </button>
          </div>
        </div>
      )}

      {phase === "running" && (
        <div className="mt-6 flex flex-col gap-6">
          {scenario.orderCategories.map((cat) => {
            const items = scenario.orderCatalog.filter((o) => o.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <h4 className="font-display mb-1.5 text-[15px] font-bold text-foreground">{cat}</h4>
                <div className="flex flex-col gap-1.5">
                  {items.map((o) => {
                    const active = chosen.includes(o.id);
                    return (
                      <button
                        key={o.id}
                        onClick={() => toggleOrder(o.id)}
                        className={`focus-ring flex items-center justify-between rounded-xl border-2 px-3.5 py-2.5 text-left text-sm font-semibold ${
                          active ? "border-accent bg-accent-soft text-accent" : "border-border text-foreground"
                        }`}
                      >
                        {o.label}
                        {active && <span>&#10003;</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="flex justify-end">
            <button onClick={finalize} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
              Finalize orders &rarr;
            </button>
          </div>
        </div>
      )}

      {phase === "grading" && <p className="mt-8 text-center text-sm text-foreground-dim">Grading&hellip;</p>}

      {phase === "debrief" && outcome && (
        <div className="mt-6">
          <div className={`rounded-2xl p-5 ${outcome.stabilized ? "bg-good-soft" : "bg-bad-soft"}`}>
            <Badge tone={outcome.stabilized ? "good" : "bad"}>{outcome.stabilized ? "Patient stabilized" : "Patient declined"}</Badge>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{outcome.outcomeText}</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className="font-display text-xl font-bold text-foreground">
                {outcome.criticalHit}/{outcome.criticalTotal}
              </div>
              <div className="text-[11px] text-foreground-dim">Critical orders</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className={`font-display text-xl font-bold ${outcome.harmfulHit > 0 ? "text-bad" : "text-foreground"}`}>{outcome.harmfulHit}</div>
              <div className="text-[11px] text-foreground-dim">Harmful orders</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className={`font-display text-xl font-bold ${outcome.withinTime ? "text-foreground" : "text-bad"}`}>{outcome.timeUsedSeconds}s</div>
              <div className="text-[11px] text-foreground-dim">Time used</div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wide text-foreground-dim">What to take away</h4>
            <ul className="mt-2 flex flex-col gap-1.5">
              {outcome.keyConsiderations.map((k) => (
                <li key={k} className="flex gap-2 text-sm text-foreground-dim">
                  <span className="text-accent">&bull;</span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Every order, reviewed</h4>
            <div className="mt-2 flex flex-col gap-2">
              {outcome.perOrder.map((o) => (
                <div
                  key={o.id}
                  className={`rounded-xl border px-3.5 py-2.5 text-sm ${
                    o.harmful && o.chosen
                      ? "border-bad bg-bad-soft"
                      : o.critical && !o.chosen
                        ? "border-warn bg-warn-soft"
                        : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 font-semibold text-foreground">
                    <span>{o.label}</span>
                    <span className="text-xs text-foreground-dim">
                      {o.chosen ? "Given" : "Not given"}
                      {o.critical ? " · critical" : ""}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-dim">{o.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Link href="/app/er" className="focus-ring font-display text-sm font-bold text-accent">
              Back to scenarios &rarr;
            </Link>
            <button onClick={retry} className="btn-press focus-ring rounded-xl bg-accent px-6 py-3 font-display font-bold text-white">
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
