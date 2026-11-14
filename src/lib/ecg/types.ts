import type { McqQuestion } from "@/lib/cases/types";

export interface EcgWaveformSpec {
  rate: number; // approximate beats per minute, drives spacing
  rhythmType: "regular" | "irregularly_irregular";
  pWavePresent: boolean;
  qrsWidth: "narrow" | "wide";
  stSegment: "normal" | "elevated" | "depressed";
  tWaveInverted: boolean;
}

export interface EcgRhythm {
  id: string;
  name: string;
  shortLabel: string;
  patientContext: string;
  waveform: EcgWaveformSpec;
  rhythmOptions: string[];
  correctRhythmIndex: number;
  rhythmRationale: string;
  nextStepQuestion: Omit<McqQuestion, "type" | "display"> & { type: "mcq"; display: "radio" };
  teachingNote: string;
}

export interface EcgRhythmPublic {
  id: string;
  name: string;
  shortLabel: string;
  patientContext: string;
  waveform: EcgWaveformSpec;
  rhythmOptions: string[];
}
