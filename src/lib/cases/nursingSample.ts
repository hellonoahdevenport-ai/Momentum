import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — this is an early sample skeleton,
 * not yet checked by nursing faculty. Do not present as validated.
 */
export const nursingSampleCase: CaseFile = {
  meta: {
    id: "jordan-alvarez-postop-safety",
    version: "0.1.0",
    title: "Jordan Alvarez: Post-Operative Day 1 Safety Assessment (sample — needs clinical review)",
    trackKey: "nursing",
    unitKey: "gi",
    author: "Casebook content team (fictional case; educational use only; nursing-faculty review pending)",
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
        title: "AACN Essentials",
        owner: "American Association of Colleges of Nursing",
        url: "https://www.aacnnursing.org/essentials",
        versionOrDate: "Pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Recognize and cluster post-operative assessment cues using the nursing process",
      "Prioritize nursing diagnoses using safety-first (ABC) reasoning when several are valid",
      "Select interventions within nursing scope, with rationale, before escalating to the provider",
      "Evaluate the effect of an intervention and adjust the plan",
    ],
    targetLevel: "Foundations, pre-licensure",
    estimatedMinutes: 18,
    contentWarning: null,
  },
  conclusionLabel: "Priority nursing diagnosis",
  actionLabel: "Nursing care plan",
  patient: {
    name: "Jordan Alvarez",
    age: 34,
    pronouns: "he/him",
    summary: "34-year-old, post-operative day 1 after laparoscopic appendectomy",
  },
  presentingIssue: "New admission to the surgical floor after surgery, needing a focused safety assessment.",
  snapshotFacts: [
    { label: "BP", value: "118/76 mmHg" },
    { label: "HR", value: "92 bpm" },
    { label: "RR", value: "18/min" },
    { label: "Temp", value: "99.1°F" },
    { label: "SpO2", value: "95% room air" },
    { label: "Pain", value: "6/10 at incision" },
  ],
  initialAssessment:
    "Jordan is awake, alert, and oriented, lying still in bed and grimacing when he shifts position. The abdominal dressing is dry and intact. He has not yet gotten out of bed since returning from the recovery unit.",
  examFindings: {
    head: "Alert and oriented x3. No distress at rest.",
    chest: "Breath sounds diminished at the bases bilaterally. Regular heart rate, no murmur.",
    abdomen: "Dressing dry and intact over the surgical site, mild tenderness around the incision, no rebound or guarding.",
    arms: "IV in place, no signs of infiltration. Skin warm and well-perfused.",
    legs: "Legs symmetric, no calf tenderness or swelling. Sequential compression devices in place.",
    skin: "Normal color, no diaphoresis at rest.",
  },
  interviewTopics: [
    {
      id: "opening",
      category: "Assess",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "Hey — it's pretty sore right where they operated, especially if I move or take a deep breath. I'm just trying to stay still.",
    },
    {
      id: "pain-detail",
      category: "Pain",
      triggerKeywords: ["pain", "hurt", "sore", "scale", "worse", "describe"],
      factText:
        "It's a sharp pain right at the incision, probably a 6 out of 10, and it gets worse if I breathe deep or try to sit up.",
    },
    {
      id: "pain-relief",
      category: "Pain",
      triggerKeywords: ["makes it better", "makes it worse", "what helps", "relieve", "ease", "better when", "worse when", "medication help"],
      factText:
        "Staying still helps some, and they gave me something for the pain a bit ago that's taken the edge off — but any deep breath or moving still makes it sharp again.",
    },
    {
      id: "nausea",
      category: "GI",
      triggerKeywords: ["nausea", "sick", "vomit", "stomach", "appetite"],
      factText:
        "I felt a little nauseous right after surgery but that's passed — I don't feel sick now, just sore.",
    },
    {
      id: "ambulation",
      category: "Mobility",
      triggerKeywords: ["walk", "ambulate", "move", "out of bed", "mobility"],
      factText:
        "I haven't gotten up yet since I got back from recovery — honestly the pain's made me nervous to try.",
    },
    {
      id: "breathing-exercises",
      category: "Respiratory",
      triggerKeywords: ["breathe", "breathing", "cough", "spirometer", "deep breath"],
      factText:
        "Nobody's had me do the breathing thing yet — the little device, I think? I know I'm supposed to but it hurts to breathe deep so I haven't tried.",
    },
    {
      id: "voiding",
      category: "GU",
      triggerKeywords: ["urinate", "void", "pee", "bathroom", "bladder", "urine"],
      factText:
        "Now that you mention it, I don't think I've gone to the bathroom since before the surgery — that's been a few hours now, and I do feel a little full down there.",
    },
    {
      id: "allergies",
      category: "Allergies",
      triggerKeywords: ["allergy", "allergic", "allergies"],
      factText: "No allergies that I know of.",
    },
    {
      id: "home-meds",
      category: "Medications",
      triggerKeywords: ["medication", "meds", "home medications", "pills", "taking"],
      factText: "I don't take anything regularly at home, no.",
    },
    {
      id: "support",
      category: "Social",
      triggerKeywords: ["home", "support", "alone", "help", "family", "discharge"],
      factText:
        "I live alone, so I'm a little worried about managing once I'm discharged, honestly.",
    },
  ],
  evidenceCategories: ["Vitals & monitoring", "Assessment findings", "Orders & labs"],
  evidenceCatalog: [
    {
      id: "repeat-vitals",
      name: "Repeat vital signs (trend)",
      category: "Vitals & monitoring",
      resultText: "SpO2 94% room air on repeat, mild tachypnea persisting",
      referenceRange: "SpO2 ≥ 95% room air",
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A single reading tells you less than a trend. A downward SpO2 trend is a safety signal that deserves follow-up.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "lung-sounds",
      name: "Lung auscultation",
      category: "Assessment findings",
      resultText: "Diminished breath sounds at both bases, no crackles",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Classic early sign of under-expansion after surgery, consistent with a developing risk for atelectasis.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "bladder-assessment",
      name: "Bladder assessment",
      category: "Assessment findings",
      resultText: "Mild suprapubic fullness, consistent with early urinary retention risk",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Post-anesthesia urinary retention is common and easy to miss when attention is on pain and breathing.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "calf-check",
      name: "Calf assessment (DVT screen)",
      category: "Assessment findings",
      resultText: "Legs symmetric, no tenderness or redness",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A routine, low-cost VTE risk screen given post-op immobility — reassuring here, but still worth documenting and repeating.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "pain-reassessment",
      name: "Pain reassessment, 30 minutes after intervention",
      category: "Assessment findings",
      resultText: "Pain down to 3/10 after a position change and ordered analgesic",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "Reassessing after an intervention is how you know whether it worked — don't skip this step.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "post-op-cbc",
      name: "Post-operative CBC",
      category: "Orders & labs",
      resultText: "Hemoglobin mildly low but stable from expected surgical blood loss; WBC mildly elevated",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: false,
      teachingNote: "A mild post-op leukocytosis is a common stress response, not by itself a sign of infection this early — don't over-interpret it alone.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "temp-trend",
      name: "Temperature trend this shift",
      category: "Vitals & monitoring",
      resultText: "Low-grade 99.1–99.4°F, not rising",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A stable low-grade temperature this early after surgery is a common, expected finding — rising or new fever later would be more concerning for infection.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "post-op-orders",
      name: "Surgeon's post-operative orders",
      category: "Orders & labs",
      resultText: "Incentive spirometer hourly while awake, ambulate four times daily starting today, sequential compression devices, diet as tolerated, scheduled and as-needed pain medication",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "The orders define what you actually have available to act on — always check them before planning interventions.",
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
        "A repeat SpO2 of 94% on room air, diminished breath sounds at the bases, and no incentive-spirometer use most directly point to a risk for:",
      options: [
        "Atelectasis from shallow breathing and immobility",
        "Pulmonary embolism",
        "Wound infection",
        "Anxiety-related hyperventilation",
      ],
      correctIndex: 0,
      rationale:
        "This pattern — shallow breathing from pain, diminished bases, no spirometer use — classically signals atelectasis risk, not PE (no sudden dyspnea or leg findings), infection (too early, no rising fever), or hyperventilation (he's underbreathing from pain, not overbreathing).",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which cues from this shift support prioritizing respiratory and mobility interventions right now? (select all that apply)",
      options: [
        "Diminished breath sounds at the bases",
        "Pain that's worse with deep breathing, discouraging it",
        "Hasn't used the incentive spirometer since arrival",
        "Normal calf exam",
        "Mild post-operative leukocytosis",
      ],
      correctIndices: [0, 1, 2],
      partialCredit: true,
      rationale:
        "A normal calf exam is reassuring, not a reason to escalate. Mild post-op leukocytosis is an expected stress response, not itself a driver for respiratory prioritization.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "Which post-operative finding is most concerning for developing atelectasis?",
      options: [
        "Diminished breath sounds at the bases with no spirometer use",
        "Mild post-operative leukocytosis",
        "A low-grade temperature that isn't rising",
        "Normal calf exam bilaterally",
      ],
      correctIndex: 0,
      rationale: "Diminished bases plus no incentive spirometer use is the classic early atelectasis pattern.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "When several nursing diagnoses are all valid, how should a nurse prioritize?",
      options: [
        "Safety-first, ABC-based reasoning",
        "Whichever the patient mentions first",
        "Alphabetical order",
        "Whichever has the most interventions available",
      ],
      correctIndex: 0,
      rationale: "Airway and breathing problems that can escalate quickly are prioritized first, even when other diagnoses are also valid.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "Why reassess after an intervention, rather than just documenting that it was done?",
      options: [
        "To know whether the intervention actually worked",
        "It's only required for medication administration",
        "To satisfy documentation requirements only",
        "It isn't necessary if the order was followed exactly",
      ],
      correctIndex: 0,
      rationale: "Reassessment is how the evaluate step of the nursing process closes the loop on whether a plan is working.",
    },
  ],
  conclusionOptions: [
    "Ineffective breathing pattern / risk for atelectasis related to post-operative pain and immobility",
    "Risk for infection related to the surgical incision",
    "Acute pain related to the surgical incision",
    "Risk for falls related to post-operative weakness",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Which of these hypotheses are reasonable to keep in mind and keep monitoring, even though they aren't the top priority right now? (select all that apply)",
    options: [
      "Pulmonary embolism",
      "Wound infection",
      "Urinary retention",
      "Opioid-induced constipation, if opioids are used",
      "Early atelectasis",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    partialCredit: true,
    rationale:
      "Good prioritization keeps lower-probability but serious possibilities like PE on the radar while acting on the most likely and most actionable problem first.",
  },
  confidenceQuestion: {
    id: "confidence-1",
    type: "confidence",
    prompt: "Before seeing the debrief, how confident are you in this prioritization?",
  },
  changeMyMindQuestion: {
    id: "change-mind-1",
    type: "short-text",
    prompt: "What single new finding would most change your top priority for Jordan right now?",
    rubricKeywords: [
      "chest pain",
      "sudden",
      "fever",
      "tachycardia",
      "hypoxia",
      "leg swelling",
      "bleeding",
      "drop in blood pressure",
    ],
    sampleAnswer:
      "Sudden chest pain, a sharp drop in oxygen saturation, or new leg swelling and tenderness would raise concern for a pulmonary embolism and would become the top priority immediately.",
    rationale:
      "These are the classic red-flag findings that would override the current respiratory-and-mobility priority and trigger immediate escalation.",
  },
  planPrompt: {
    label: "Nursing care plan",
    placeholder: "What would you do next for Jordan, and why?",
    safetyChecklist: [
      "Reassess respiratory status and escalate if SpO2 doesn't improve",
      "Coach incentive spirometer use and deep breathing / coughing",
      "Assist with early ambulation per orders, with adequate pain control first",
      "Address urinary retention risk per facility policy",
      "Continue DVT prophylaxis (sequential compression devices, early mobility)",
      "Notify the provider immediately for any sudden chest pain, severe dyspnea, or hypoxia",
    ],
    rubricKeywords: [
      "incentive spirometer",
      "ambulate",
      "pain control",
      "reassess",
      "escalate",
      "sequential compression",
      "void",
      "bladder",
      "deep breathing",
      "cough",
      "notify provider",
    ],
    sampleAnswer:
      "Coach Jordan through incentive spirometer use and deep breathing and coughing now, premedicate for pain before mobilizing, and assist him to sit up and ambulate per the surgeon's orders once pain is controlled. Continue sequential compression devices between ambulation. Monitor for voiding and consider a bladder scan if he hasn't voided within the facility's post-op window. Reassess vital signs and breath sounds after interventions, and notify the provider immediately for any sudden chest pain, worsening hypoxia, or a significant change in status. This is general nursing-process reasoning for a learning exercise, not facility-specific protocol.",
  },
  unfoldingEvent: {
    trigger: "after-plan",
    prompt:
      "Thirty minutes after your interventions, Jordan's SpO2 is 97% on room air and he's ambulated to the door with moderate assistance — but he now says he still hasn't been able to void and feels increasing lower-abdominal fullness.",
    choices: [
      {
        id: "a",
        label: "Reassess the bladder, encourage positioning and privacy to void, and notify the provider if it doesn't resolve soon",
        isSaferChoice: true,
        consequence:
          "Jordan is able to void shortly after with these simple measures, avoiding a more invasive intervention — the plan correctly layered respiratory and bladder priorities instead of fixating on only one.",
      },
      {
        id: "b",
        label: "Wait until the next scheduled assessment in two hours before addressing it",
        isSaferChoice: false,
        consequence:
          "Jordan's bladder fullness worsens and becomes increasingly uncomfortable. The delay risks progressing to a problem that an earlier, simpler intervention might have avoided.",
      },
      {
        id: "c",
        label: "Immediately perform a straight catheterization without trying non-invasive measures or checking facility policy first",
        isSaferChoice: false,
        consequence:
          "This resolves the retention, but skips lower-risk steps and facility policy that should be tried first, and catheterization carries its own infection risk that simpler measures might have avoided.",
      },
    ],
  },
  debrief: {
    correctConclusionLabel: "Priority nursing diagnosis",
    correctConclusion: "Ineffective breathing pattern / risk for atelectasis related to post-operative pain and immobility",
    conclusionExplanation:
      "Acute pain, infection risk, and fall risk are all valid, active nursing diagnoses for Jordan and belong on his care plan. Using safety-first, ABC-based prioritization, the breathing pattern and atelectasis risk take priority right now because the cues — a downward SpO2 trend, diminished breath sounds at the bases, and no incentive-spirometer use — point to an airway and breathing problem that is immediately actionable and can escalate quickly if ignored.",
    keyConsiderations: [
      "Multiple valid nursing diagnoses can coexist — prioritizing is about sequencing care, not discarding the others",
      "A single vital sign reading is less informative than a trend; the repeat SpO2 mattered more than the first one",
      "Pain control is often a prerequisite for the respiratory and mobility interventions that address the top priority",
      "Urinary retention risk is easy to miss when attention is on pain and breathing, and needs its own ongoing check",
    ],
    recommendedAction:
      "Coach breathing and spirometer use, premedicate and assist with ambulation, continue DVT prophylaxis, monitor for voiding, and reassess and escalate as needed.",
    goodOutcome:
      "With coached deep breathing, early ambulation, and layered monitoring, Jordan's respiratory status improves and he avoids atelectasis, while his pain, voiding, and DVT risk are also tracked and addressed.",
    badOutcome:
      "If breathing and mobility are deprioritized in favor of treating pain alone, Jordan is at higher risk for atelectasis, and smaller issues like urinary retention can be missed until they become more urgent.",
    nextLearningGoalHint:
      "Next, try a case where two problems are more tightly linked — for example, pain control as a direct prerequisite for the respiratory intervention — to practice sequencing rather than picking just one.",
  },
};
