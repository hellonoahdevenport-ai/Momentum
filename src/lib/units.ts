export interface Unit {
  key: string;
  mono: string;
  label: string;
  color: string;
  colorDark: string;
  hint: string;
}

// Shared organ-system curriculum spine. Tier 1 for both tracks: Step 1 / Year 1.
export const UNITS: Unit[] = [
  {
    key: "foundations",
    mono: "FN",
    label: "Foundations",
    color: "#475569",
    colorDark: "#1f2937",
    hint: "a general-principles presentation spanning basic cell biology, genetics, pharmacology, or microbiology rather than one organ system",
  },
  {
    key: "blood-immune",
    mono: "BI",
    label: "Blood & Immune",
    color: "#e11d48",
    colorDark: "#881337",
    hint: "a hematologic or immune system presentation (anemia, a bleeding or clotting disorder, immunodeficiency, or an autoimmune/hypersensitivity condition)",
  },
  {
    key: "cardiovascular",
    mono: "CV",
    label: "Cardiovascular",
    color: "#ea580c",
    colorDark: "#9a3412",
    hint: "a cardiovascular presentation",
  },
  {
    key: "respiratory",
    mono: "RS",
    label: "Respiratory",
    color: "#0284c7",
    colorDark: "#075985",
    hint: "a respiratory presentation",
  },
  {
    key: "renal",
    mono: "RU",
    label: "Renal & Urinary",
    color: "#059669",
    colorDark: "#065f46",
    hint: "a renal or urinary presentation",
  },
  {
    key: "gi",
    mono: "GI",
    label: "Gastrointestinal",
    color: "#ca8a04",
    colorDark: "#854d0e",
    hint: "a gastrointestinal presentation",
  },
  {
    key: "msk",
    mono: "MS",
    label: "Musculoskeletal & Skin",
    color: "#7c3aed",
    colorDark: "#4c1d95",
    hint: "a musculoskeletal, skin, or soft-tissue presentation",
  },
  {
    key: "nervous",
    mono: "NS",
    label: "Nervous System",
    color: "#4f46e5",
    colorDark: "#312e81",
    hint: "a neurological presentation, including the special senses",
  },
  {
    key: "endocrine",
    mono: "EN",
    label: "Endocrine",
    color: "#c026d3",
    colorDark: "#701a75",
    hint: "an endocrine or metabolic presentation",
  },
  {
    key: "reproductive",
    mono: "RP",
    label: "Reproductive",
    color: "#db2777",
    colorDark: "#831843",
    hint: "a reproductive, obstetric, or breast presentation",
  },
  {
    key: "behavioral",
    mono: "BH",
    label: "Behavioral Health",
    color: "#0d9488",
    colorDark: "#115e59",
    hint: "a behavioral health, psychiatric, or psychosocial presentation",
  },
  {
    key: "multisystem",
    mono: "MX",
    label: "Multisystem",
    color: "#1e293b",
    colorDark: "#020617",
    hint: "a multisystem presentation that draws on more than one organ system at once (a capstone case)",
  },
];

export function unitByKey(key: string): Unit | undefined {
  return UNITS.find((u) => u.key === key);
}

export const PASS_THRESHOLD = 3;
