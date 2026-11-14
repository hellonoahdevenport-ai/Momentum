import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — not yet checked by nursing
 * faculty. Do not present as validated.
 */
export const beatriceOwusuCase: CaseFile = {
  meta: {
    id: "beatrice-owusu-stroke-dysphagia",
    version: "0.1.0",
    title: "Beatrice Owusu: Swallow Safety After Stroke",
    trackKey: "nursing",
    unitKey: "nervous",
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
        title: "Dysphagia screening after stroke",
        owner: "AACN Essentials",
        url: "https://www.aacnnursing.org/essentials",
        versionOrDate: "Pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Recognize post-stroke dysphagia risk before the first oral intake",
      "Apply a bedside swallow screening approach and keep the patient NPO until it is passed",
      "Prioritize aspiration risk using safety-first nursing reasoning",
      "Select safe positioning and diet-texture decisions within nursing scope",
    ],
    targetLevel: "Foundations, pre-licensure",
    estimatedMinutes: 18,
    contentWarning: null,
  },
  conclusionLabel: "Priority nursing diagnosis",
  actionLabel: "Nursing care plan",
  patient: {
    name: "Beatrice Owusu",
    age: 69,
    pronouns: "she/her",
    summary: "69-year-old woman, admitted 1 day ago after an ischemic stroke",
  },
  presentingIssue: "Being assessed by the nurse before her first meal is brought to her room.",
  snapshotFacts: [
    { label: "BP", value: "138/82 mmHg" },
    { label: "HR", value: "78 bpm" },
    { label: "RR", value: "16/min" },
    { label: "Temp", value: "98.7°F" },
    { label: "SpO2", value: "96% room air" },
    { label: "Diet order", value: "diet as tolerated, pending swallow screen" },
  ],
  initialAssessment:
    "Beatrice is awake, alert, and oriented, sitting up in bed. Her speech is mildly slurred and she has a slight droop on the left side of her mouth. She says she's hungry and is eager for breakfast to arrive. She has not yet had anything by mouth since admission.",
  examFindings: {
    head: "Mild left facial droop. Alert and oriented x3. Voice sounds slightly wet/gurgly at baseline.",
    chest: "Lungs clear to auscultation. Regular heart rate, no murmur.",
    abdomen: "Soft, non-tender, active bowel sounds. No nausea reported.",
    arms: "Mild left-sided weakness, grip slightly reduced on the left compared to the right. IV in place.",
    legs: "Mild left leg weakness. No edema.",
    skin: "Normal color, no diaphoresis.",
  },
  interviewTopics: [
    {
      id: "opening",
      category: "Assess",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "(slightly slurred speech) I'm doing okay, just hungry — is breakfast coming soon? I could really go for some coffee too.",
    },
    {
      id: "swallow-symptoms",
      category: "Assess",
      triggerKeywords: ["swallow", "swallowing", "choke", "choking", "cough when eating", "water", "drink"],
      factText:
        "Now that you ask, my throat's felt a little different since this happened — I haven't tried eating or drinking anything yet to really notice, though.",
    },
    {
      id: "pain-detail",
      category: "Pain",
      triggerKeywords: ["makes it better", "makes it worse", "what helps", "relieve", "ease", "better when", "worse when"],
      factText:
        "Nothing really hurts right now, so there's nothing that makes anything better or worse — I just feel a little weak on this side.",
    },
    {
      id: "speech",
      category: "Neuro",
      triggerKeywords: ["speech", "talk", "words", "slurred", "voice"],
      factText:
        "(slightly slurred) I know my words come out a little funny right now — my daughter noticed it too when she visited yesterday.",
    },
    {
      id: "weakness",
      category: "Neuro",
      triggerKeywords: ["weak", "weakness", "arm", "leg", "move", "grip"],
      factText: "My left arm and leg feel weaker than usual, like they're just not listening to me as well.",
    },
    {
      id: "appetite",
      category: "GI",
      triggerKeywords: ["hungry", "appetite", "eat", "food", "breakfast", "meal"],
      factText: "I'm definitely hungry — I haven't eaten since before this happened, so I'm looking forward to a meal.",
    },
    {
      id: "pmh",
      category: "PMH",
      triggerKeywords: ["history", "medical history", "conditions", "stroke before", "swallowing problems before"],
      factText:
        "I've never had a stroke before, and I've never had any trouble swallowing in the past, as far as I remember.",
    },
    {
      id: "support",
      category: "Social",
      triggerKeywords: ["home", "support", "alone", "help", "family", "discharge", "live"],
      factText: "My daughter lives nearby and has been checking in — she's planning to be here again today.",
    },
  ],
  evidenceCategories: ["Vitals & monitoring", "Assessment findings", "Orders & labs"],
  evidenceCatalog: [
    {
      id: "swallow-screen",
      name: "Bedside swallow screening (voice/cough with water sips)",
      category: "Assessment findings",
      resultText: "Wet, gurgly voice quality and a weak cough noted after a small water sip; screening not passed",
      referenceRange: null,
      resultFlag: "critical",
      significant: true,
      teachingNote: "A failed bedside swallow screen is the single most important finding here — it directly means she must remain NPO until a formal evaluation clears her, regardless of how hungry she feels.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "oral-motor-exam",
      name: "Oral motor and facial assessment",
      category: "Assessment findings",
      resultText: "Mild left facial droop, mildly reduced tongue strength on the left, slightly slurred speech",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Facial and oral motor weakness on the same side as her stroke deficit is a recognized risk factor for dysphagia and supports the swallow screen finding.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "lung-sounds",
      name: "Lung auscultation",
      category: "Assessment findings",
      resultText: "Clear bilaterally, no crackles or wheezing currently",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "Currently clear lungs are reassuring that no aspiration has occurred yet — the goal of the swallow screen and NPO status is to keep it that way.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "slp-order",
      name: "Speech-language pathology consult order",
      category: "Orders & labs",
      resultText: "Ordered, pending formal swallow evaluation",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "A formal evaluation by speech-language pathology is the next step after a failed bedside screen, and defines what diet texture, if any, is actually safe.",
      invasive: false,
      costNote: "moderate cost",
    },
    {
      id: "repeat-vitals",
      name: "Repeat vital signs",
      category: "Vitals & monitoring",
      resultText: "Stable, SpO2 96% room air, no change from admission",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "Stable vitals don't rule out aspiration risk — swallowing safety is assessed directly, not inferred from vital signs alone.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "oral-care",
      name: "Oral cavity assessment",
      category: "Assessment findings",
      resultText: "Mucous membranes dry, no pooled secretions currently, mild left-sided pocketing of saliva noted",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Pocketing of saliva on the weak side is another subtle sign consistent with reduced oral control, reinforcing the need for caution with oral intake.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "ct-head-followup",
      name: "Follow-up non-contrast head CT",
      category: "Orders & labs",
      resultText: "Stable, no new hemorrhage or extension of the infarct",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "Reassuring for overall neurologic stability, but it doesn't substitute for a direct swallow assessment — it answers a different clinical question.",
      invasive: false,
      costNote: "higher cost",
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
        "A wet, gurgly voice and weak cough after a water sip, plus a failed bedside swallow screen, most directly point to a priority of:",
      options: [
        "Risk for aspiration related to post-stroke dysphagia",
        "Risk for falls",
        "Impaired skin integrity",
        "Anxiety related to hospitalization",
      ],
      correctIndex: 0,
      rationale:
        "A failed swallow screen with a wet voice and weak cough is a direct, immediate aspiration risk signal — this takes priority over other valid but less acutely dangerous diagnoses right now.",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which cues support keeping Beatrice NPO and prioritizing a formal swallow evaluation before breakfast? (select all that apply)",
      options: [
        "Failed bedside swallow screen",
        "Wet, gurgly voice quality after water sip",
        "Mild left facial droop and reduced tongue strength",
        "Stable repeat vital signs",
        "Patient reports feeling hungry",
      ],
      correctIndices: [0, 1, 2],
      partialCredit: true,
      rationale:
        "The failed screen, wet voice, and oral motor weakness all directly support holding oral intake. Stable vitals and hunger are real, but neither makes oral intake safe before a formal evaluation.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "What should happen immediately after a patient fails a bedside swallow screen?",
      options: [
        "Keep the patient NPO and request a formal swallow evaluation",
        "Proceed with a regular diet as ordered",
        "Offer only thickened liquids without further evaluation",
        "Document it and reassess tomorrow",
      ],
      correctIndex: 0,
      rationale: "A failed screen means oral intake isn't yet safe — the patient stays NPO until a qualified formal evaluation clears a safe diet.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "A wet, gurgly voice quality after swallowing is concerning because it suggests:",
      options: [
        "Possible pooling of liquid near the airway",
        "Normal vocal cord function",
        "A sign of good swallow coordination",
        "Nothing clinically relevant",
      ],
      correctIndex: 0,
      rationale: "A wet or gurgly voice after swallowing is a classic bedside sign that liquid may be pooling near or entering the airway.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "Why isn't a stable set of vital signs enough to clear a patient for oral intake after a stroke?",
      options: [
        "Swallowing safety is assessed directly; vital signs don't reflect aspiration risk",
        "Vital signs always predict swallow safety",
        "Vital signs are the only thing that matters",
        "Oral intake has no relationship to aspiration risk",
      ],
      correctIndex: 0,
      rationale: "Aspiration risk is a direct swallowing function question, not something vital signs can substitute for assessing.",
    },
  ],
  conclusionOptions: [
    "Risk for aspiration related to post-stroke dysphagia",
    "Risk for falls related to left-sided weakness",
    "Impaired skin integrity related to immobility",
    "Anxiety related to hospitalization",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Which of these are reasonable nursing diagnoses to keep active on Beatrice's plan of care, even though aspiration risk is the top priority right now? (select all that apply)",
    options: [
      "Risk for falls related to left-sided weakness",
      "Impaired verbal communication related to slurred speech",
      "Imbalanced nutrition risk while NPO",
      "Anxiety related to new diagnosis and hospitalization",
      "Risk for impaired skin integrity related to decreased mobility",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    partialCredit: true,
    rationale:
      "Each of these is a valid, active concern for Beatrice. Prioritizing aspiration risk first doesn't mean the others are dropped — they're sequenced behind the most immediately dangerous issue.",
  },
  confidenceQuestion: {
    id: "confidence-1",
    type: "confidence",
    prompt: "Before seeing the debrief, how confident are you in this prioritization?",
  },
  changeMyMindQuestion: {
    id: "change-mind-1",
    type: "short-text",
    prompt: "What single new finding would most change your top priority for Beatrice right now?",
    rubricKeywords: [
      "passed swallow screen",
      "clear voice",
      "strong cough",
      "falls",
      "skin breakdown",
      "normal oral exam",
      "slp cleared",
      "aspiration event",
    ],
    sampleAnswer:
      "If she had clearly passed a bedside swallow screen with a strong cough and clear voice, aspiration risk would drop from the top priority, and I'd shift focus to mobility and fall-risk instead.",
    rationale:
      "A passed swallow screen is the finding that would most directly change whether aspiration risk remains the top priority.",
  },
  planPrompt: {
    label: "Nursing care plan",
    placeholder: "What would you do next for Beatrice, and why?",
    safetyChecklist: [
      "Keep NPO until a formal swallow evaluation clears a safe diet",
      "Position upright for any future oral intake once cleared",
      "Request and follow up on the speech-language pathology consult",
      "Monitor for coughing, voice changes, or respiratory changes with any trial of intake",
      "Communicate the NPO status clearly to the care team and family",
    ],
    rubricKeywords: [
      "npo",
      "swallow evaluation",
      "speech-language pathology",
      "upright",
      "positioning",
      "monitor",
      "escalate",
      "notify provider",
      "aspiration",
      "diet texture",
    ],
    sampleAnswer:
      "Keep Beatrice NPO and hold the breakfast tray until speech-language pathology completes a formal swallow evaluation, explaining to her and her daughter why this matters even though she's hungry. Continue to monitor voice quality, cough strength, and any respiratory changes, and position her upright for any future oral intake once a safe diet texture is identified. Notify the provider and care team of the failed bedside screen and the pending consult so the order set reflects her actual status. This is general nursing-process reasoning for a learning exercise, not facility-specific protocol.",
  },
  unfoldingEvent: null,
  debrief: {
    correctConclusionLabel: "Priority nursing diagnosis",
    correctConclusion: "Risk for aspiration related to post-stroke dysphagia",
    conclusionExplanation:
      "Beatrice's failed bedside swallow screen, wet/gurgly voice after a water sip, and left-sided oral motor weakness together point to a real, immediate aspiration risk. Other nursing diagnoses — fall risk, communication, skin integrity, anxiety — are all valid and active, but none carries the same immediate danger of a silent or overt aspiration event, so aspiration risk is prioritized first using safety-first reasoning.",
    keyConsiderations: [
      "A failed bedside swallow screen means NPO status continues until a formal evaluation says otherwise, regardless of how hungry the patient feels",
      "A wet or gurgly voice after swallowing is a classic, easy-to-miss bedside sign of possible aspiration risk",
      "Stable vital signs and clear lungs right now don't mean oral intake is safe — they reflect the current moment, not swallowing function",
      "Multiple valid nursing diagnoses can and should coexist on the same plan of care; prioritizing is about sequencing, not discarding",
    ],
    recommendedAction:
      "Keep Beatrice NPO, expedite the speech-language pathology swallow evaluation, monitor closely for any signs of aspiration, and communicate the plan clearly to the care team and family.",
    goodOutcome:
      "With NPO status maintained and a prompt formal swallow evaluation, Beatrice avoids an aspiration event and later resumes a safe diet texture under guidance.",
    badOutcome:
      "If a tray is given before a formal evaluation because she's hungry and vitals look fine, she's at real risk for aspirating, which could lead to pneumonia and a longer, more complicated recovery.",
    nextLearningGoalHint:
      "Next, try a case where pain control is a prerequisite for a different intervention, to practice sequencing nursing priorities that depend on each other.",
  },
};
