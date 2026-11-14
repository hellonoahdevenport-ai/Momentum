import type { ErScenario, ErScenarioPublic } from "./types";

export function toErPublicView(scenario: ErScenario): ErScenarioPublic {
  return {
    id: scenario.id,
    title: scenario.title,
    patientSummary: scenario.patientSummary,
    snapshotFacts: scenario.snapshotFacts,
    timeLimitSeconds: scenario.timeLimitSeconds,
    orderCategories: scenario.orderCategories,
    orderCatalog: scenario.orderCatalog.map((o) => ({ id: o.id, label: o.label, category: o.category })),
  };
}
