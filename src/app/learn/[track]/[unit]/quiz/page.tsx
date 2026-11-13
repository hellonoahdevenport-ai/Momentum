import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import QuizClient from "@/components/QuizClient";

export default async function UnitQuizPage({
  params,
}: {
  params: Promise<{ track: string; unit: string }>;
}) {
  const { track, unit } = await params;
  if (!isTrackKey(track) || !unitByKey(unit)) notFound();
  return <QuizClient trackKey={track} unitKey={unit} />;
}
