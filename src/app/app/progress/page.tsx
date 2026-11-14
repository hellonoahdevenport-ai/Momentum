import { TRACK_ORDER, type TrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import ProgressPageClient from "@/components/app/ProgressPageClient";

export default function ProgressPage() {
  const availableUnitKeys = Object.fromEntries(
    TRACK_ORDER.map((trackKey) => [trackKey, UNITS.filter((u) => casesForUnit(trackKey, u.key).length > 0).map((u) => u.key)])
  ) as Record<TrackKey, string[]>;

  return <ProgressPageClient availableUnitKeys={availableUnitKeys} />;
}
