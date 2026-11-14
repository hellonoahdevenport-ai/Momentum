import { notFound } from "next/navigation";
import { getEcgRhythm } from "@/lib/ecg/rhythms";
import { toEcgPublicView } from "@/lib/ecg/publicView";
import EcgPracticeClient from "@/components/app/EcgPracticeClient";

export default async function EcgRhythmPage({ params }: { params: Promise<{ rhythmId: string }> }) {
  const { rhythmId } = await params;
  const rhythm = getEcgRhythm(rhythmId);
  if (!rhythm) notFound();
  return (
    <EcgPracticeClient
      rhythm={toEcgPublicView(rhythm)}
      nextStepQuestion={{ id: rhythm.nextStepQuestion.id, prompt: rhythm.nextStepQuestion.prompt, options: rhythm.nextStepQuestion.options }}
    />
  );
}
