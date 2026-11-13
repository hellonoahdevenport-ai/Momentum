import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import TrackCurriculumClient from "@/components/app/TrackCurriculumClient";

export default async function TrackCurriculumPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  if (!isTrackKey(track)) notFound();
  return <TrackCurriculumClient trackKey={track} />;
}
