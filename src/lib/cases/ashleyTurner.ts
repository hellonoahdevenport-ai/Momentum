import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — not yet checked by nursing
 * faculty. Do not present as validated.
 */
export const ashleyTurnerCase: CaseFile = {
  meta: {
    id: "ashley-turner-postpartum-hemorrhage",
    version: "0.1.0",
    title: "Ashley Turner: Heavier Than Expected Bleeding After Delivery",
    trackKey: "nursing",
    unitKey: "reproductive",
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
        title: "Postpartum hemorrhage recognition and initial nursing response",
        owner: "AACN Essentials",
        url: "https://www.aacnnursing.org/essentials",
        versionOrDate: "Pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Recognize early signs of postpartum hemorrhage, including a boggy uterus and heavier-than-expected bleeding",
      "Apply fundal massage and bladder assessment as immediate nursing interventions",
      "Quantify blood loss rather than relying on visual estimation alone",
      "Escalate to the provider promptly when bleeding doesn't respond to initial measures",
    ],
    targetLevel: "Foundations, pre-licensure",
    estimatedMinutes: 18,
    contentWarning: "Involves a postpartum bleeding emergency, discussed clinically and without graphic detail.",
  },
  conclusionLabel: "Priority nursing diagnosis",
  actionLabel: "Nursing care plan",
  patient: {
    name: "Ashley Turner",
    age: 31,
    pronouns: "she/her",
    summary: "31-year-old woman, 45 minutes after an uncomplicated vaginal delivery",
  },
  presentingIssue: "Heavier-than-expected vaginal bleeding noticed on a routine postpartum check, with a boggy uterus on fundal assessment.",
  snapshotFacts: [
    { label: "BP", value: "106/64 mmHg" },
    { label: "HR", value: "108 bpm" },
    { label: "RR", value: "20/min" },
    { label: "Temp", value: "98.6°F" },
    { label: "SpO2", value: "97% room air" },
    { label: "Fundus", value: "soft/boggy, located above the umbilicus" },
  ],
  initialAssessment:
    "Ashley delivered vaginally 45 minutes ago without complication. On a routine postpartum check, the nurse notes a soft, boggy fundus above the level of the umbilicus and a visibly larger-than-expected amount of blood on the under-buttock pad. Ashley reports feeling a little lightheaded and says she hasn't been to the bathroom since delivery.",
  examFindings: {
    head: "Alert and oriented, mildly anxious affect. Mucous membranes slightly pale.",
    chest: "Heart rate mildly elevated, regular rhythm. Lungs clear.",
    abdomen: "Fundus soft and boggy, palpable above the umbilicus and slightly displaced to the right.",
    arms: "Skin cool, capillary refill slightly delayed. IV in place.",
    legs: "No edema, no calf tenderness.",
    skin: "Mildly pale, slightly diaphoretic.",
  },
  interviewTopics: [
    {
      id: "opening",
      category: "Assess",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "I feel okay, just a little lightheaded and shaky — is that normal after delivery? I feel like I'm bleeding more than I expected.",
    },
    {
      id: "bleeding-detail",
      category: "Assess",
      triggerKeywords: ["bleeding", "blood", "pad", "flow", "clots", "how much"],
      factText:
        "It feels like a lot, honestly — more than what the nurses described when they talked to us earlier about what to expect.",
    },
    {
      id: "symptom-relief",
      category: "Assess",
      triggerKeywords: ["makes it better", "makes it worse", "what helps", "relieve", "ease", "better when", "worse when"],
      factText:
        "I'm not sure what would make it better — I just feel a little dizzy and cold, and I noticed it when I tried to sit up a bit.",
    },
    {
      id: "bladder",
      category: "GU",
      triggerKeywords: ["bathroom", "void", "urinate", "pee", "bladder", "last time"],
      factText:
        "Now that you mention it, I haven't gone to the bathroom since before I delivered — I do feel a little full down there.",
    },
    {
      id: "delivery-history",
      category: "History",
      triggerKeywords: ["delivery", "labor", "how long", "pushing", "complications"],
      factText:
        "Labor was about fourteen hours total, and pushing took a while too — longer than I expected, honestly.",
    },
    {
      id: "prior-pregnancies",
      category: "PMH",
      triggerKeywords: ["previous pregnancy", "prior pregnancy", "other children", "miscarriage", "bleeding before"],
      factText: "This is actually my second baby — my first delivery didn't have any bleeding problems like this that I remember.",
    },
    {
      id: "meds-allergies",
      category: "Medications",
      triggerKeywords: ["medication", "meds", "allergy", "allergic", "allergies", "pitocin", "oxytocin"],
      factText: "They gave me something in my IV right after delivery, I think to help my uterus contract — I don't remember the name. No allergies that I know of.",
    },
    {
      id: "support",
      category: "Social",
      triggerKeywords: ["partner", "support", "family", "here with you"],
      factText: "My partner is right here with me — they've been a little worried watching all this too.",
    },
  ],
  evidenceCategories: ["Vitals & monitoring", "Assessment findings", "Orders & labs"],
  evidenceCatalog: [
    {
      id: "fundal-assessment",
      name: "Fundal assessment",
      category: "Assessment findings",
      resultText: "Fundus soft and boggy, palpable above the umbilicus, displaced slightly to the right",
      referenceRange: "A well-contracted fundus is typically firm and at or below the level of the umbilicus",
      resultFlag: "critical",
      significant: true,
      teachingNote: "A soft, boggy, displaced fundus is the classic finding in uterine atony, the most common cause of early postpartum hemorrhage — this drives the immediate intervention.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "blood-loss-quantification",
      name: "Quantified blood loss (weighed pads)",
      category: "Assessment findings",
      resultText: "Estimated 550 mL since delivery, exceeding expected postpartum blood loss for a vaginal delivery",
      referenceRange: "Postpartum hemorrhage is generally defined as cumulative blood loss of 500 mL or more after vaginal delivery",
      resultFlag: "critical",
      significant: true,
      teachingNote: "Weighing pads or using a quantification tool is far more accurate than a visual estimate, which commonly underestimates true blood loss.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "bladder-assessment",
      name: "Bladder assessment",
      category: "Assessment findings",
      resultText: "Bladder palpably full, displacing the uterus slightly to the right",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A full bladder can prevent the uterus from contracting effectively — addressing it is a simple, important step alongside fundal massage.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "repeat-vitals",
      name: "Repeat vital signs",
      category: "Vitals & monitoring",
      resultText: "Heart rate 108 bpm, blood pressure mildly lower than her post-delivery baseline",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A rising heart rate with a falling blood pressure trend is an early sign of ongoing blood loss and needs to be tracked closely, not viewed as a single isolated number.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "fundal-massage-response",
      name: "Fundus after fundal massage",
      category: "Assessment findings",
      resultText: "Firms partially with massage but becomes boggy again within a few minutes",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A fundus that doesn't stay firm after massage suggests atony significant enough to need escalation and likely medication beyond massage alone.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "cbc-baseline",
      name: "CBC (compared to pre-delivery baseline)",
      category: "Orders & labs",
      resultText: "Hemoglobin modestly lower than her admission value, consistent with ongoing blood loss",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: false,
      teachingNote: "Useful supporting context, but lab turnaround is too slow to guide the immediate bedside response — physical assessment and vital sign trends matter more right now.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "perineal-inspection",
      name: "Perineal and laceration inspection",
      category: "Assessment findings",
      resultText: "No obvious laceration or visible source of bleeding beyond the uterine source",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "Ruling out a laceration as a separate bleeding source helps confirm the uterus itself, not a tear, is the main driver here.",
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
        "A boggy, displaced fundus, quantified blood loss over 500 mL, and a rising heart rate most directly point to a priority of:",
      options: [
        "Postpartum hemorrhage related to uterine atony",
        "Normal expected postpartum bleeding, no action needed",
        "Anxiety-related hyperventilation",
        "An unrelated urinary tract infection",
      ],
      correctIndex: 0,
      rationale:
        "A boggy fundus with quantified blood loss over the postpartum hemorrhage threshold and early vital sign changes together point to postpartum hemorrhage from uterine atony, requiring immediate nursing action.",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which findings support immediate fundal massage, bladder assessment, and provider notification? (select all that apply)",
      options: [
        "Soft, boggy, displaced fundus",
        "Full bladder on assessment",
        "Fundus that firms only briefly after massage",
        "No laceration found on perineal inspection",
        "Rising heart rate with falling blood pressure trend",
      ],
      correctIndices: [0, 1, 2, 4],
      partialCredit: true,
      rationale:
        "The boggy and displaced fundus, full bladder, poor response to massage, and worsening vital sign trend all support immediate action and escalation. A normal perineal inspection is useful to rule out a separate cause but doesn't itself drive the urgency.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "What is the most common cause of early postpartum hemorrhage?",
      options: ["Uterine atony", "Appendicitis", "Pulmonary embolism", "Urinary tract infection"],
      correctIndex: 0,
      rationale: "Uterine atony — a uterus that fails to contract firmly after delivery — is the most common cause of early postpartum hemorrhage.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "Why does a full bladder matter in a patient with a boggy postpartum uterus?",
      options: [
        "A full bladder can displace and prevent the uterus from contracting effectively",
        "A full bladder has no effect on uterine tone",
        "It only matters if the patient reports pain",
        "It is relevant only for cesarean deliveries",
      ],
      correctIndex: 0,
      rationale: "A distended bladder can mechanically prevent the uterus from contracting well, so addressing it is a key, simple intervention alongside fundal massage.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "Why is quantifying blood loss (such as weighing pads) preferred over visual estimation?",
      options: [
        "Visual estimation commonly underestimates true blood loss",
        "Visual estimation is always more accurate",
        "Quantification is only used for cesarean deliveries",
        "There is no meaningful difference between the two methods",
      ],
      correctIndex: 0,
      rationale: "Studies and practice both show visual estimation tends to underestimate postpartum blood loss, which is why quantification methods are preferred.",
    },
  ],
  conclusionOptions: [
    "Postpartum hemorrhage related to uterine atony",
    "Normal expected postpartum bleeding, no action needed",
    "Anxiety-related hyperventilation",
    "Unrelated urinary tract infection",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Which of these are reasonable to keep in mind while managing Ashley's atony, even though uterine atony is the leading cause here? (select all that apply)",
    options: [
      "A perineal or cervical laceration as an additional bleeding source",
      "Retained placental fragments",
      "A coagulation disorder contributing to poor clotting",
      "An unrelated cardiac arrhythmia",
      "Bladder distension worsening uterine atony",
    ],
    correctIndices: [0, 1, 2, 4],
    partialCredit: true,
    rationale:
      "Lacerations, retained fragments, coagulation issues, and bladder distension are all recognized contributors to or mimics of postpartum hemorrhage worth keeping in mind. An unrelated cardiac arrhythmia isn't a typical consideration in this specific clinical picture.",
  },
  confidenceQuestion: {
    id: "confidence-1",
    type: "confidence",
    prompt: "Before seeing the debrief, how confident are you in this prioritization?",
  },
  changeMyMindQuestion: {
    id: "change-mind-1",
    type: "short-text",
    prompt: "What single new finding would most change your top priority for Ashley right now?",
    rubricKeywords: [
      "firm fundus",
      "bleeding slowed",
      "laceration found",
      "stable vitals",
      "normal blood loss",
      "retained placenta",
      "not responding",
      "worsening vitals",
    ],
    sampleAnswer:
      "If the fundus had firmed and stayed firm after massage with bleeding clearly slowing and vitals stabilizing, I'd downgrade the urgency. If instead a laceration were found as the bleeding source, the intervention would shift toward repair rather than uterine-focused measures.",
    rationale:
      "A sustained firm fundus with stabilizing vitals versus an identified alternative bleeding source are the findings that would most change the immediate plan.",
  },
  planPrompt: {
    label: "Nursing care plan",
    placeholder: "What would you do next for Ashley, and why?",
    safetyChecklist: [
      "Perform fundal massage and reassess the fundus",
      "Assist Ashley to void or assess for bladder distension",
      "Quantify blood loss rather than relying on visual estimation",
      "Monitor vital signs closely and watch the trend, not just a single reading",
      "Notify the provider promptly if bleeding doesn't respond to initial measures",
    ],
    rubricKeywords: [
      "fundal massage",
      "bladder",
      "quantify blood loss",
      "monitor vitals",
      "notify provider",
      "escalate",
      "iv access",
      "oxytocin",
      "reassess",
      "uterine atony",
    ],
    sampleAnswer:
      "Perform fundal massage right away and reassess whether the fundus firms and stays firm, and help Ashley empty her bladder or assess for distension since a full bladder can worsen atony. Quantify blood loss rather than estimating visually, and monitor her vital signs closely, watching the trend rather than a single reading. If the fundus doesn't stay firm and bleeding continues, notify the provider promptly, ensure IV access is adequate, and anticipate orders for uterotonic medication. This is general nursing-process reasoning for a learning exercise, not facility-specific protocol.",
  },
  unfoldingEvent: null,
  debrief: {
    correctConclusionLabel: "Priority nursing diagnosis",
    correctConclusion: "Postpartum hemorrhage related to uterine atony",
    conclusionExplanation:
      "Ashley's soft, boggy, displaced fundus, quantified blood loss over the postpartum hemorrhage threshold, and a rising heart rate with a falling blood pressure trend together point to postpartum hemorrhage from uterine atony. A full bladder is a contributing factor worth addressing directly, and a brief response to fundal massage that doesn't hold suggests atony significant enough to need prompt escalation.",
    keyConsiderations: [
      "A boggy, displaced fundus is the classic sign of uterine atony and should prompt immediate fundal massage",
      "A full bladder can mechanically prevent the uterus from contracting well and is a simple, important thing to address",
      "Quantifying blood loss is more reliable than visual estimation, which commonly underestimates true loss",
      "A fundus that firms only briefly after massage is a signal to escalate, not a reason for reassurance",
    ],
    recommendedAction:
      "Perform fundal massage, assess and address bladder distension, quantify blood loss, monitor vital sign trends closely, and notify the provider promptly if bleeding doesn't respond to initial measures.",
    goodOutcome:
      "With prompt fundal massage, bladder management, and close monitoring, Ashley's bleeding is controlled before it progresses to a more severe hemorrhage requiring additional intervention.",
    badOutcome:
      "If the boggy fundus and rising heart rate are attributed only to normal postpartum changes, ongoing atony could progress to a more severe hemorrhage with significant blood loss before it's addressed.",
    nextLearningGoalHint:
      "Next, try a case involving a transfusion reaction to practice recognizing and responding to a different kind of acute blood-related nursing emergency.",
  },
};
