import type { CaseFile } from "./types";
import type { TrackKey } from "@/lib/tracks";
import { mayaChenCase } from "./mayaChen";
import { nursingSampleCase } from "./nursingSample";

// Server-side registry of authored case files, including hidden answer
// keys. Never import this module from a "use client" component — pages
// should read it in a server component and pass a stripped public view
// (see publicView.ts) down to client components, and grading should run
// through the server actions in actions.ts.
export const CASES: Record<string, CaseFile> = {
  [mayaChenCase.meta.id]: mayaChenCase,
  [nursingSampleCase.meta.id]: nursingSampleCase,
};

export function getCaseFile(caseId: string): CaseFile | undefined {
  return CASES[caseId];
}

export function listCases(): CaseFile[] {
  return Object.values(CASES);
}

export function casesForUnit(trackKey: TrackKey, unitKey: string): CaseFile[] {
  return listCases().filter((c) => c.meta.trackKey === trackKey && c.meta.unitKey === unitKey);
}

export function caseIdForUnit(trackKey: TrackKey, unitKey: string): string | null {
  const match = casesForUnit(trackKey, unitKey)[0];
  return match ? match.meta.id : null;
}
