import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — not yet checked by nursing
 * faculty. Do not present as validated.
 */
export const carlosJimenezCase: CaseFile = {
  meta: {
    id: "carlos-jimenez-hypoglycemia",
    version: "0.1.0",
    title: "Carlos Jimenez: Sudden Shakiness and Confusion Before Lunch",
    trackKey: "nursing",
    unitKey: "endocrine",
    author: "Momentum content team (fictional case; educational use only; nursing-faculty review pending)",
    reviewers: [],
    reviewStatus: "needs_clinical_review",
    reviewDate: null,
    nextReviewDate: null,
    sources: [
      {
        title: "Clinical Judgment Measurement Model",
        owner: "NCSBN",
        url: "https://www.ncsbn.org/",
        versionOrDate: "Specific test-plan citation pending verification at clinical review",
      },
      {
        title: "Hypoglycemia management in hospitalized patients",
        owner: "AACN Essentials",
        url: "https://www.aacnnursing.org/essentials",
        versionOrDate: "Pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Recognize the signs and symptoms of acute hypoglycemia in a hospitalized patient",
      "Apply the rule-of-15 approach for treating hypoglycemia and reassessing",
      "Prioritize immediate safety needs (fall and aspiration risk) during an acute confusional episode",
      "Identify and document a likely contributing cause to prevent recurrence",
    ],
    targetLevel: "Foundations, pre-licensure",
    estimatedMinutes: 18,
    contentWarning: null,
  },
  conclusionLabel: "Priority nursing diagnosis",
  actionLabel: "Nursing care plan",
  patient: {
    name: "Carlos Jimenez",
    age: 45,
    pronouns: "he/him",
    summary: "45-year-old man with type 1 diabetes, admitted for an unrelated orthopedic procedure",
  },
  presentingIssue: "Sudden diaphoresis, shakiness, and confusion shortly before lunch.",
  snapshotFacts: [
    { label: "BP", value: "128/80 mmHg" },
    { label: "HR", value: "104 bpm" },
    { label: "RR", value: "18/min" },
    { label: "Temp", value: "98.3°F" },
    { label: "SpO2", value: "98% room air" },
    { label: "Fingerstick glucose", value: "52 mg/dL" },
  ],
  initialAssessment:
    "Carlos is diaphoretic, visibly shaky, and appears mildly confused, answering questions slowly and incorrectly about the day. He is sitting up in bed but seems unsteady. His morning insulin was given on schedule, but his breakfast tray was delayed due to a procedure downstairs.",
  examFindings: {
    head: "Mildly confused, oriented to person but not clearly to time. Pupils equal and reactive.",
    chest: "Heart rate elevated, regular rhythm. Lungs clear.",
    abdomen: "Soft, non-tender. No nausea reported currently.",
    arms: "Visible tremor noted. Skin cool and diaphoretic.",
    legs: "No weakness noted, but appears unsteady when attempting to shift position in bed.",
    skin: "Pale, diaphoretic, cool to touch.",
  },
  interviewTopics: [
    {
      id: "opening",
      category: "Assess",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "(speaking slowly) I don't feel right... shaky, and I'm sweating a lot. I don't know what time it is right now.",
    },
    {
      id: "last-meal",
      category: "History",
      triggerKeywords: ["eat", "meal", "breakfast", "lunch", "food", "last ate"],
      factText:
        "I got my insulin this morning like usual, but then they took me down for that X-ray thing and my breakfast tray never came — I don't think I've eaten anything yet today.",
    },
    {
      id: "symptom-detail",
      category: "Assess",
      triggerKeywords: ["makes it better", "makes it worse", "what helps", "relieve", "ease", "better when", "worse when"],
      factText:
        "(shaky voice) I don't know what would help — I just feel worse the longer this goes on, kind of dizzy and out of it.",
    },
    {
      id: "diabetes-history",
      category: "PMH",
      triggerKeywords: ["diabetes", "diabetic", "insulin", "sugar", "glucose history", "type 1"],
      factText:
        "I've had type 1 diabetes since I was a kid, so I know these low feelings pretty well — this feels like one of those.",
    },
    {
      id: "insulin-timing",
      category: "Medications",
      triggerKeywords: ["insulin", "dose", "medication", "when did you take", "timing"],
      factText: "I got my usual morning insulin dose at breakfast time, same as always, but then the food never came.",
    },
    {
      id: "prior-episodes",
      category: "PMH",
      triggerKeywords: ["low blood sugar before", "hypoglycemia before", "fainted", "passed out", "seizure"],
      factText:
        "Yeah, I've had lows like this before at home, usually when I miscalculate my food or exercise too much — never passed out, but I've felt this shaky before.",
    },
    {
      id: "allergies",
      category: "Allergies",
      triggerKeywords: ["allergy", "allergic", "allergies"],
      factText: "(slowly) No allergies... I don't think.",
    },
    {
      id: "support",
      category: "Social",
      triggerKeywords: ["home", "support", "alone", "help", "family", "manage diabetes"],
      factText: "My wife usually helps me keep track of my sugars at home — she's pretty on top of it.",
    },
  ],
  evidenceCategories: ["Vitals & monitoring", "Assessment findings", "Orders & labs"],
  evidenceCatalog: [
    {
      id: "fingerstick-glucose",
      name: "Point-of-care fingerstick glucose",
      category: "Vitals & monitoring",
      resultText: "52 mg/dL",
      referenceRange: "70–100 mg/dL (fasting)",
      resultFlag: "critical",
      significant: true,
      teachingNote: "This single value confirms hypoglycemia and, combined with his symptoms, calls for immediate treatment rather than waiting for further workup.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "neuro-check",
      name: "Focused neurologic / mental status check",
      category: "Assessment findings",
      resultText: "Mildly confused, oriented to person only, slow to respond, no focal weakness",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Confusion during hypoglycemia is a safety concern in itself — it raises fall and aspiration risk until glucose is corrected and mental status clears.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "mar-review",
      name: "Medication administration record review",
      category: "Orders & labs",
      resultText: "Morning insulin dose given on schedule; breakfast tray delayed due to a procedure",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Identifying the likely cause — insulin given without the matched meal — is key to both treating this episode and preventing a repeat one.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "repeat-glucose-15min",
      name: "Repeat fingerstick glucose, 15 minutes after treatment",
      category: "Vitals & monitoring",
      resultText: "98 mg/dL after 15 grams of rapid-acting carbohydrate",
      referenceRange: "70–100 mg/dL (fasting)",
      resultFlag: "normal",
      significant: true,
      teachingNote: "Rechecking 15 minutes after treatment is the core of the rule-of-15 approach — it tells you whether to stop, repeat treatment, or give a follow-up snack.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "repeat-vitals",
      name: "Repeat vital signs",
      category: "Vitals & monitoring",
      resultText: "Heart rate down to 84 bpm, diaphoresis resolving",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A resolving tachycardia and diaphoresis track along with the glucose correction and support that treatment is working.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "fall-risk-assessment",
      name: "Fall risk assessment",
      category: "Assessment findings",
      resultText: "Elevated fall risk score during the confusional episode due to unsteadiness and altered mentation",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Confusion plus unsteadiness during hypoglycemia is a real fall hazard that needs explicit safety measures, not just glucose correction.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "chart-pattern-review",
      name: "Review of recent glucose trend in chart",
      category: "Orders & labs",
      resultText: "No prior low readings this admission; this is an isolated episode tied to the delayed meal",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "Confirms this looks like a situational cause (timing mismatch) rather than a pattern suggesting his insulin regimen itself needs broader reassessment — still worth noting either way.",
      invasive: false,
      costNote: "low cost",
    },
  ],
  stages: [
    { key: "brief", label: "Brief" },
    { key: "interview", label: "Assess" },
    { key: "evidence", label: "Findings" },
    { key: "interpretation", label: "Analyze cues" },
    { key: "reasoning", label: "Prioritize" },
    { key: "plan", label: "Plan & act" },
    { key: "event", label: "Follow-up" },
    { key: "debrief", label: "Evaluate" },
  ],
  interpretationQuestions: [
    {
      id: "interp-1",
      type: "mcq",
      display: "radio",
      prompt:
        "A fingerstick glucose of 52 mg/dL with diaphoresis, tremor, and confusion most directly points to a priority of:",
      options: [
        "Acute hypoglycemia requiring immediate treatment",
        "Anxiety-related panic episode",
        "New-onset seizure disorder",
        "Normal post-insulin response, no action needed",
      ],
      correctIndex: 0,
      rationale:
        "A clearly low glucose value combined with classic adrenergic (diaphoresis, tremor) and neuroglycopenic (confusion) symptoms confirms acute hypoglycemia, which needs immediate treatment rather than watchful waiting.",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which findings support treating this as an urgent hypoglycemic episode and addressing safety immediately? (select all that apply)",
      options: [
        "Fingerstick glucose of 52 mg/dL",
        "Confusion with unsteadiness, raising fall risk",
        "Insulin given without the matched meal arriving",
        "Normal chart glucose trend earlier this admission",
        "Diaphoresis and tremor",
      ],
      correctIndices: [0, 1, 2, 4],
      partialCredit: true,
      rationale:
        "The low glucose, confusion-related fall risk, the insulin-meal mismatch, and classic adrenergic symptoms all support urgent treatment and safety measures. A previously normal glucose trend is reassuring context but doesn't change what needs to happen right now.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "What is the core idea of the 'rule of 15' for treating hypoglycemia?",
      options: [
        "Give 15 grams of rapid-acting carbohydrate, recheck glucose in 15 minutes, repeat if still low",
        "Wait 15 minutes before doing anything",
        "Give 15 units of insulin",
        "Check glucose only once every 15 hours",
      ],
      correctIndex: 0,
      rationale: "The rule of 15 is a simple, repeatable approach: treat, wait 15 minutes, recheck, and repeat if needed.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "Why is fall risk an immediate concern during a hypoglycemic episode with confusion?",
      options: [
        "Altered mental status and unsteadiness increase the risk of a fall right now",
        "Fall risk is unrelated to glucose level",
        "Only elderly patients have fall risk",
        "Fall risk only matters after discharge",
      ],
      correctIndex: 0,
      rationale: "Confusion and unsteadiness during hypoglycemia are an immediate, situational safety hazard that needs active prevention measures.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "Why is identifying the likely cause of this episode (insulin given without the matched meal) an important part of the nursing plan?",
      options: [
        "It helps prevent a repeat episode, not just treat this one",
        "It has no bearing on future care",
        "It is only useful for billing purposes",
        "It replaces the need to treat the current episode",
      ],
      correctIndex: 0,
      rationale: "Treating the current low is necessary but not sufficient — identifying and documenting the contributing cause helps prevent it from happening again.",
    },
  ],
  conclusionOptions: [
    "Acute hypoglycemia requiring immediate treatment",
    "Anxiety-related panic episode",
    "New-onset seizure disorder",
    "Normal expected response to insulin, no action needed",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Which of these are reasonable to keep in mind and monitor for, even though hypoglycemia is clearly the top priority right now? (select all that apply)",
    options: [
      "Rebound hyperglycemia after over-treatment",
      "A fall during the confusional period",
      "Recurrent hypoglycemia if the underlying meal-timing issue isn't addressed",
      "An unrelated cardiac event",
      "Anxiety about future episodes",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    partialCredit: true,
    rationale:
      "Good nursing judgment treats the acute problem first while still tracking related risks — overcorrection, injury during the episode, recurrence, and even an unrelated but possible concurrent problem.",
  },
  confidenceQuestion: {
    id: "confidence-1",
    type: "confidence",
    prompt: "Before seeing the debrief, how confident are you in this prioritization?",
  },
  changeMyMindQuestion: {
    id: "change-mind-1",
    type: "short-text",
    prompt: "What single new finding would most change your top priority for Carlos right now?",
    rubricKeywords: [
      "normal glucose",
      "chest pain",
      "seizure",
      "loss of consciousness",
      "not improving",
      "worsening confusion",
      "focal weakness",
      "no response to treatment",
    ],
    sampleAnswer:
      "If his glucose had actually been normal despite his symptoms, or if he didn't improve after treatment and instead developed worsening confusion or focal weakness, I'd escalate immediately and broaden the workup beyond simple hypoglycemia.",
    rationale:
      "A normal glucose or a lack of response to treatment would mean his symptoms have another cause and would change the priority immediately.",
  },
  planPrompt: {
    label: "Nursing care plan",
    placeholder: "What would you do next for Carlos, and why?",
    safetyChecklist: [
      "Treat immediately with rapid-acting carbohydrate per the rule of 15",
      "Recheck glucose in 15 minutes and repeat treatment if still low",
      "Implement fall precautions while mental status is altered",
      "Document the likely contributing cause (insulin-meal timing mismatch)",
      "Notify the provider and coordinate meal timing with insulin administration going forward",
    ],
    rubricKeywords: [
      "rule of 15",
      "rapid-acting carbohydrate",
      "recheck",
      "fall precautions",
      "monitor",
      "notify provider",
      "meal timing",
      "insulin",
      "document",
      "safety",
    ],
    sampleAnswer:
      "Treat Carlos immediately with a rapid-acting carbohydrate source per the rule of 15, and recheck his fingerstick glucose in 15 minutes, repeating treatment if it's still low. Implement fall precautions while he remains confused or unsteady, and stay with him until his mental status clears. Document the likely cause — insulin given without the matched meal arriving — and notify the provider and dietary team to better coordinate meal timing with his insulin schedule going forward. This is general nursing-process reasoning for a learning exercise, not facility-specific protocol.",
  },
  unfoldingEvent: null,
  debrief: {
    correctConclusionLabel: "Priority nursing diagnosis",
    correctConclusion: "Acute hypoglycemia requiring immediate treatment",
    conclusionExplanation:
      "Carlos's fingerstick glucose of 52 mg/dL, combined with classic adrenergic symptoms (diaphoresis, tremor) and neuroglycopenic symptoms (confusion), confirms acute hypoglycemia. The likely cause — his scheduled insulin being given without the matched meal arriving — is directly identifiable and correctable. His confusion and unsteadiness also create an immediate fall and safety concern that needs active, not just passive, monitoring.",
    keyConsiderations: [
      "The rule of 15 — treat, recheck in 15 minutes, repeat if needed — is a simple, reliable approach to acute hypoglycemia",
      "Confusion during hypoglycemia is itself a safety hazard, not just a symptom to note",
      "Identifying the contributing cause (an insulin-meal timing mismatch) is essential to preventing a repeat episode",
      "A single low reading in an otherwise normal glucose trend still demands full treatment — context doesn't lower the urgency",
    ],
    recommendedAction:
      "Treat immediately per the rule of 15, implement fall precautions during the confusional period, recheck glucose, and document and address the contributing meal-timing cause with the care team.",
    goodOutcome:
      "With prompt treatment and fall precautions, Carlos's glucose normalizes and his confusion resolves without injury, and better meal-insulin coordination prevents a repeat episode.",
    badOutcome:
      "If treatment is delayed or his confusion and unsteadiness aren't actively managed, he's at risk for both a worsening hypoglycemic event and a fall during the confusional period.",
    nextLearningGoalHint:
      "Next, try a case involving fluid overload in a patient with heart failure to practice a different kind of rapid-assessment, rapid-intervention nursing priority.",
  },
};
