import { NextResponse } from "next/server";
import { askForText, MODEL_QUICK } from "@/lib/anthropic";
import { interviewSystemPrompt, openingLinePrompt } from "@/lib/prompts";
import { TRACKS, isTrackKey } from "@/lib/tracks";
import type { CaseData, ChatTurn } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const trackKey = body?.track;
  const caseData: CaseData | undefined = body?.caseData;
  const turns: ChatTurn[] = Array.isArray(body?.turns) ? body.turns : [];

  if (!trackKey || !isTrackKey(trackKey) || !caseData) {
    return NextResponse.json({ error: "Missing track or case data." }, { status: 400 });
  }
  const track = TRACKS[trackKey];

  try {
    const system = interviewSystemPrompt(track, caseData);
    const sendTurns = turns.length === 0 ? [openingLinePrompt()] : turns;
    const reply = await askForText({
      system,
      turns: sendTurns,
      model: MODEL_QUICK,
      maxTokens: 300,
    });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat turn failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
