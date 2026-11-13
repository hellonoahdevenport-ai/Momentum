import type { TrackKey } from "./types";

export interface FutureTier {
  name: string;
  sub: string;
}

export interface Track {
  key: TrackKey;
  label: string;
  shortDesc: string;
  subjectRole: string;
  subjectRoleCap: string;
  professional: string;
  scenarioNoun: string;
  evidenceCategories: string[];
  conclusionLabel: string;
  actionLabel: string;
  snapshotHint: string;
  interviewToneHint: string;
  gradingFocus: string;
  tierLabel: string;
  tierSub: string;
  futureTiers: FutureTier[];
  accent: string;
  accentDark: string;
}

export const TRACKS: Record<TrackKey, Track> = {
  medicine: {
    key: "medicine",
    label: "Medicine",
    shortDesc: "Interview a patient, order a workup, reach a diagnosis.",
    subjectRole: "patient",
    subjectRoleCap: "Patient",
    professional: "clinician",
    scenarioNoun: "clinical case",
    evidenceCategories: ["Labs", "Imaging", "Bedside"],
    conclusionLabel: "Diagnosis",
    actionLabel: "Treatment plan",
    snapshotHint:
      "vitals such as blood pressure, heart rate, respiratory rate, temperature in Fahrenheit, and oxygen saturation - 4 to 5 short label/value pairs",
    interviewToneHint:
      "a real patient describing symptoms - a little worried, cooperative, not medically trained",
    gradingFocus:
      "whether the right workup was ordered and whether the treatment plan is sound",
    tierLabel: "Step 1",
    tierSub: "Year 1-2 · Preclinical",
    futureTiers: [
      { name: "Step 2 CK", sub: "Year 3-4 · Clinical rotations" },
      { name: "Step 3", sub: "Residency" },
    ],
    accent: "#2563eb",
    accentDark: "#1e40af",
  },
  nursing: {
    key: "nursing",
    label: "Nursing",
    shortDesc: "Assess a patient under your care, build a safe care plan.",
    subjectRole: "patient",
    subjectRoleCap: "Patient",
    professional: "nurse",
    scenarioNoun: "nursing case",
    evidenceCategories: ["Vitals & monitoring", "Assessment findings", "Orders & labs"],
    conclusionLabel: "Primary nursing diagnosis",
    actionLabel: "Care plan",
    snapshotHint:
      "vitals and monitoring numbers such as blood pressure, heart rate, pain score out of 10, and oxygen saturation - 4 to 5 short label/value pairs",
    interviewToneHint:
      "a real patient under nursing care, responding to comfort, safety and symptom questions, not medically trained",
    gradingFocus:
      "correct prioritization (safety first) and whether the care plan follows sound nursing process",
    tierLabel: "Fundamentals",
    tierSub: "Year 1 · Pre-licensure",
    futureTiers: [
      { name: "Med-Surg", sub: "Year 2" },
      { name: "NCLEX Prep", sub: "Final year" },
    ],
    accent: "#7c3aed",
    accentDark: "#5b21b6",
  },
};

export const TRACK_ORDER: TrackKey[] = ["medicine", "nursing"];

export function isTrackKey(value: string): value is TrackKey {
  return value === "medicine" || value === "nursing";
}
