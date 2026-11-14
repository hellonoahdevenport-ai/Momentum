"use server";

import { getEcgRhythm } from "./rhythms";

export async function checkRhythmAnswer(
  rhythmId: string,
  pickedIndex: number,
): Promise<{ correct: boolean; correctIndex: number; rationale: string; teachingNote: string }> {
  const rhythm = getEcgRhythm(rhythmId);
  if (!rhythm) throw new Error("Unknown rhythm.");
  return {
    correct: pickedIndex === rhythm.correctRhythmIndex,
    correctIndex: rhythm.correctRhythmIndex,
    rationale: rhythm.rhythmRationale,
    teachingNote: rhythm.teachingNote,
  };
}

export async function getNextStepQuestion(rhythmId: string): Promise<{ id: string; prompt: string; options: string[] }> {
  const rhythm = getEcgRhythm(rhythmId);
  if (!rhythm) throw new Error("Unknown rhythm.");
  const q = rhythm.nextStepQuestion;
  return { id: q.id, prompt: q.prompt, options: q.options };
}

export async function checkNextStepAnswer(
  rhythmId: string,
  pickedIndex: number,
): Promise<{ correct: boolean; correctIndex: number; rationale: string }> {
  const rhythm = getEcgRhythm(rhythmId);
  if (!rhythm) throw new Error("Unknown rhythm.");
  const q = rhythm.nextStepQuestion;
  return { correct: pickedIndex === q.correctIndex, correctIndex: q.correctIndex, rationale: q.rationale };
}
