import { notFound } from "next/navigation";
import { getCaseFile } from "@/lib/cases/registry";
import QuizClient from "@/components/app/QuizClient";

export default async function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const caseFile = getCaseFile(quizId);
  if (!caseFile) notFound();
  return (
    <QuizClient
      caseId={quizId}
      trackKey={caseFile.meta.trackKey}
      title={caseFile.meta.title}
      questions={caseFile.quizQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options }))}
    />
  );
}
