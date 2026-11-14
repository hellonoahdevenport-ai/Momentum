import type { EcgRhythm, EcgRhythmPublic } from "./types";

export function toEcgPublicView(rhythm: EcgRhythm): EcgRhythmPublic {
  return {
    id: rhythm.id,
    name: rhythm.name,
    shortLabel: rhythm.shortLabel,
    patientContext: rhythm.patientContext,
    waveform: rhythm.waveform,
    rhythmOptions: rhythm.rhythmOptions,
  };
}
