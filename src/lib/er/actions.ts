"use server";

import { getErScenario } from "./scenarios";
import type { ErOutcome } from "./types";

export async function gradeErScenario(
  scenarioId: string,
  chosenOrderIds: string[],
  timeUsedSeconds: number,
): Promise<ErOutcome> {
  const scenario = getErScenario(scenarioId);
  if (!scenario) throw new Error("Unknown scenario.");

  const chosen = new Set(chosenOrderIds);
  const criticalOrders = scenario.orderCatalog.filter((o) => o.critical);
  const criticalHit = criticalOrders.filter((o) => chosen.has(o.id)).length;
  const correctExtraHit = scenario.orderCatalog.filter((o) => o.correct && !o.critical && chosen.has(o.id)).length;
  const harmfulHit = scenario.orderCatalog.filter((o) => o.harmful && chosen.has(o.id)).length;
  const withinTime = timeUsedSeconds <= scenario.timeLimitSeconds;
  const stabilized = criticalHit === criticalOrders.length && harmfulHit === 0 && withinTime;

  return {
    criticalHit,
    criticalTotal: criticalOrders.length,
    correctExtraHit,
    harmfulHit,
    timeUsedSeconds,
    withinTime,
    stabilized,
    outcomeText: stabilized ? scenario.successOutcome : scenario.failureOutcome,
    keyConsiderations: scenario.keyConsiderations,
    perOrder: scenario.orderCatalog.map((o) => ({
      id: o.id,
      label: o.label,
      chosen: chosen.has(o.id),
      correct: o.correct,
      critical: o.critical,
      harmful: o.harmful,
      rationale: o.rationale,
    })),
  };
}
