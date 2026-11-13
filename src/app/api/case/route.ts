import { NextResponse } from "next/server";
import { askForJson } from "@/lib/anthropic";
import { buildScenarioPrompt } from "@/lib/prompts";
import { TRACKS, isTrackKey } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import type { CaseData } from "@/lib/types";

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
    const caseData = await askForJson<CaseData>({
      prompt: buildScenarioPrompt(track, unit),
      maxTokens: 2200,
    });

    if (!caseData?.conclusion || !Array.isArray(caseData.evidenceItems)) {
      throw new Error("Malformed case data from model.");
    }

    // Make sure the correct conclusion is actually present among the options,
    // and shuffle so its position isn't predictable.
    let options = Array.isArray(caseData.conclusionOptions) ? [...caseData.conclusionOptions] : [];
    if (!options.includes(caseData.conclusion)) options = [caseData.conclusion, ...options].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    caseData.conclusionOptions = options;

    return NextResponse.json({ caseData });
  } catch (err) {
    console.error("case generation failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
