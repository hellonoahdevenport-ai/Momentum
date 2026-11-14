import type { CaseFile, InterviewTopic } from "./cases/types";

export interface ChatTurn {
  role: "patient" | "you";
  text: string;
}

const FALLBACK_REPLIES = [
  "I'm not sure about that one — can you ask me something else about how I've been feeling?",
  "Hmm, I don't think that's really come up for me, no.",
  "I don't really know how to answer that, sorry.",
];

const ALREADY_COVERED_REPLIES = [
  "I think I already told you that one — is there something else you wanted to ask?",
  "Yeah, same as before on that — anything else on your mind?",
  "I mentioned that already — what else would be helpful to know?",
];

function openingTopic(caseFile: CaseFile): InterviewTopic {
  return caseFile.interviewTopics.find((t) => t.openingLine) ?? caseFile.interviewTopics[0];
}

/** Deterministic, scripted patient dialogue: matches the trainee's question
 * against each topic's trigger keywords and returns the fixed fact text.
 * This is the fallback engine — it needs no AI provider to run end to end,
 * but it can only recognize keywords it was authored with, and on a repeat
 * question it redirects rather than repeating the same paragraph verbatim. */
export function scriptedReply(caseFile: CaseFile, question: string, alreadyAsked: Set<string>): { topicId: string | null; text: string } {
  const normalized = question.toLowerCase();
  let best: { topic: InterviewTopic; hits: number } | null = null;
  for (const topic of caseFile.interviewTopics) {
    if (topic.openingLine) continue;
    const hits = topic.triggerKeywords.filter((k) => normalized.includes(k.toLowerCase())).length;
    if (hits > 0 && (!best || hits > best.hits)) {
      best = { topic, hits };
    }
  }
  if (!best) {
    const idx = Math.abs(hashString(question)) % FALLBACK_REPLIES.length;
    return { topicId: null, text: FALLBACK_REPLIES[idx] };
  }
  if (alreadyAsked.has(best.topic.id)) {
    const idx = Math.abs(hashString(question)) % ALREADY_COVERED_REPLIES.length;
    return { topicId: best.topic.id, text: ALREADY_COVERED_REPLIES[idx] };
  }
  return { topicId: best.topic.id, text: best.topic.factText };
}

export function openingLine(caseFile: CaseFile): string {
  return openingTopic(caseFile).factText;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

/** Optional AI-assisted rephrasing of a fixed scripted fact (used only as a
 * light touch-up on the opening line). The model may only rephrase the
 * exact fact text supplied — never introduce new case facts — and any
 * failure or missing API key falls back to the scripted text untouched. */
export async function rephraseWithAI(factText: string, patientName: string): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) return factText;
  try {
    const { askForText } = await import("./anthropic");
    const reply = await askForText({
      system:
        `You are rephrasing one fixed fact so it sounds like a real patient named ${patientName} speaking casually, in first person, 1-3 sentences. ` +
        `Do not add any detail, number, or fact that is not already present below. Do not soften or change the meaning. Reply with only the rephrased line.`,
      turns: [{ role: "user", content: factText }],
      maxTokens: 150,
    });
    return reply.trim() || factText;
  } catch {
    return factText;
  }
}

function factSheet(caseFile: CaseFile): string {
  const lines = caseFile.interviewTopics.map((t) => `- [${t.category}] ${t.factText}`);
  return (
    `Snapshot: ${caseFile.snapshotFacts.map((f) => `${f.label} ${f.value}`).join(", ")}\n` +
    `Presenting: ${caseFile.presentingIssue}\n` +
    `Known facts the patient may reveal (never invent facts beyond this list):\n` +
    lines.join("\n")
  );
}

/**
 * Full AI-driven patient roleplay, used only when ANTHROPIC_API_KEY is set.
 * The model sees the entire authored fact sheet and the real conversation
 * history, so it answers naturally and without repeating itself verbatim —
 * but it is explicitly instructed to stay inside the authored facts and to
 * say it doesn't know rather than invent a new clinical detail. Any error
 * (bad key, rate limit, network) falls back to the scripted engine so the
 * case never breaks.
 */
export async function aiPatientReply(
  caseFile: CaseFile,
  history: ChatTurn[],
  question: string,
): Promise<{ text: string; usedAI: boolean }> {
  if (!process.env.ANTHROPIC_API_KEY) return { text: "", usedAI: false };
  try {
    const { askForText } = await import("./anthropic");
    const system =
      `You are role-playing as ${caseFile.patient.name}, a fictional patient in a clinical-education simulation. Stay fully in character.\n\n` +
      `${factSheet(caseFile)}\n\n` +
      `RULES:\n` +
      `- Answer only using the facts above. Never invent a new symptom, number, date, or history detail that isn't listed.\n` +
      `- If asked about something not covered above, say you're not sure or that it hasn't come up — don't make something up.\n` +
      `- Speak casually, in first person, 1-3 sentences per reply.\n` +
      `- Don't repeat an earlier answer word-for-word — if asked the same thing again, briefly say you already covered it and gesture back to what you said, or add the one extra detail from the fact sheet that's still relevant (if any).\n` +
      `- Never use clinical jargon, never state a diagnosis, never acknowledge this is a simulation or that you are an AI.`;

    const turns = history
      .slice(-12)
      .map((t) => ({ role: t.role === "you" ? ("user" as const) : ("assistant" as const), content: t.text }));
    turns.push({ role: "user", content: question });

    const reply = await askForText({ system, turns, maxTokens: 220 });
    return { text: reply.trim(), usedAI: true };
  } catch {
    return { text: "", usedAI: false };
  }
}
