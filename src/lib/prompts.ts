import type { Track } from "./tracks";
import type { Unit } from "./units";
import type { CaseData, ChatTurn } from "./types";

const DIFFICULTIES = [
  "a straightforward, typical presentation",
  "a moderately atypical presentation",
  "a tricky presentation with a subtle twist or distractor",
];

export function buildScenarioPrompt(track: Track, unit: Unit): string {
  const difficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
  return (
    `Generate one fictional ${track.scenarioNoun} for a ${track.label} training simulator used by students and trainees. ` +
    `The ${track.subjectRole} is working with a trainee ${track.professional}. Base it on ${unit.hint}, written with ${difficulty}. ` +
    `Make it internally consistent and plausible. Avoid the most cliched textbook example for this unit.\n\n` +
    `Reply with ONLY a JSON object, no markdown fence, no commentary, matching exactly this shape:\n{\n` +
    `  "subjectName": string (fictional),\n` +
    `  "subjectSummary": string (short - age/role/background as relevant, one line),\n` +
    `  "presentingIssue": string (short, the core issue the ${track.subjectRole} brings),\n` +
    `  "snapshotFacts": array of 4 to 5 {"label": string, "value": string} pairs - ${track.snapshotHint},\n` +
    `  "backgroundFacts": string[] (6 to 10 short natural-language facts the ${track.subjectRole} could reveal if asked something relevant; do not phrase them as a checklist that gives away the answer),\n` +
    `  "initialAssessment": string (2 to 4 sentences - what an initial focused review/exam/intake turns up before any interview),\n` +
    `  "conclusion": string (the single correct ${track.conclusionLabel.toLowerCase()}, concise - a few words, not a sentence),\n` +
    `  "conclusionOptions": string[] (exactly 4 strings: the correct conclusion above, worded identically, plus 3 plausible but incorrect alternatives a trainee might mistakenly pick for this presentation, each equally short),\n` +
    `  "conclusionExplanation": string (2 to 4 sentences of reasoning linking the facts to this conclusion),\n` +
    `  "keyConsiderations": string[] (2 to 4 short critical points a careful trainee should catch),\n` +
    `  "evidenceItems": array of 8 to 12 objects {"id": kebab-case-id, "name": string, "category": one of ${JSON.stringify(track.evidenceCategories)}, "result": string (realistic finding), "significant": boolean} - include items that support the conclusion plus a few unremarkable items a trainee might reasonably check,\n` +
    `  "recommendedAction": string (2 to 3 sentences, the appropriate ${track.actionLabel.toLowerCase()}),\n` +
    `  "goodOutcome": string (1 to 2 sentences, result of a timely correct response),\n` +
    `  "badOutcome": string (1 to 2 sentences, result if missed or mismanaged)\n}`
  );
}

export function interviewSystemPrompt(track: Track, c: CaseData): string {
  return (
    `You are role-playing as the ${track.subjectRole} in a ${track.label} training simulation for students. Stay fully in character at all times.\n\n` +
    `${track.subjectRoleCap.toUpperCase()}: ${c.subjectName} - ${c.subjectSummary}.\n` +
    `PRESENTING ISSUE: ${c.presentingIssue}.\n` +
    `BACKGROUND YOU MAY REVEAL (only when asked something relevant; never volunteer more than one or two unprompted, never list them, speak naturally):\n` +
    c.backgroundFacts.map((f) => `- ${f}`).join("\n") +
    `\n\nTONE: ${track.interviewToneHint}.\n` +
    `RULES:\n` +
    `- Speak only in first person, 1 to 4 sentences at a time.\n` +
    `- Never use jargon, never state the underlying ${track.conclusionLabel.toLowerCase()} or analysis yourself.\n` +
    `- Reveal a background fact only when a question actually touches on it.\n` +
    `- If asked something with no bearing on the case, respond briefly and naturally, without breaking character.\n` +
    `- Never acknowledge that you are an AI or that this is a simulation.`
  );
}

export function openingLinePrompt(): ChatTurn {
  return {
    role: "user",
    content:
      "Begin now with your opening line to the trainee who just started working with you - describe your situation in your own words, briefly.",
  };
}

export function buildGradingPrompt(
  track: Track,
  c: CaseData,
  transcript: ChatTurn[],
  orderedEvidenceNames: string[],
  actionText: string,
): string {
  const transcriptText =
    transcript.length === 0
      ? "(No interview conducted.)"
      : transcript
          .map((t) => (t.role === "user" ? "Trainee: " : `${c.subjectName}: `) + t.content)
          .join("\n");
  const evidenceText =
    orderedEvidenceNames.length === 0
      ? "(No evidence was gathered.)"
      : orderedEvidenceNames.map((n) => `- ${n}`).join("\n");

  return (
    `You are grading a trainee's performance in a ${track.label} training simulation, focused on ${track.gradingFocus}. ` +
    `The trainee already correctly or incorrectly identified the underlying ${track.conclusionLabel.toLowerCase()} separately (not your job to re-judge that) - grade only the action plan and evidence-gathering below.\n\n` +
    `GROUND TRUTH (the trainee did not see this section):\n` +
    `Correct ${track.conclusionLabel.toLowerCase()}: ${c.conclusion}\n` +
    `Why: ${c.conclusionExplanation}\n` +
    `Key considerations to catch: ${c.keyConsiderations.join("; ")}\n` +
    `Recommended ${track.actionLabel.toLowerCase()}: ${c.recommendedAction}\n\n` +
    `TRAINEE'S INTERVIEW TRANSCRIPT WITH THE ${track.subjectRoleCap.toUpperCase()}:\n${transcriptText}\n\n` +
    `EVIDENCE THE TRAINEE GATHERED:\n${evidenceText}\n\n` +
    `TRAINEE'S SUBMITTED ${track.actionLabel.toUpperCase()}: "${actionText}"\n\n` +
    `Grade this fairly and specifically, referencing what the trainee actually did. Reply with ONLY a JSON object of this shape, no markdown fence, no extra text:\n{\n` +
    `  "actionScore": number from 0 to 100 (quality of the ${track.actionLabel.toLowerCase()} alone),\n` +
    `  "actionFeedback": string (2 to 3 sentences, second person, evaluating the submitted action plan),\n` +
    `  "evidenceFeedback": string (1 to 2 sentences on whether the right evidence was gathered),\n` +
    `  "missedConsiderations": string[] (key considerations the trainee's questions or evidence never surfaced; empty array if none),\n` +
    `  "outcome": string (1 to 3 sentences - what happens next given this performance, blended from the good or bad outcome depending on how well they did)\n}`
  );
}

export function buildQuizPrompt(track: Track, unit: Unit): string {
  return (
    `Write a 5-question multiple-choice quiz for a ${track.label} student studying ${unit.label} (${unit.hint}). ` +
    `Board-exam style: a short vignette or direct question, 4 answer options, one clearly correct. Vary the question types (recall, a short clinical vignette, a "which is most appropriate" question). ` +
    `Reply with ONLY a JSON array, no markdown fence, no commentary, of exactly 5 objects matching this shape:\n` +
    `[{"question": string, "options": string[4], "correctIndex": number (0-3), "explanation": string (1-2 sentences on why the correct answer is right and the main distractor is wrong)}]`
  );
}
