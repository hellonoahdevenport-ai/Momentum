import type { CaseFile, InterviewTopic } from "./cases/types";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const FALLBACK_REPLIES = [
  "I'm not sure about that one — can you ask me something else about how I've been feeling?",
  "Hmm, I don't think that's really come up for me, no.",
  "I don't really know how to answer that, sorry.",
];

function openingTopic(caseFile: CaseFile): InterviewTopic {
  return caseFile.interviewTopics.find((t) => t.openingLine) ?? caseFile.interviewTopics[0];
}

/** Deterministic, scripted patient dialogue: matches the trainee's question
 * against each topic's trigger keywords and returns the fixed fact text.
 * This is the default engine and needs no AI provider to run end to end. */
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
  const prefix = alreadyAsked.has(best.topic.id) ? "Like I said — " : "";
  return { topicId: best.topic.id, text: prefix + best.topic.factText };
}

export function openingLine(caseFile: CaseFile): string {
  return openingTopic(caseFile).factText;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

/** Optional AI-assisted rephrasing of a fixed scripted fact. The model may
 * only rephrase the exact fact text supplied — never introduce new case
 * facts — and any failure or missing API key falls back to the scripted
 * text untouched. */
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
