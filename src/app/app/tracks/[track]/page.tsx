import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import TrackCurriculumClient from "@/components/app/TrackCurriculumClient";

export default async function TrackCurriculumPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  if (!isTrackKey(track)) notFound();
  const availableUnitKeys = UNITS.filter((u) => casesForUnit(track, u.key).length > 0).map((u) => u.key);
  return <TrackCurriculumClient trackKey={track} availableUnitKeys={availableUnitKeys} />;
}
