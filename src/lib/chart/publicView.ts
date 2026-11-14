import type { ChartScenario, ChartScenarioPublic } from "./types";

export function toChartPublicView(scenario: ChartScenario): ChartScenarioPublic {
  return {
    id: scenario.id,
    title: scenario.title,
    format: scenario.format,
    snapshot: scenario.snapshot,
    fields: scenario.fields.map((f) => ({ id: f.id, label: f.label, placeholder: f.placeholder })),
  };
}
