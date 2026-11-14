import type { EcgRhythm } from "./types";

/**
 * Illustrative rhythm strips for pattern-recognition practice. These are
 * procedurally generated, stylized tracings — not real patient data and
 * not a clinically validated ECG simulator. Content status: needs clinical
 * review, same as every case in this product.
 */
export const ECG_RHYTHMS: EcgRhythm[] = [
  {
    id: "normal-sinus",
    name: "Normal sinus rhythm",
    shortLabel: "NSR",
    patientContext: "22-year-old with no complaints, routine pre-participation physical.",
    waveform: {
      rate: 72,
      rhythmType: "regular",
      pWavePresent: true,
      qrsWidth: "narrow",
      stSegment: "normal",
      tWaveInverted: false,
    },
    rhythmOptions: ["Normal sinus rhythm", "Atrial fibrillation", "Sinus tachycardia", "Ventricular tachycardia"],
    correctRhythmIndex: 0,
    rhythmRationale:
      "Regular rate around 70-80, a P wave before every QRS, narrow QRS, and a normal ST segment — the baseline against which the others are compared.",
    nextStepQuestion: {
      id: "nsr-next-step",
      type: "mcq",
      display: "radio",
      prompt: "What's the appropriate next step for this strip alone?",
      options: ["No intervention needed", "Start an antiarrhythmic", "Activate the cath lab", "Begin synchronized cardioversion"],
      correctIndex: 0,
      rationale: "A normal sinus rhythm in an asymptomatic patient needs no rhythm-directed intervention.",
    },
    teachingNote: "Use this as your reference strip — every other rhythm here is a deviation from this baseline.",
  },
  {
    id: "atrial-fibrillation",
    name: "Atrial fibrillation",
    shortLabel: "AFib",
    patientContext: "68-year-old with a few days of palpitations and fatigue.",
    waveform: {
      rate: 110,
      rhythmType: "irregularly_irregular",
      pWavePresent: false,
      qrsWidth: "narrow",
      stSegment: "normal",
      tWaveInverted: false,
    },
    rhythmOptions: ["Normal sinus rhythm", "Atrial fibrillation", "First-degree AV block", "ST-elevation MI"],
    correctRhythmIndex: 1,
    rhythmRationale:
      "No discrete, consistent P waves — just a fibrillating baseline — with an irregularly irregular R-R interval. The QRS itself stays narrow.",
    nextStepQuestion: {
      id: "afib-next-step",
      type: "mcq",
      display: "radio",
      prompt: "This patient is stable with normal vitals. What's the appropriate next step?",
      options: [
        "Assess stroke risk and consider rate control and anticoagulation per guidelines",
        "Immediate synchronized cardioversion regardless of stability",
        "No action needed — this is a normal variant",
        "Start a thrombolytic immediately",
      ],
      correctIndex: 0,
      rationale:
        "A stable patient with new AFib is managed with rate/rhythm control and a stroke-risk assessment (e.g. CHA2DS2-VASc) for anticoagulation — immediate cardioversion is reserved for instability.",
    },
    teachingNote: "The absence of organized P waves plus an irregularly irregular rhythm is the classic AFib pattern.",
  },
  {
    id: "stemi-anterior",
    name: "ST-elevation myocardial infarction (anterior pattern)",
    shortLabel: "STEMI",
    patientContext: "58-year-old with 45 minutes of crushing substernal chest pain, diaphoretic.",
    waveform: {
      rate: 98,
      rhythmType: "regular",
      pWavePresent: true,
      qrsWidth: "narrow",
      stSegment: "elevated",
      tWaveInverted: false,
    },
    rhythmOptions: ["Normal sinus rhythm", "Atrial fibrillation", "ST-elevation MI", "Pericarditis"],
    correctRhythmIndex: 2,
    rhythmRationale:
      "Regular narrow-complex rhythm with clear ST-segment elevation riding above baseline — combined with this presentation, treat as STEMI until proven otherwise.",
    nextStepQuestion: {
      id: "stemi-next-step",
      type: "mcq",
      display: "radio",
      prompt: "What's the time-critical next step?",
      options: [
        "Activate the cath lab / STEMI protocol and give aspirin now",
        "Discharge with outpatient cardiology follow-up",
        "Start broad-spectrum antibiotics",
        "Wait for troponin results before doing anything",
      ],
      correctIndex: 0,
      rationale:
        "STEMI is a 'door to balloon' time-critical diagnosis — aspirin and activating the cath lab/STEMI protocol happen immediately, in parallel with everything else, not after waiting on labs.",
    },
    teachingNote: "ST elevation plus this presentation is the single highest-stakes pattern on this list — minutes matter.",
  },
];

export function getEcgRhythm(id: string): EcgRhythm | undefined {
  return ECG_RHYTHMS.find((r) => r.id === id);
}
