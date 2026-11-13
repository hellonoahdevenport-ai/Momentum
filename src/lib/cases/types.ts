import type { TrackKey } from "@/lib/tracks";

export type ReviewStatus = "needs_clinical_review" | "reviewed";

export interface SourceCitation {
  title: string;
  owner: string;
  url: string;
  versionOrDate: string;
}

export interface CaseMeta {
  id: string;
  version: string;
  title: string;
  trackKey: TrackKey;
  unitKey: string;
  author: string;
  reviewers: { name: string; credentials: string }[];
  reviewStatus: ReviewStatus;
  reviewDate: string | null;
  nextReviewDate: string | null;
  sources: SourceCitation[];
  learningObjectives: string[];
  targetLevel: string;
  estimatedMinutes: number;
  contentWarning: string | null;
}

export interface SnapshotFact {
  label: string;
  value: string;
}

export interface InterviewTopic {
  id: string;
  category: string;
  triggerKeywords: string[];
  factText: string;
  openingLine?: boolean;
}

export type EvidenceResultFlag = "normal" | "abnormal" | "critical";

export interface EvidenceItem {
  id: string;
  name: string;
  category: string;
  resultText: string;
  referenceRange: string | null;
  resultFlag: EvidenceResultFlag;
  significant: boolean;
  teachingNote: string;
  invasive: boolean;
  costNote: "low cost" | "moderate cost" | "higher cost";
}

export type EvidencePublic = Pick<EvidenceItem, "id" | "name" | "category" | "invasive" | "costNote">;
export type EvidenceResult = Pick<
  EvidenceItem,
  "id" | "resultText" | "referenceRange" | "resultFlag" | "significant" | "teachingNote"
>;

export interface CaseStage {
  key: "brief" | "interview" | "evidence" | "interpretation" | "reasoning" | "plan" | "event" | "debrief";
  label: string;
}

export interface McqQuestion {
  id: string;
  type: "mcq";
  display: "radio" | "dropdown";
  prompt: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

export interface MultiSelectQuestion {
  id: string;
  type: "multi-select";
  prompt: string;
  options: string[];
  correctIndices: number[];
  partialCredit: boolean;
  rationale: string;
}

export interface RankingQuestion {
  id: string;
  type: "ranking";
  prompt: string;
  items: string[];
  correctOrder: string[];
  rationale: string;
}

export interface ConfidenceQuestion {
  id: string;
  type: "confidence";
  prompt: string;
}

export interface ShortTextQuestion {
  id: string;
  type: "short-text";
  prompt: string;
  rubricKeywords: string[];
  sampleAnswer: string;
  rationale: string;
}

export type Question = McqQuestion | MultiSelectQuestion | RankingQuestion | ConfidenceQuestion | ShortTextQuestion;
export type GradableQuestion = McqQuestion | MultiSelectQuestion | RankingQuestion | ShortTextQuestion;

export type QuestionPublic =
  | Omit<McqQuestion, "correctIndex" | "rationale">
  | Omit<MultiSelectQuestion, "correctIndices" | "rationale">
  | Omit<RankingQuestion, "correctOrder" | "rationale">
  | ConfidenceQuestion
  | Omit<ShortTextQuestion, "rubricKeywords" | "sampleAnswer" | "rationale">;

export interface PlanPrompt {
  label: string;
  placeholder: string;
  safetyChecklist: string[];
  rubricKeywords: string[];
  sampleAnswer: string;
}

export type PlanPromptPublic = Pick<PlanPrompt, "label" | "placeholder" | "safetyChecklist">;

export interface UnfoldingEvent {
  trigger: string;
  prompt: string;
  choices: { id: string; label: string; isSaferChoice: boolean; consequence: string }[];
}

export type UnfoldingEventPublic = Pick<UnfoldingEvent, "prompt"> & {
  choices: { id: string; label: string }[];
};

export interface DebriefContent {
  correctConclusionLabel: string;
  correctConclusion: string;
  conclusionExplanation: string;
  keyConsiderations: string[];
  recommendedAction: string;
  goodOutcome: string;
  badOutcome: string;
  nextLearningGoalHint: string;
}

export interface CaseFile {
  meta: CaseMeta;
  conclusionLabel: string;
  actionLabel: string;
  patient: {
    name: string;
    age: number;
    pronouns: string;
    summary: string;
  };
  presentingIssue: string;
  snapshotFacts: SnapshotFact[];
  initialAssessment: string;
  interviewTopics: InterviewTopic[];
  evidenceCategories: string[];
  evidenceCatalog: EvidenceItem[];
  stages: CaseStage[];
  interpretationQuestions: (McqQuestion | MultiSelectQuestion | RankingQuestion)[];
  quizQuestions: McqQuestion[];
  conclusionOptions: string[];
  correctConclusionIndex: number;
  differentialQuestion: MultiSelectQuestion;
  confidenceQuestion: ConfidenceQuestion;
  changeMyMindQuestion: ShortTextQuestion;
  planPrompt: PlanPrompt;
  unfoldingEvent: UnfoldingEvent | null;
  debrief: DebriefContent;
}

export interface CasePublicView {
  meta: Omit<CaseMeta, "reviewers" | "sources"> & { sourceCount: number };
  conclusionLabel: string;
  actionLabel: string;
  patient: CaseFile["patient"];
  presentingIssue: string;
  snapshotFacts: SnapshotFact[];
  initialAssessment: string;
  evidenceCategories: string[];
  evidenceCatalog: EvidencePublic[];
  stages: CaseStage[];
  interpretationQuestions: QuestionPublic[];
  conclusionOptions: string[];
  differentialOptions: string[];
  planPrompt: PlanPromptPublic;
  unfoldingEvent: UnfoldingEventPublic | null;
}

export interface GradedQuestionResult {
  id: string;
  correct: boolean;
  score: number;
  rationale: string;
}

export interface InterpretationGradeResult {
  perQuestion: GradedQuestionResult[];
  score: number;
}

export interface ReasoningPlanSubmission {
  conclusionChoiceIndex: number;
  differentialChoiceIndices: number[];
  confidence: number;
  changeMyMindText: string;
  planText: string;
  eventChoiceId: string | null;
}

export interface DebriefResult {
  conclusionCorrect: boolean;
  differentialScore: number;
  planScore: number;
  planFeedback: string;
  missedConsiderations: string[];
  overallScore: number;
  verdict: "strong" | "developing" | "needs_review";
  calibration: "well_calibrated" | "overconfident" | "underconfident" | "unknown";
  eventConsequence: string | null;
  content: DebriefContent;
}
