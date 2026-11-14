"use server";

import { getChartScenario } from "./scenarios";
import type { ChartFeedback } from "./types";

function fieldStatus(text: string, rubricKeywords: string[]): "covered" | "partial" | "not_yet" {
  const normalized = text.toLowerCase();
  const hits = rubricKeywords.filter((k) => normalized.includes(k.toLowerCase())).length;
  const target = Math.min(3, rubricKeywords.length);
  if (text.trim().length === 0 || hits === 0) return "not_yet";
  if (hits >= target) return "covered";
  return "partial";
}

export async function gradeChartNote(scenarioId: string, fieldAnswers: Record<string, string>): Promise<ChartFeedback> {
  const scenario = getChartScenario(scenarioId);
  if (!scenario) throw new Error("Unknown scenario.");

  const perField = scenario.fields.map((f) => ({
    id: f.id,
    label: f.label,
    status: fieldStatus(fieldAnswers[f.id] ?? "", f.rubricKeywords),
    guidance: f.guidance,
  }));

  return {
    perField,
    coveredCount: perField.filter((f) => f.status === "covered").length,
    totalFields: perField.length,
  };
}
