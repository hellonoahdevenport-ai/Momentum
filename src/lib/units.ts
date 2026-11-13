export interface Unit {
  key: string;
  mono: string;
  label: string;
  color: string;
  hint: string;
  /** Reference mapping for content maintainers. Casebook's own taxonomy;
   * mapped to official outlines where a case has actually been authored
   * and reviewed. Update when source documents change. */
  mapping: string;
}

// Shared organ-system / competency spine, used as Casebook's own learning
// taxonomy for both tracks. Only units with an authored, reviewed case are
// "available" in the registry — the rest are "planned" until built.
export const UNITS: Unit[] = [
  {
    key: "foundations",
    mono: "FN",
    label: "Foundations",
    color: "#4d5771",
    hint: "general principles: cell biology, genetics, pharmacology, microbiology",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "blood-immune",
    mono: "BI",
    label: "Blood & Immune",
    color: "#355cff",
    hint: "hematologic and immune system presentations",
    mapping:
      "Medicine: USMLE Step 1 outline — Hematopoietic & Lymphoreticular System (reference only). Nursing: NCSBN Physiological Adaptation (reference only).",
  },
  {
    key: "cardiovascular",
    mono: "CV",
    label: "Cardiovascular",
    color: "#ff6b4a",
    hint: "cardiovascular presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "respiratory",
    mono: "RS",
    label: "Respiratory",
    color: "#17b890",
    hint: "respiratory presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "renal",
    mono: "RU",
    label: "Renal & Urinary",
    color: "#0e8e6d",
    hint: "renal and urinary presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "gi",
    mono: "GI",
    label: "Gastrointestinal",
    color: "#c2660a",
    hint: "gastrointestinal presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "msk",
    mono: "MS",
    label: "Musculoskeletal & Skin",
    color: "#a78bfa",
    hint: "musculoskeletal, skin, and soft-tissue presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "nervous",
    mono: "NS",
    label: "Nervous System",
    color: "#1e3fd1",
    hint: "neurological presentations, including special senses",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "endocrine",
    mono: "EN",
    label: "Endocrine",
    color: "#d23c2e",
    hint: "endocrine and metabolic presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "reproductive",
    mono: "RP",
    label: "Reproductive",
    color: "#ff6b4a",
    hint: "reproductive, obstetric, and breast presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "behavioral",
    mono: "BH",
    label: "Behavioral Health",
    color: "#17b890",
    hint: "behavioral health and psychosocial presentations",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
  {
    key: "multisystem",
    mono: "MX",
    label: "Multisystem",
    color: "#172237",
    hint: "capstone presentations spanning more than one system",
    mapping: "Casebook taxonomy only — official mapping not yet reviewed.",
  },
];

export function unitByKey(key: string): Unit | undefined {
  return UNITS.find((u) => u.key === key);
}
