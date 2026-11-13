export type TrackKey = "medicine" | "nursing";

export interface SnapshotFact {
  label: string;
  value: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  category: string;
  result: string;
  significant: boolean;
}

export interface CaseData {
  subjectName: string;
  subjectSummary: string;
  presentingIssue: string;
  snapshotFacts: SnapshotFact[];
  backgroundFacts: string[];
  initialAssessment: string;
  conclusion: string;
  conclusionOptions: string[];
  conclusionExplanation: string;
  keyConsiderations: string[];
  evidenceItems: EvidenceItem[];
  recommendedAction: string;
  goodOutcome: string;
  badOutcome: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface GradeResult {
  actionScore: number;
  actionFeedback: string;
  evidenceFeedback: string;
  missedConsiderations: string[];
  outcome: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UnitProgress {
  attempts: number;
  best: number;
}

export type TrackProgress = Record<string, UnitProgress>;
export type AllProgress = Partial<Record<TrackKey, TrackProgress>>;
