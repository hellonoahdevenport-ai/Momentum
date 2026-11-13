export type TrackKey = "medicine" | "nursing";

export interface FutureTier {
  name: string;
  sub: string;
  status: "planned";
}

export interface Track {
  key: TrackKey;
  label: string;
  shortDesc: string;
  longDesc: string;
  professional: string;
  loopLabel: string;
  loopStages: string[];
  tierLabel: string;
  tierSub: string;
  mappingNote: string;
  futureTiers: FutureTier[];
  accent: string;
  accentDark: string;
  accentSoft: string;
  outcomesPreview: string[];
}

export const TRACKS: Record<TrackKey, Track> = {
  medicine: {
    key: "medicine",
    label: "Medicine",
    shortDesc: "Interview a fictional patient, order a workup, commit to a diagnosis.",
    longDesc:
      "Foundational, Step 1-aligned clinical reasoning: history, exam findings, test selection and interpretation, differential diagnosis, and management reasoning across organ systems.",
    professional: "clinician",
    loopLabel: "The diagnostic loop",
    loopStages: ["Brief", "Interview", "Evidence", "Reasoning", "Plan", "Debrief"],
    tierLabel: "Foundations / Step 1-aligned",
    tierSub: "Organ-system and cross-cutting foundations",
    mappingNote:
      "Organized by USMLE Step 1 content-outline systems and disciplines as a reference, not a claim of endorsement. Map to your course sequence as needed.",
    futureTiers: [
      { name: "Step 2 CK / Clerkships", sub: "Clinical rotation reasoning", status: "planned" },
      { name: "Step 3", sub: "Residency-level management", status: "planned" },
    ],
    accent: "#355cff",
    accentDark: "#1e3fd1",
    accentSoft: "#e8edff",
    outcomesPreview: [
      "Take a focused history and justify each question",
      "Choose a workup and interpret results against reference ranges",
      "Commit to a leading diagnosis with a defensible differential",
      "Reason through a management plan and safety checks",
    ],
  },
  nursing: {
    key: "nursing",
    label: "Nursing",
    shortDesc: "Assess a fictional patient, prioritize safely, build a nursing care plan.",
    longDesc:
      "Foundational nursing knowledge and clinical judgment: assessment, cue recognition, prioritization, safe interventions within nursing scope, communication, and evaluation.",
    professional: "nurse",
    loopLabel: "The clinical judgment cycle",
    loopStages: ["Brief", "Assess", "Analyze cues", "Prioritize", "Plan & act", "Evaluate"],
    tierLabel: "Foundations",
    tierSub: "Pre-licensure fundamentals",
    mappingNote:
      "Organized around the NCSBN Clinical Judgment Measurement Model (recognize cues, analyze cues, prioritize hypotheses, generate solutions, take action, evaluate outcomes) and AACN Essentials domains as a reference. Map to your institution's sequence as needed.",
    futureTiers: [
      { name: "Medical-surgical nursing", sub: "Expanded acuity and complexity", status: "planned" },
      { name: "NCLEX-RN review", sub: "Test-plan aligned review sets", status: "planned" },
    ],
    accent: "#17b890",
    accentDark: "#0e8e6d",
    accentSoft: "#e1f7ef",
    outcomesPreview: [
      "Recognize and cluster relevant assessment cues",
      "Prioritize problems using safety-first reasoning",
      "Select interventions within nursing scope, with rationale",
      "Evaluate outcomes and escalate appropriately",
    ],
  },
};

export const TRACK_ORDER: TrackKey[] = ["medicine", "nursing"];

export function isTrackKey(value: string): value is TrackKey {
  return value === "medicine" || value === "nursing";
}
