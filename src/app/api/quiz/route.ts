import { NextResponse } from "next/server";
import { askForJson } from "@/lib/anthropic";
import { buildQuizPrompt } from "@/lib/prompts";
import { TRACKS, isTrackKey } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import type { QuizQuestion } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const trackKey = body?.track;
  const unitKey = body?.unit;

  if (!trackKey || !isTrackKey(trackKey)) {
    return NextResponse.json({ error: "Unknown track." }, { status: 400 });
  }
  const track = TRACKS[trackKey];
  const unit = unitByKey(unitKey);
  if (!unit) {
    return NextResponse.json({ error: "Unknown unit." }, { status: 400 });
  }

  try {
    const questions = await askForJson<QuizQuestion[]>({
      prompt: buildQuizPrompt(track, unit),
      maxTokens: 1800,
    });
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Malformed quiz data from model.");
    }
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("quiz generation failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
