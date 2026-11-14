import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — not yet checked by a licensed
 * clinician. Do not present as validated.
 */
export const ninaCastilloCase: CaseFile = {
  meta: {
    id: "nina-castillo-ectopic-pregnancy",
    version: "0.1.0",
    title: "Nina Castillo: Early Pregnancy with One-Sided Pain and Spotting",
    trackKey: "medicine",
    unitKey: "reproductive",
    author: "Momentum content team (fictional case; educational use only)",
    reviewers: [],
    reviewStatus: "needs_clinical_review",
    reviewDate: null,
    nextReviewDate: null,
    sources: [
      {
        title: "Ectopic pregnancy — clinical presentation and diagnosis",
        owner: "UpToDate",
        url: "https://www.uptodate.com/",
        versionOrDate: "Specific topic citation pending verification at clinical review",
      },
      {
        title: "Ectopic Pregnancy",
        owner: "StatPearls / NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/",
        versionOrDate: "Specific chapter citation pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Recognize early pregnancy with one-sided abdominal pain and vaginal bleeding as a presentation requiring urgent ectopic rule-out",
      "Interpret quantitative hCG and ultrasound findings together rather than in isolation",
      "Prioritize assessing hemodynamic stability in any suspected ectopic pregnancy",
      "Communicate respectfully and clearly about a time-sensitive reproductive health diagnosis",
    ],
    targetLevel: "Foundations / Step 1-aligned, early clinical skills",
    estimatedMinutes: 20,
    contentWarning: "Involves early pregnancy loss risk and a reproductive health emergency, discussed clinically and without graphic detail.",
  },
  conclusionLabel: "Diagnosis",
  actionLabel: "Treatment plan",
  patient: {
    name: "Nina Castillo",
    age: 27,
    pronouns: "she/her",
    summary: "27-year-old woman, approximately 6 weeks pregnant by last menstrual period",
  },
  presentingIssue: "One-sided lower abdominal pain and light vaginal spotting, with a positive home pregnancy test about two weeks ago.",
  snapshotFacts: [
    { label: "BP", value: "112/70 mmHg" },
    { label: "HR", value: "96 bpm" },
    { label: "RR", value: "16/min" },
    { label: "Temp", value: "98.5°F" },
    { label: "SpO2", value: "99% room air" },
    { label: "Pain", value: "5/10, right lower abdomen" },
  ],
  initialAssessment:
    "Nina is alert and anxious-appearing but not in acute distress at rest. She reports a dull, persistent ache on her right side that started yesterday, along with light spotting. She confirms a positive home pregnancy test about two weeks ago and believes she is roughly six weeks along by her last period.",
  examFindings: {
    head: "Alert, oriented, mildly anxious affect. Mucous membranes moist.",
    chest: "Heart rate mildly elevated, regular rhythm. Lungs clear.",
    abdomen: "Mild to moderate tenderness in the right lower quadrant, no rebound or guarding. No palpable mass. Normal bowel sounds.",
    arms: "No pallor. Capillary refill normal.",
    legs: "No edema, no calf tenderness.",
    skin: "Normal color, no diaphoresis.",
  },
  interviewTopics: [
    {
      id: "opening",
      category: "HPI",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "I've had this dull pain on my right side since yesterday, and I noticed some light spotting too, which is making me nervous since I just found out I'm pregnant.",
    },
    {
      id: "onset-course",
      category: "HPI",
      triggerKeywords: ["when", "start", "began", "onset", "how long", "course"],
      factText:
        "The pain started yesterday afternoon, pretty gradually, and it's stayed about the same since then — it hasn't gone away.",
    },
    {
      id: "alleviating-aggravating",
      category: "HPI",
      triggerKeywords: ["makes it better", "makes it worse", "what helps", "relieve", "ease", "better when", "worse when"],
      factText:
        "Lying still seems to help a little, and it feels a bit worse when I move around or press on that side.",
    },
    {
      id: "lmp",
      category: "HPI",
      triggerKeywords: ["last period", "lmp", "menstrual", "cycle", "how far along", "weeks pregnant"],
      factText:
        "My last period started about six weeks ago, and it was pretty normal for me — I took a home pregnancy test about two weeks ago when I was late, and it was positive.",
    },
    {
      id: "bleeding",
      category: "Gynecologic",
      triggerKeywords: ["bleeding", "spotting", "blood", "discharge", "pad", "flow"],
      factText:
        "It's just light spotting, not like a period — more like a little brownish discharge, nothing heavy.",
    },
    {
      id: "dizziness",
      category: "ROS",
      triggerKeywords: ["dizzy", "lightheaded", "faint", "weak", "shoulder pain"],
      factText: "I felt a little lightheaded once yesterday when I stood up quickly, but it passed fairly fast.",
    },
    {
      id: "ob-history",
      category: "PMH",
      triggerKeywords: ["previous pregnancy", "prior pregnancy", "miscarriage", "ectopic before", "surgery", "pelvic infection", "std", "chlamydia"],
      factText:
        "This would be my first pregnancy. I did have a pelvic infection a couple of years ago that I was treated for, if that matters.",
    },
    {
      id: "meds-allergies",
      category: "Medications",
      triggerKeywords: ["medication", "meds", "allergy", "allergic", "allergies", "pills", "taking", "iud", "birth control"],
      factText: "I was on birth control pills until about three months ago when my partner and I decided to try for a baby. No allergies that I know of.",
    },
  ],
  evidenceCategories: ["Labs", "Imaging", "Bedside"],
  evidenceCatalog: [
    {
      id: "hcg-quant",
      name: "Quantitative serum hCG",
      category: "Labs",
      resultText: "1,450 mIU/mL",
      referenceRange: "Levels are interpreted alongside ultrasound findings rather than a single fixed cutoff",
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Confirms an ongoing pregnancy, but the key question is whether this level is consistent with what ultrasound should be able to show — a mismatch is a central clue toward an ectopic location.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "pelvic-us",
      name: "Transvaginal pelvic ultrasound",
      category: "Imaging",
      resultText: "No intrauterine pregnancy identified; a small adnexal mass noted on the right, no clear fetal pole seen; small amount of free fluid in the pelvis",
      referenceRange: null,
      resultFlag: "critical",
      significant: true,
      teachingNote: "At this hCG level, an intrauterine pregnancy should typically be visible if present in the uterus — its absence, combined with a right adnexal mass and free fluid, is the classic ultrasound picture suggesting an ectopic pregnancy.",
      invasive: false,
      costNote: "higher cost",
    },
    {
      id: "repeat-vitals",
      name: "Repeat vital signs",
      category: "Bedside",
      resultText: "Heart rate and blood pressure stable, no orthostatic drop",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "Hemodynamic stability is the single most important bedside check in suspected ectopic pregnancy — it directly determines how urgently intervention is needed.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "cbc",
      name: "CBC with differential",
      category: "Labs",
      resultText: "Hemoglobin within normal range, no significant drop from baseline",
      referenceRange: null,
      resultFlag: "normal",
      significant: true,
      teachingNote: "A stable hemoglobin is reassuring against significant internal bleeding, though a single normal value doesn't fully exclude an early or slow bleed.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "blood-type-rh",
      name: "Blood type and Rh factor",
      category: "Labs",
      resultText: "O negative",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "An Rh-negative result matters regardless of the final diagnosis, since Rh immune globulin may be indicated with any bleeding in pregnancy to prevent future sensitization.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "repeat-hcg-48h",
      name: "Repeat quantitative hCG in 48 hours",
      category: "Labs",
      resultText: "Rising, but at a slower rate than expected for a typical early intrauterine pregnancy",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A suboptimal rise over 48 hours further supports a pregnancy that isn't developing normally in the uterus, adding to the ectopic concern alongside the ultrasound.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "urinalysis",
      name: "Urinalysis",
      category: "Labs",
      resultText: "No evidence of infection, trace blood only",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A reasonable check to exclude a urinary source of pain, but it's low-yield here given the pattern already pointing toward a gynecologic cause.",
      invasive: false,
      costNote: "low cost",
    },
  ],
  stages: [
    { key: "brief", label: "Brief" },
    { key: "interview", label: "Interview" },
    { key: "evidence", label: "Evidence" },
    { key: "interpretation", label: "Interpretation" },
    { key: "reasoning", label: "Reasoning" },
    { key: "plan", label: "Plan" },
    { key: "event", label: "Follow-up" },
    { key: "debrief", label: "Debrief" },
  ],
  interpretationQuestions: [
    {
      id: "interp-1",
      type: "mcq",
      display: "dropdown",
      prompt: "The hCG level, absence of an intrauterine pregnancy on ultrasound, and right adnexal mass together are most consistent with:",
      options: [
        "Suspected ectopic pregnancy",
        "Normal early intrauterine pregnancy, too early to see on ultrasound",
        "Ovarian cyst unrelated to the pregnancy",
        "Urinary tract infection",
      ],
      correctIndex: 0,
      rationale:
        "At this hCG level, an intrauterine pregnancy should generally be visible on transvaginal ultrasound if present. Its absence together with a right adnexal mass and free pelvic fluid is the classic pattern for a suspected ectopic pregnancy, which needs to be assumed and urgently evaluated until clearly excluded.",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which findings support urgent evaluation for a possible ectopic pregnancy rather than reassurance? (select all that apply)",
      options: [
        "No intrauterine pregnancy seen despite an hCG level where one should be visible",
        "Right adnexal mass on ultrasound",
        "Small amount of free pelvic fluid on ultrasound",
        "Stable repeat vital signs",
        "Suboptimal hCG rise at 48 hours",
      ],
      correctIndices: [0, 1, 2, 4],
      partialCredit: true,
      rationale:
        "Each of these ultrasound and hCG findings supports the ectopic concern. Stable vital signs are reassuring about her current hemodynamic status, but they don't rule out an ectopic pregnancy — they just mean she isn't showing signs of acute rupture right now.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "What is the single most urgent bedside assessment in any suspected ectopic pregnancy?",
      options: [
        "Hemodynamic stability (vital signs, signs of internal bleeding)",
        "Dietary history",
        "Family history of twins",
        "Blood type alone",
      ],
      correctIndex: 0,
      rationale: "A ruptured ectopic pregnancy can cause rapid internal bleeding, so hemodynamic stability determines how urgently intervention is needed.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "Why is an hCG level interpreted together with ultrasound findings rather than alone?",
      options: [
        "Because at a given hCG level, an intrauterine pregnancy should typically be visible if it's there",
        "Because hCG levels are always inaccurate",
        "Because ultrasound cannot detect early pregnancy at all",
        "Because hCG only matters after 20 weeks",
      ],
      correctIndex: 0,
      rationale: "Comparing the hCG level to what should be visible on ultrasound at that level is how a mismatch — a clue to ectopic location — is identified.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "Why does Rh status matter in a patient with bleeding in early pregnancy?",
      options: [
        "An Rh-negative patient may need Rh immune globulin to prevent future sensitization",
        "It determines the sex of the pregnancy",
        "It has no bearing on pregnancy care",
        "It only matters in the third trimester",
      ],
      correctIndex: 0,
      rationale: "Any bleeding event in an Rh-negative pregnant patient raises the question of Rh immune globulin to prevent sensitization that could affect future pregnancies.",
    },
  ],
  conclusionOptions: [
    "Suspected ectopic pregnancy",
    "Normal early intrauterine pregnancy",
    "Isolated ovarian cyst unrelated to pregnancy",
    "Urinary tract infection",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Before the ultrasound and hCG trend came back, which of these were reasonable alternative explanations to keep on the differential? (select all that apply)",
    options: [
      "Normal early intrauterine pregnancy, just too early to visualize",
      "Threatened miscarriage with a normally located pregnancy",
      "Ovarian cyst, possibly ruptured or hemorrhagic",
      "Urinary tract infection",
      "Appendicitis",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    partialCredit: true,
    rationale:
      "Each of these can present with early pregnancy pain and spotting, or pain alone with a coincidental positive pregnancy test, and was reasonable to consider before imaging and hCG trending narrowed the picture toward a suspected ectopic pregnancy.",
  },
  confidenceQuestion: {
    id: "confidence-1",
    type: "confidence",
    prompt: "Before seeing the debrief, how confident are you in this diagnosis?",
  },
  changeMyMindQuestion: {
    id: "change-mind-1",
    type: "short-text",
    prompt: "What single finding, if present, would most change your diagnosis?",
    rubricKeywords: [
      "intrauterine pregnancy seen",
      "normal rise",
      "no adnexal mass",
      "hemodynamically unstable",
      "appendicitis",
      "ovarian cyst",
      "ruptured cyst",
      "normal ultrasound",
    ],
    sampleAnswer:
      "If the ultrasound had clearly shown a normally located intrauterine pregnancy, I'd reconsider a threatened miscarriage instead. If she had become hemodynamically unstable, that would immediately escalate this to a surgical emergency rather than an outpatient workup.",
    rationale:
      "The location of the pregnancy on ultrasound and her hemodynamic status are the two findings that most change both the diagnosis and the urgency of the response.",
  },
  planPrompt: {
    label: "Treatment plan",
    placeholder: "What would you recommend next for Nina?",
    safetyChecklist: [
      "Reassess hemodynamic stability frequently while the workup continues",
      "Involve obstetrics/gynecology promptly given suspected ectopic pregnancy",
      "Address Rh status and consider Rh immune globulin given her blood type",
      "Counsel her clearly and compassionately about the diagnosis and its urgency",
      "Arrange close follow-up of hCG trend and repeat imaging as needed",
    ],
    rubricKeywords: [
      "obstetrics",
      "gynecology",
      "ectopic",
      "hemodynamic",
      "rh immune globulin",
      "monitor",
      "counsel",
      "follow-up",
      "hcg trend",
      "ultrasound",
      "escalate",
    ],
    sampleAnswer:
      "Involve obstetrics/gynecology promptly given the suspected ectopic pregnancy, and continue to monitor her hemodynamic status closely while definitive management is arranged. Address her Rh-negative status with consideration of Rh immune globulin. Counsel Nina clearly and compassionately about the diagnosis, the reasoning behind it, and why prompt evaluation matters, and arrange close follow-up of her hCG trend and repeat imaging if management is expectant or medical rather than surgical. This is general reasoning for a learning exercise, not patient-specific treatment guidance.",
  },
  unfoldingEvent: null,
  debrief: {
    correctConclusionLabel: "Diagnosis",
    correctConclusion: "Suspected ectopic pregnancy",
    conclusionExplanation:
      "Nina's hCG level is high enough that an intrauterine pregnancy should typically be visible on transvaginal ultrasound if it were there. Its absence, combined with a right adnexal mass and a small amount of free pelvic fluid, is the classic pattern for a suspected ectopic pregnancy. Her stable vital signs are reassuring about her current status but don't exclude the diagnosis — only further evaluation and close monitoring can do that.",
    keyConsiderations: [
      "An hCG level is most useful when interpreted against what ultrasound should be able to show at that level, not in isolation",
      "Hemodynamic stability must be reassessed repeatedly, not just checked once, since an ectopic pregnancy can change status quickly",
      "A prior pelvic infection is a recognized risk factor worth asking about directly",
      "Rh status matters in any pregnant patient with bleeding, regardless of the final diagnosis",
    ],
    recommendedAction:
      "Involve obstetrics/gynecology promptly, continue close hemodynamic monitoring, address Rh status, and counsel Nina clearly and compassionately while definitive management is arranged.",
    goodOutcome:
      "With prompt recognition and obstetric involvement, Nina's suspected ectopic pregnancy is managed before any rupture occurs, preserving her health and future fertility options.",
    badOutcome:
      "If the mismatch between her hCG level and ultrasound findings is dismissed as reassuring, a true ectopic pregnancy could progress to rupture and significant internal bleeding, a genuine emergency.",
    nextLearningGoalHint:
      "Next, try a case involving postpartum hemorrhage to practice recognizing a different reproductive health emergency and its priority nursing or clinical response.",
  },
};
