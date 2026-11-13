import type { CaseFile } from "./types";

/**
 * Fictional case for educational simulation only. Not a substitute for
 * supervision, local policy, clinical judgment, or professional care.
 * Content status: needs_clinical_review — not yet checked by a licensed
 * clinician or nursing faculty member. Do not present as validated.
 */
export const mayaChenCase: CaseFile = {
  meta: {
    id: "maya-chen-iron-deficiency-anemia",
    version: "1.0.0",
    title: "Maya Chen: Fatigue and Shortness of Breath",
    trackKey: "medicine",
    unitKey: "blood-immune",
    author: "Casebook content team (fictional case; educational use only)",
    reviewers: [],
    reviewStatus: "needs_clinical_review",
    reviewDate: null,
    nextReviewDate: null,
    sources: [
      {
        title: "Iron deficiency anemia — overview",
        owner: "StatPearls / NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/",
        versionOrDate: "Specific chapter citation pending verification at clinical review",
      },
      {
        title: "Iron Deficiency Anemia (Professional)",
        owner: "Merck Manuals",
        url: "https://www.merckmanuals.com/professional",
        versionOrDate: "Specific page citation pending verification at clinical review",
      },
    ],
    learningObjectives: [
      "Take a focused history that elicits menstrual bleeding and dietary risk factors for iron deficiency",
      "Select a cost-aware workup for microcytic anemia and interpret CBC, ferritin, and iron studies together",
      "Distinguish iron deficiency anemia from thalassemia trait, anemia of chronic disease, and B12/folate deficiency",
      "Build a management plan that treats the deficiency and addresses its source",
    ],
    targetLevel: "Foundations / Step 1-aligned, early clinical skills",
    estimatedMinutes: 20,
    contentWarning: null,
  },
  conclusionLabel: "Diagnosis",
  actionLabel: "Treatment plan",
  patient: {
    name: "Maya Chen",
    age: 24,
    pronouns: "she/her",
    summary: "24-year-old graduate student, previously healthy",
  },
  presentingIssue: "Six weeks of fatigue and shortness of breath on exertion.",
  snapshotFacts: [
    { label: "BP", value: "108/68 mmHg" },
    { label: "HR", value: "102 bpm" },
    { label: "RR", value: "16/min" },
    { label: "Temp", value: "98.4°F" },
    { label: "SpO2", value: "98% room air" },
  ],
  initialAssessment:
    "Maya appears mildly pale. Conjunctival pallor is noted on exam. Heart rate is mildly elevated; rhythm is regular with no murmur. Lungs are clear. Abdomen is soft and non-tender, no organomegaly. No jaundice or lymphadenopathy.",
  interviewTopics: [
    {
      id: "opening",
      category: "HPI",
      triggerKeywords: [],
      openingLine: true,
      factText:
        "I've just been so tired for like six weeks now — it's hard to get through the day, and lately I get out of breath just going up a flight of stairs, which never used to happen.",
    },
    {
      id: "onset-course",
      category: "HPI",
      triggerKeywords: ["when", "start", "began", "onset", "how long", "worse", "course"],
      factText:
        "It crept up gradually over about six weeks — I didn't notice it right away, but now it's pretty constant, and it's definitely gotten a little worse, not better.",
    },
    {
      id: "exertion",
      category: "HPI",
      triggerKeywords: ["exercise", "exertion", "stairs", "breath", "dizzy", "lightheaded", "running", "activity"],
      factText:
        "I get short of breath with stairs or if I try to jog, which is new for me. I've also felt a little lightheaded a couple of times when I stand up quickly.",
    },
    {
      id: "diet",
      category: "Social",
      triggerKeywords: ["diet", "eat", "food", "vegetarian", "vegan", "meat", "nutrition"],
      factText:
        "I've been vegetarian for about two years now — I don't eat red meat or much meat at all, mostly grains, beans, vegetables, that kind of thing.",
    },
    {
      id: "menstrual",
      category: "Gynecologic",
      triggerKeywords: ["period", "menstrual", "cycle", "bleeding", "flow", "pad", "tampon", "gynecologic", "menorrhagia"],
      factText:
        "My periods have actually been pretty heavy the last several months — on the heaviest days I'm changing a pad every hour or two, and they're lasting almost a week now.",
    },
    {
      id: "gi-bleed",
      category: "GI",
      triggerKeywords: ["stool", "bowel", "blood", "black", "tarry", "abdominal pain", "stomach"],
      factText:
        "No, I haven't noticed any blood in my stool or anything like that, and my stomach's been fine — no pain.",
    },
    {
      id: "pmh",
      category: "PMH",
      triggerKeywords: ["history", "medical history", "conditions", "illness", "anemia before", "hospitalized"],
      factText:
        "I've never been told I was anemic before, and I don't have any ongoing medical conditions that I know of. This is really the first time I've felt like something's actually wrong.",
    },
    {
      id: "meds",
      category: "Medications",
      triggerKeywords: ["medication", "meds", "supplement", "vitamin", "ibuprofen", "pills", "taking"],
      factText:
        "I take a multivitamin most days, and I'll take ibuprofen every once in a while for cramps, but nothing regular beyond that.",
    },
    {
      id: "allergies",
      category: "Allergies",
      triggerKeywords: ["allergy", "allergic", "allergies"],
      factText: "No allergies that I know of.",
    },
    {
      id: "family",
      category: "Family history",
      triggerKeywords: ["family", "mother", "father", "sibling", "genetic", "hereditary"],
      factText:
        "My mom has some kind of thyroid issue, I think, but I don't know much else. No one in my family has had anemia or a blood disorder that I know of.",
    },
    {
      id: "social-training",
      category: "Social",
      triggerKeywords: ["training", "exercise routine", "stress", "school", "sleep", "lifestyle", "athlete"],
      factText:
        "Grad school's been stressful, honestly, and I actually started training for a half marathon a couple months ago — though the tiredness has been a lot more than I'd expect just from that.",
    },
    {
      id: "pica",
      category: "ROS",
      triggerKeywords: ["craving", "crave", "ice", "chew", "pica", "appetite"],
      factText:
        "This is a weird one, but I've been craving chewing on ice constantly the last month or so — my roommate's started teasing me about it.",
    },
    {
      id: "hair-nails",
      category: "ROS",
      triggerKeywords: ["hair", "nail", "nails", "skin", "brittle"],
      factText:
        "My hair's felt like it's thinning a bit and my nails have gotten brittle, now that you mention it — I figured it was just stress.",
    },
    {
      id: "restless-legs",
      category: "ROS",
      triggerKeywords: ["legs", "restless", "sleep", "night", "crawling"],
      factText:
        "Sometimes at night my legs feel restless, like I have to move them — it's annoying when I'm trying to fall asleep.",
    },
  ],
  evidenceCategories: ["Labs", "Imaging", "Bedside"],
  evidenceCatalog: [
    {
      id: "cbc",
      name: "CBC with differential",
      category: "Labs",
      resultText: "Hgb 9.8 g/dL, MCV 72 fL, platelets and WBC normal",
      referenceRange: "Hgb 12.0–15.5 g/dL, MCV 80–100 fL",
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "The core screening test. A low Hgb with a low MCV points toward a microcytic anemia.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "ferritin",
      name: "Ferritin",
      category: "Labs",
      resultText: "8 ng/mL (low)",
      referenceRange: "15–150 ng/mL",
      resultFlag: "critical",
      significant: true,
      teachingNote: "The single most specific routine test for iron deficiency — a low value is rarely caused by anything else.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "iron-studies",
      name: "Serum iron, TIBC, % saturation",
      category: "Labs",
      resultText: "Serum iron low, TIBC elevated, transferrin saturation low",
      referenceRange: "Varies by lab; low saturation (<15–20%) with high TIBC is the classic iron-deficiency pattern",
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Confirms the ferritin pattern. Elevated TIBC reflects the body upregulating iron-binding capacity when iron is scarce.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "reticulocyte",
      name: "Reticulocyte count",
      category: "Labs",
      resultText: "Low-normal, inadequately elevated for the degree of anemia",
      referenceRange: "0.5–2.5% (an elevated, 'brisk' response is expected after acute blood loss or hemolysis)",
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A blunted response here fits a marrow that lacks the iron to respond, rather than a brisk bleed or hemolysis.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "smear",
      name: "Peripheral blood smear",
      category: "Labs",
      resultText: "Microcytic, hypochromic red cells; occasional pencil cells",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "A quick, low-cost way to visually confirm the microcytic pattern and look for clues to other causes.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "tsh",
      name: "TSH",
      category: "Labs",
      resultText: "Normal",
      referenceRange: "0.4–4.0 mIU/L",
      resultFlag: "normal",
      significant: false,
      teachingNote: "Reasonable to check given the family history of thyroid disease and the fatigue — low-yield here, but it meaningfully narrows the differential by excluding a mimicking cause.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "fobt",
      name: "Stool occult blood test",
      category: "Labs",
      resultText: "Negative",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A negative screen makes an occult GI bleed less likely as the source, though it doesn't fully exclude one — menstrual loss remains the more supported source here.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "hb-electrophoresis",
      name: "Hemoglobin electrophoresis",
      category: "Labs",
      resultText: "Normal pattern",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "Reasonable to consider for any microcytic anemia, but lower-yield once ferritin already confirms iron deficiency — useful mainly if the iron studies had been equivocal.",
      invasive: false,
      costNote: "moderate cost",
    },
    {
      id: "b12-folate",
      name: "Vitamin B12 and folate",
      category: "Labs",
      resultText: "Both normal",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "B12/folate deficiency causes a macrocytic (high MCV) anemia, not the microcytic picture seen here — ordering it is defensible but low-yield given the MCV already points elsewhere.",
      invasive: false,
      costNote: "moderate cost",
    },
    {
      id: "pelvic-us",
      name: "Pelvic ultrasound",
      category: "Imaging",
      resultText: "No fibroids or structural abnormality identified",
      referenceRange: null,
      resultFlag: "normal",
      significant: false,
      teachingNote: "A reasonable next step given the heavy menstrual bleeding history to look for a structural cause; normal here doesn't rule out hormonal causes of heavy bleeding.",
      invasive: false,
      costNote: "higher cost",
    },
    {
      id: "orthostatics",
      name: "Orthostatic vital signs",
      category: "Bedside",
      resultText: "Mild heart-rate rise on standing without a significant blood pressure drop",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Free and fast. A mild compensatory rise fits a chronically adapted, non-acute anemia rather than acute large-volume blood loss.",
      invasive: false,
      costNote: "low cost",
    },
    {
      id: "nail-exam",
      name: "Focused nail bed and conjunctival exam",
      category: "Bedside",
      resultText: "Koilonychia (spoon-shaped nails) noted; conjunctival pallor confirmed",
      referenceRange: null,
      resultFlag: "abnormal",
      significant: true,
      teachingNote: "Koilonychia is a classic, if not universal, physical sign of iron deficiency and costs nothing to look for.",
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
      prompt: "The CBC and iron studies together are most consistent with:",
      options: [
        "Iron deficiency anemia",
        "Anemia of chronic disease",
        "Thalassemia trait",
        "Vitamin B12 deficiency anemia",
      ],
      correctIndex: 0,
      rationale:
        "A low ferritin is highly specific for depleted iron stores. Thalassemia trait usually shows normal or high ferritin and often a family history; B12 deficiency causes a macrocytic, not microcytic, anemia.",
    },
    {
      id: "interp-2",
      type: "multi-select",
      prompt:
        "Which findings support an iron-deficiency picture rather than another cause of microcytic anemia? (select all that apply)",
      options: [
        "Low ferritin",
        "Normal hemoglobin electrophoresis",
        "Craving to chew ice (pica)",
        "Elevated TIBC",
        "Family history of thalassemia",
        "Normal TSH",
      ],
      correctIndices: [0, 1, 2, 3],
      partialCredit: true,
      rationale:
        "Low ferritin and elevated TIBC are the classic iron-deficiency lab pattern; pica is a classic clinical clue. A normal electrophoresis helps exclude thalassemia as the explanation for the microcytosis. There is no family history of thalassemia here, and a normal TSH rules out a mimicking cause rather than supporting iron deficiency itself.",
    },
    {
      id: "interp-3",
      type: "ranking",
      prompt:
        "You're explaining your workup to a supervising clinician. Rank these from the most to the least specific evidence for iron deficiency anemia specifically.",
      items: [
        "Low ferritin",
        "Low hemoglobin with low MCV",
        "Craving to chew ice (pica)",
      ],
      correctOrder: ["Low ferritin", "Low hemoglobin with low MCV", "Craving to chew ice (pica)"],
      rationale:
        "Ferritin is the most specific single test for iron deficiency. A microcytic anemia narrows things to a category of causes, not just one. Pica is a classic but inconsistent clinical clue — useful, but the least specific of the three on its own.",
    },
  ],
  quizQuestions: [
    {
      id: "quiz-1",
      type: "mcq",
      display: "radio",
      prompt: "Which single lab value is the most specific routine test for iron deficiency?",
      options: ["Ferritin", "Hemoglobin", "MCV", "Reticulocyte count"],
      correctIndex: 0,
      rationale: "Ferritin reflects total body iron stores directly; a low value is rarely explained by anything else.",
    },
    {
      id: "quiz-2",
      type: "mcq",
      display: "radio",
      prompt: "Pica (craving to chew ice) is a classic clinical clue most associated with:",
      options: ["Iron deficiency", "Vitamin B12 deficiency", "Hyperthyroidism", "Dehydration alone"],
      correctIndex: 0,
      rationale: "Pagophagia (ice craving) is a classically described, if inconsistent, sign of iron deficiency.",
    },
    {
      id: "quiz-3",
      type: "mcq",
      display: "radio",
      prompt: "A plan that treats the anemia but never asks about heavy menstrual bleeding is missing:",
      options: [
        "Addressing the likely source of ongoing blood loss",
        "Any need for a follow-up visit",
        "A diet recommendation",
        "A medication at all",
      ],
      correctIndex: 0,
      rationale: "Treating the deficiency without addressing its source risks the anemia recurring.",
    },
  ],
  conclusionOptions: [
    "Iron deficiency anemia due to menstrual blood loss and dietary intake",
    "Anemia of chronic disease",
    "Beta-thalassemia trait",
    "Vitamin B12 deficiency anemia",
  ],
  correctConclusionIndex: 0,
  differentialQuestion: {
    id: "differential-1",
    type: "multi-select",
    prompt:
      "Before the ferritin and iron studies came back, which of these were reasonable alternative explanations to keep on the differential? (select all that apply)",
    options: [
      "Occult GI bleeding",
      "Thalassemia trait",
      "Anemia of chronic disease",
      "Vitamin B12 / folate deficiency",
      "Hypothyroidism-related fatigue",
    ],
    correctIndices: [0, 1, 2, 3, 4],
    partialCredit: true,
    rationale:
      "Good diagnostic reasoning keeps a broad differential early and narrows it as data arrives. Each of these was a reasonable explanation for fatigue with anemia or fatigue alone before targeted testing ruled most of them out.",
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
      "ferritin normal",
      "ferritin high",
      "electrophoresis",
      "thalassemia",
      "family history",
      "hemolysis",
      "blood in stool",
      "gi bleed",
      "reticulocyte elevated",
      "chronic disease",
    ],
    sampleAnswer:
      "If ferritin had come back normal or high despite the microcytic anemia, or if the hemoglobin electrophoresis showed a thalassemia pattern, I'd reconsider thalassemia trait or anemia of chronic disease instead of simple iron deficiency.",
    rationale:
      "Ferritin and the electrophoresis are the two results doing the most work to distinguish iron deficiency from its closest mimics.",
  },
  planPrompt: {
    label: "Treatment plan",
    placeholder: "What would you recommend next for Maya?",
    safetyChecklist: [
      "Confirm there's no active or heavier bleeding needing urgent referral",
      "Start oral iron replacement and counsel on absorption and side effects",
      "Address the source of ongoing blood loss (menstrual) with an appropriate referral",
      "Arrange follow-up labs to confirm a response",
      "Counsel on diet",
    ],
    rubricKeywords: [
      "oral iron",
      "ferrous sulfate",
      "diet",
      "follow-up",
      "recheck",
      "gynecology",
      "referral",
      "menstrual",
      "vitamin c",
      "constipation",
      "side effect",
    ],
    sampleAnswer:
      "Start oral iron supplementation and counsel on taking it with vitamin C and apart from calcium or antacids, and warn about common GI side effects like constipation and dark stools. Address the source of ongoing blood loss by referring Maya to her primary care clinician or gynecology for evaluation of heavy menstrual bleeding. Recommend dietary counseling to increase iron-rich foods given her vegetarian diet. Arrange a follow-up CBC and reticulocyte count in a few weeks to confirm a response, and plan to continue iron for a few months after the hemoglobin normalizes to rebuild stores. This is general reasoning for a learning exercise, not patient-specific dosing guidance.",
  },
  unfoldingEvent: {
    trigger: "after-plan",
    prompt:
      "Two weeks later, Maya calls the clinic saying she stopped taking her iron because of stomach upset and constipation.",
    choices: [
      {
        id: "a",
        label: "Advise switching to every-other-day dosing, taking it with food, and continuing iron",
        isSaferChoice: true,
        consequence:
          "Maya tolerates the adjusted regimen well, and her fatigue gradually improves. Follow-up labs at four weeks show a rising hemoglobin and reticulocyte count.",
      },
      {
        id: "b",
        label: "Advise stopping iron until her symptoms resolve, and reassess at the next visit",
        isSaferChoice: false,
        consequence:
          "Without iron, Maya's anemia doesn't improve. She returns in six weeks with worsening fatigue and a lower hemoglobin, having lost valuable treatment time.",
      },
      {
        id: "c",
        label: "Switch straight to IV iron without first trying an oral dosing adjustment",
        isSaferChoice: false,
        consequence:
          "IV iron is effective, but skipping a reasonable, lower-cost oral adjustment first means an unnecessary infusion visit and exposes Maya to a rare infusion-reaction risk that a simpler change might have avoided.",
      },
    ],
  },
  debrief: {
    correctConclusionLabel: "Diagnosis",
    correctConclusion: "Iron deficiency anemia, most likely from combined menstrual blood loss and a vegetarian diet",
    conclusionExplanation:
      "Maya's microcytic anemia (low MCV) with a low ferritin is the most specific pattern for iron deficiency — ferritin is technically an acute-phase reactant, but a low value is still highly specific for depleted iron stores. Her heavy menstrual bleeding and vegetarian diet are a plausible combined source of ongoing iron loss and inadequate intake, and her pica for ice and spoon-shaped nails are classic, if not universal, findings in iron deficiency.",
    keyConsiderations: [
      "Ask specifically about menstrual bleeding volume — it's frequently under-reported unless asked about directly",
      "A low ferritin is the most specific single test for iron deficiency, more so than serum iron alone",
      "A normal hemoglobin electrophoresis and a normal TSH meaningfully narrow the differential rather than being 'just normal'",
      "A plan isn't complete until it addresses the source of ongoing blood loss, not just the anemia itself",
    ],
    recommendedAction:
      "Start oral iron, counsel on absorption and side effects, refer for evaluation of the heavy menstrual bleeding, counsel on diet, and arrange follow-up labs to confirm a response.",
    goodOutcome:
      "With oral iron, dietary counseling, and a referral addressing her heavy periods, Maya's hemoglobin and energy levels gradually normalize over the following months.",
    badOutcome:
      "Without addressing the ongoing blood loss or correcting the iron deficit, Maya's fatigue persists or worsens, and she's more likely to stop a poorly tolerated supplement without follow-up.",
    nextLearningGoalHint:
      "Next, try a case where the anemia is normocytic or macrocytic to practice distinguishing other mechanisms of anemia.",
  },
};
