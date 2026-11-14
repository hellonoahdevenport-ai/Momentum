import { notFound } from "next/navigation";
import { isTrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import TrackCurriculumClient, { type UnitCaseInfo } from "@/components/app/TrackCurriculumClient";

export default async function TrackCurriculumPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  if (!isTrackKey(track)) notFound();

  const unitCaseInfo: Record<string, UnitCaseInfo | null> = {};
  for (const u of UNITS) {
    const c = casesForUnit(track, u.key)[0];
    unitCaseInfo[u.key] = c ? { title: c.meta.title, estimatedMinutes: c.meta.estimatedMinutes } : null;
  }

  return <TrackCurriculumClient trackKey={track} unitCaseInfo={unitCaseInfo} />;
}
