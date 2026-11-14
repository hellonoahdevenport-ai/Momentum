export interface ChartField {
  id: string;
  label: string;
  placeholder: string;
  rubricKeywords: string[];
  guidance: string;
}

export interface ChartScenario {
  id: string;
  title: string;
  format: string;
  snapshot: string;
  fields: ChartField[];
}

export interface ChartScenarioPublic {
  id: string;
  title: string;
  format: string;
  snapshot: string;
  fields: { id: string; label: string; placeholder: string }[];
}

export interface ChartFieldFeedback {
  id: string;
  label: string;
  status: "covered" | "partial" | "not_yet";
  guidance: string;
}

export interface ChartFeedback {
  perField: ChartFieldFeedback[];
  coveredCount: number;
  totalFields: number;
}
