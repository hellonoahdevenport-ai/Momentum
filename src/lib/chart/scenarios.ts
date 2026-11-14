import type { ChartScenario } from "./types";

/**
 * Fictional, illustrative structured-documentation scenarios — practice
 * writing a clinical note in a standard format (SOAP, ADPIE, SBAR) and
 * get completeness feedback. Educational simulation only — content
 * status: needs clinical review, same as every case in this product.
 */
export const CHART_SCENARIOS: ChartScenario[] = [
  {
    id: "soap-sore-throat",
    title: "SOAP note: sore throat and fever",
    format: "SOAP",
    snapshot:
      "Fictional practice scenario — not a real patient. A 22-year-old college student presents with two days of sore throat, fever to 101°F, and difficulty swallowing. No cough. Exam shows tonsillar exudate and tender anterior cervical lymph nodes.",
    fields: [
      {
        id: "subjective",
        label: "Subjective",
        placeholder: "What does the patient report, in their own words?",
        rubricKeywords: ["sore throat", "fever", "difficulty swallowing", "two days", "no cough", "college student"],
        guidance:
          "A strong subjective section captures the chief complaint in the patient's words, how long it's been going on, and pertinent negatives like the absence of a cough.",
      },
      {
        id: "objective",
        label: "Objective",
        placeholder: "What did you observe or measure on exam?",
        rubricKeywords: ["101", "exudate", "tonsillar", "lymph nodes", "cervical", "temperature", "fever"],
        guidance:
          "Objective findings are measurable or observable: vital signs, and exam findings like tonsillar exudate and tender cervical lymphadenopathy.",
      },
      {
        id: "assessment",
        label: "Assessment",
        placeholder: "What's your clinical impression?",
        rubricKeywords: ["pharyngitis", "strep", "tonsillitis", "bacterial", "infection"],
        guidance:
          "An assessment names the working impression — here, the findings are classically consistent with streptococcal pharyngitis or tonsillitis, pending confirmatory testing.",
      },
      {
        id: "plan",
        label: "Plan",
        placeholder: "What's next?",
        rubricKeywords: ["rapid strep", "throat culture", "antibiotics", "supportive care", "fluids", "follow up", "recheck"],
        guidance:
          "A plan here usually includes a confirmatory test (rapid strep or throat culture), conditional treatment, supportive care, and follow-up or return precautions.",
      },
    ],
  },
  {
    id: "adpie-postop-confusion",
    title: "Nursing note: new post-op confusion",
    format: "ADPIE",
    snapshot:
      "Fictional practice scenario — not a real patient. A 76-year-old is post-operative day 2 after hip surgery. The nurse finds them more confused than their baseline, picking at their IV line, and slightly tachycardic.",
    fields: [
      {
        id: "assessment",
        label: "Assessment",
        placeholder: "What did you observe or assess?",
        rubricKeywords: ["confusion", "baseline", "tachycardic", "picking at", "iv", "vital signs", "oriented"],
        guidance:
          "Document the change from baseline clearly — new confusion in an older post-op patient is a red flag worth describing precisely, not just noting as \"confused.\"",
      },
      {
        id: "diagnosis",
        label: "Nursing diagnosis",
        placeholder: "What's the priority nursing concern?",
        rubricKeywords: ["acute confusion", "delirium", "risk for injury", "risk for falls", "safety"],
        guidance:
          "New, acute confusion in an older post-operative patient points toward a nursing diagnosis like acute confusion or delirium, with an associated safety risk.",
      },
      {
        id: "intervention",
        label: "Intervention",
        placeholder: "What did you do?",
        rubricKeywords: ["notify provider", "vital signs", "safety", "fall precautions", "reorient", "remove", "bladder", "pain"],
        guidance:
          "Interventions should include immediate safety measures, a full set of vitals, checking common reversible causes (pain, infection, urinary retention), and notifying the provider.",
      },
      {
        id: "evaluation",
        label: "Evaluation",
        placeholder: "What's the follow-up or expected outcome?",
        rubricKeywords: ["reassess", "improve", "provider aware", "safe", "monitor"],
        guidance: "Evaluation closes the loop: how will you know the intervention worked, and when will you reassess?",
      },
    ],
  },
  {
    id: "sbar-deteriorating-patient",
    title: "SBAR handoff: a patient trending the wrong way",
    format: "SBAR",
    snapshot:
      "Fictional practice scenario — not a real patient. You're calling the on-call provider about a patient whose oxygen saturation has dropped from 97% to 91% over the last hour, with increasing work of breathing.",
    fields: [
      {
        id: "situation",
        label: "Situation",
        placeholder: "What's happening right now, briefly?",
        rubricKeywords: ["oxygen", "dropped", "91", "work of breathing", "calling about"],
        guidance: "Lead with the one-line reason for the call — the acute change, not the whole history.",
      },
      {
        id: "background",
        label: "Background",
        placeholder: "What's the relevant context?",
        rubricKeywords: ["admitted", "history", "diagnosis", "baseline"],
        guidance: "Give just enough context for the provider to interpret the change — admitting diagnosis, relevant history, baseline status.",
      },
      {
        id: "assessment",
        label: "Assessment",
        placeholder: "What do you think is going on?",
        rubricKeywords: ["respiratory", "distress", "worsening", "concerned", "trend"],
        guidance: "State your clinical read of the situation — this is where you flag your level of concern directly.",
      },
      {
        id: "recommendation",
        label: "Recommendation",
        placeholder: "What do you want from the provider?",
        rubricKeywords: ["oxygen", "order", "see the patient", "come evaluate", "chest x-ray", "abg"],
        guidance: "Be specific about what you're asking for — an order, a bedside evaluation, a test — rather than leaving it open-ended.",
      },
    ],
  },
];

export function getChartScenario(id: string): ChartScenario | undefined {
  return CHART_SCENARIOS.find((s) => s.id === id);
}
