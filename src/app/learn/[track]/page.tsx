import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import SkillPathClient from "@/components/SkillPathClient";

export default async function TrackPathPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrackKey(track)) notFound();
  return <SkillPathClient trackKey={track} />;
}
