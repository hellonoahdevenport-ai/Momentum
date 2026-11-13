import type {
  CaseFile,
  GradedQuestionResult,
  InterpretationGradeResult,
  ReasoningPlanSubmission,
  DebriefResult,
} from "./types";

export function gradeInterpretation(
  caseFile: CaseFile,
  answers: Record<string, number | number[] | string[]>,
): InterpretationGradeResult {
  const perQuestion: GradedQuestionResult[] = caseFile.interpretationQuestions.map((q) => {
    if (q.type === "mcq") {
      const picked = answers[q.id];
      const correct = typeof picked === "number" && picked === q.correctIndex;
      return { id: q.id, correct, score: correct ? 100 : 0, rationale: q.rationale };
    }
    if (q.type === "ranking") {
      const picked = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
      const matches = q.correctOrder.filter((item, i) => picked[i] === item).length;
      const score = Math.round((matches / q.correctOrder.length) * 100);
      return { id: q.id, correct: score === 100, score, rationale: q.rationale };
    }
    const picked = Array.isArray(answers[q.id]) ? (answers[q.id] as number[]) : [];
    const correctSet = new Set(q.correctIndices);
    const pickedSet = new Set(picked);
    const hits = [...correctSet].filter((i) => pickedSet.has(i)).length;
    const misses = [...pickedSet].filter((i) => !correctSet.has(i)).length;
    const score = Math.max(0, Math.round(((hits - misses) / correctSet.size) * 100));
    const correct = hits === correctSet.size && misses === 0;
    return { id: q.id, correct, score, rationale: q.rationale };
  });
  const score = Math.round(perQuestion.reduce((sum, r) => sum + r.score, 0) / perQuestion.length);
  return { perQuestion, score };
}

function scoreMultiSelect(correctIndices: number[], picked: number[]): number {
  const correctSet = new Set(correctIndices);
  const pickedSet = new Set(picked);
  const hits = [...correctSet].filter((i) => pickedSet.has(i)).length;
  const misses = [...pickedSet].filter((i) => !correctSet.has(i)).length;
  return Math.max(0, Math.round(((hits - misses) / correctSet.size) * 100));
}

function scoreShortText(text: string, rubricKeywords: string[]): { score: number; hitKeywords: string[] } {
  const normalized = text.toLowerCase();
  const hitKeywords = rubricKeywords.filter((k) => normalized.includes(k.toLowerCase()));
  const score = rubricKeywords.length === 0 ? 0 : Math.round((hitKeywords.length / Math.min(3, rubricKeywords.length)) * 100);
  return { score: Math.min(100, score), hitKeywords };
}

export function gradeReasoningAndPlan(caseFile: CaseFile, submission: ReasoningPlanSubmission): DebriefResult {
  const conclusionCorrect = submission.conclusionChoiceIndex === caseFile.correctConclusionIndex;
  const differentialScore = scoreMultiSelect(
    caseFile.differentialQuestion.correctIndices,
    submission.differentialChoiceIndices,
  );
  const planRubric = scoreShortText(submission.planText, caseFile.planPrompt.rubricKeywords);
  const planScore = planRubric.score;

  const missedConsiderations: string[] = [];
  if (!conclusionCorrect) {
    missedConsiderations.push(
      `The leading ${caseFile.conclusionLabel.toLowerCase()} doesn't match: ${caseFile.debrief.correctConclusion}.`,
    );
  }
  if (differentialScore < 70) {
    missedConsiderations.push("The differential left out hypotheses that were reasonable to keep in play.");
  }
  if (planScore < 50) {
    caseFile.debrief.keyConsiderations.forEach((k) => missedConsiderations.push(k));
  }

  const overallScore = Math.round(
    (conclusionCorrect ? 45 : 0) + differentialScore * 0.2 + planScore * 0.35,
  );

  const verdict: DebriefResult["verdict"] =
    overallScore >= 80 ? "strong" : overallScore >= 55 ? "developing" : "needs_review";

  let calibration: DebriefResult["calibration"] = "unknown";
  if (submission.confidence >= 1 && submission.confidence <= 5) {
    const confidencePct = (submission.confidence / 5) * 100;
    const gap = confidencePct - overallScore;
    calibration = gap > 20 ? "overconfident" : gap < -20 ? "underconfident" : "well_calibrated";
  }

  const eventConsequence = (() => {
    if (!caseFile.unfoldingEvent || !submission.eventChoiceId) return null;
    const choice = caseFile.unfoldingEvent.choices.find((c) => c.id === submission.eventChoiceId);
    return choice ? choice.consequence : null;
  })();

  return {
    conclusionCorrect,
    differentialScore,
    planScore,
    planFeedback: conclusionCorrect
      ? "Your plan is scored against the safety checklist and recommended action below."
      : "Because the leading diagnosis differs from the reviewed answer, re-read the plan rationale with that in mind — some of the plan may still be sound even if the diagnosis wasn't.",
    missedConsiderations,
    overallScore,
    verdict,
    calibration,
    eventConsequence,
    content: caseFile.debrief,
  };
}
