import type { CaseFile, CasePublicView, QuestionPublic } from "./types";

function stripQuestion(q: CaseFile["interpretationQuestions"][number]): QuestionPublic {
  if (q.type === "mcq") {
    const { correctIndex, rationale, ...rest } = q;
    void correctIndex;
    void rationale;
    return rest;
  }
  if (q.type === "ranking") {
    const { correctOrder, rationale, ...rest } = q;
    void correctOrder;
    void rationale;
    return rest;
  }
  const { correctIndices, rationale, ...rest } = q;
  void correctIndices;
  void rationale;
  return rest;
}

/** Strips every answer-bearing field out of a CaseFile so it's safe to pass
 * to a client component before the debrief. */
export function toPublicView(caseFile: CaseFile): CasePublicView {
  return {
    meta: {
      id: caseFile.meta.id,
      version: caseFile.meta.version,
      title: caseFile.meta.title,
      trackKey: caseFile.meta.trackKey,
      unitKey: caseFile.meta.unitKey,
      author: caseFile.meta.author,
      reviewStatus: caseFile.meta.reviewStatus,
      reviewDate: caseFile.meta.reviewDate,
      nextReviewDate: caseFile.meta.nextReviewDate,
      learningObjectives: caseFile.meta.learningObjectives,
      targetLevel: caseFile.meta.targetLevel,
      estimatedMinutes: caseFile.meta.estimatedMinutes,
      contentWarning: caseFile.meta.contentWarning,
      sourceCount: caseFile.meta.sources.length,
    },
    conclusionLabel: caseFile.conclusionLabel,
    actionLabel: caseFile.actionLabel,
    patient: caseFile.patient,
    presentingIssue: caseFile.presentingIssue,
    snapshotFacts: caseFile.snapshotFacts,
    initialAssessment: caseFile.initialAssessment,
    examFindings: caseFile.examFindings,
    evidenceCategories: caseFile.evidenceCategories,
    evidenceCatalog: caseFile.evidenceCatalog.map((e) => ({
      id: e.id,
      name: e.name,
      category: e.category,
      invasive: e.invasive,
      costNote: e.costNote,
    })),
    stages: caseFile.stages,
    interpretationQuestions: caseFile.interpretationQuestions.map(stripQuestion),
    conclusionOptions: caseFile.conclusionOptions,
    differentialOptions: caseFile.differentialQuestion.options,
    planPrompt: {
      label: caseFile.planPrompt.label,
      placeholder: caseFile.planPrompt.placeholder,
      safetyChecklist: caseFile.planPrompt.safetyChecklist,
    },
    unfoldingEvent: caseFile.unfoldingEvent
      ? {
          prompt: caseFile.unfoldingEvent.prompt,
          choices: caseFile.unfoldingEvent.choices.map((c) => ({ id: c.id, label: c.label })),
        }
      : null,
  };
}
