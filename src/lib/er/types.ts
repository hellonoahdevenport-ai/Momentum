export interface ErOrder {
  id: string;
  label: string;
  category: string;
  correct: boolean;
  critical: boolean;
  harmful: boolean;
  rationale: string;
}

export interface ErScenario {
  id: string;
  title: string;
  patientSummary: string;
  snapshotFacts: { label: string; value: string }[];
  timeLimitSeconds: number;
  orderCategories: string[];
  orderCatalog: ErOrder[];
  successOutcome: string;
  failureOutcome: string;
  keyConsiderations: string[];
}

export interface ErScenarioPublic {
  id: string;
  title: string;
  patientSummary: string;
  snapshotFacts: { label: string; value: string }[];
  timeLimitSeconds: number;
  orderCategories: string[];
  orderCatalog: { id: string; label: string; category: string }[];
}

export interface ErOutcome {
  criticalHit: number;
  criticalTotal: number;
  correctExtraHit: number;
  harmfulHit: number;
  timeUsedSeconds: number;
  withinTime: boolean;
  stabilized: boolean;
  outcomeText: string;
  keyConsiderations: string[];
  perOrder: { id: string; label: string; chosen: boolean; correct: boolean; critical: boolean; harmful: boolean; rationale: string }[];
}
