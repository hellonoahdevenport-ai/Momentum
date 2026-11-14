"use server";

import { getCaseFile } from "./registry";
import { gradeInterpretation, gradeReasoningAndPlan } from "./scoring";
import { scriptedReply, openingLine, rephraseWithAI, aiPatientReply, type ChatTurn } from "@/lib/patientEngine";
import type { EvidenceResult, InterpretationGradeResult, ReasoningPlanSubmission, DebriefResult } from "./types";

export async function startInterview(caseId: string): Promise<{ text: string }> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  const text = await rephraseWithAI(openingLine(caseFile), caseFile.patient.name);
  return { text };
}

export async function askPatient(
  caseId: string,
  question: string,
  askedTopicIds: string[],
  history: ChatTurn[] = [],
): Promise<{ text: string; topicId: string | null; usedAI: boolean }> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  const trimmed = question.trim().slice(0, 300);
  if (!trimmed) return { text: "", topicId: null, usedAI: false };

  const ai = await aiPatientReply(caseFile, history, trimmed);
  if (ai.usedAI && ai.text) {
    return { text: ai.text, topicId: null, usedAI: true };
  }

  const { topicId, text } = scriptedReply(caseFile, trimmed, new Set(askedTopicIds));
  const finalText = await rephraseWithAI(text, caseFile.patient.name);
  return { text: finalText, topicId, usedAI: false };
}

export async function orderEvidence(caseId: string, itemIds: string[]): Promise<EvidenceResult[]> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  const idSet = new Set(itemIds);
  return caseFile.evidenceCatalog
    .filter((e) => idSet.has(e.id))
    .map((e) => ({
      id: e.id,
      resultText: e.resultText,
      referenceRange: e.referenceRange,
      resultFlag: e.resultFlag,
      significant: e.significant,
      teachingNote: e.teachingNote,
    }));
}

export async function gradeInterpretationAction(
  caseId: string,
  answers: Record<string, number | number[] | string[]>,
): Promise<InterpretationGradeResult> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  return gradeInterpretation(caseFile, answers);
}

export async function getQuizQuestions(caseId: string): Promise<{ id: string; prompt: string; options: string[] }[]> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  return caseFile.quizQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options }));
}

export async function checkQuizAnswer(
  caseId: string,
  questionId: string,
  pickedIndex: number,
): Promise<{ correct: boolean; correctIndex: number; rationale: string }> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  const q = caseFile.quizQuestions.find((item) => item.id === questionId);
  if (!q) throw new Error("Unknown question.");
  return { correct: pickedIndex === q.correctIndex, correctIndex: q.correctIndex, rationale: q.rationale };
}

export async function gradeReasoningAndPlanAction(
  caseId: string,
  submission: ReasoningPlanSubmission,
): Promise<DebriefResult> {
  const caseFile = getCaseFile(caseId);
  if (!caseFile) throw new Error("Unknown case.");
  return gradeReasoningAndPlan(caseFile, submission);
}
