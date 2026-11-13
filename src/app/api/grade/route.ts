import { NextResponse } from "next/server";
import { askForJson } from "@/lib/anthropic";
import { buildGradingPrompt } from "@/lib/prompts";
import { TRACKS, isTrackKey } from "@/lib/tracks";
import type { CaseData, ChatTurn, GradeResult } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const trackKey = body?.track;
  const caseData: CaseData | undefined = body?.caseData;
  const transcript: ChatTurn[] = Array.isArray(body?.transcript) ? body.transcript : [];
  const orderedEvidenceNames: string[] = Array.isArray(body?.orderedEvidenceNames)
    ? body.orderedEvidenceNames
    : [];
  const actionText: string = body?.actionText ?? "";

  if (!trackKey || !isTrackKey(trackKey) || !caseData) {
    return NextResponse.json({ error: "Missing track or case data." }, { status: 400 });
  }
  const track = TRACKS[trackKey];

  try {
    const grade = await askForJson<GradeResult>({
      prompt: buildGradingPrompt(track, caseData, transcript, orderedEvidenceNames, actionText),
      maxTokens: 900,
    });
    return NextResponse.json({ grade });
  } catch (err) {
    console.error("grading failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
