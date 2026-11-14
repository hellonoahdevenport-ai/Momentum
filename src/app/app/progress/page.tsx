import { TRACK_ORDER, type TrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import ProgressPageClient from "@/components/app/ProgressPageClient";
import type { AvailableUnit } from "@/lib/recommendations";

export default function ProgressPage() {
  const availableUnitKeys = Object.fromEntries(
    TRACK_ORDER.map((trackKey) => [trackKey, UNITS.filter((u) => casesForUnit(trackKey, u.key).length > 0).map((u) => u.key)])
  ) as Record<TrackKey, string[]>;

  const availableUnits: AvailableUnit[] = [];
  for (const trackKey of TRACK_ORDER) {
    for (const u of UNITS) {
      const c = casesForUnit(trackKey, u.key)[0];
      if (c) availableUnits.push({ trackKey, unitKey: u.key, title: c.meta.title, estimatedMinutes: c.meta.estimatedMinutes });
    }
  }

  return <ProgressPageClient availableUnitKeys={availableUnitKeys} availableUnits={availableUnits} />;
}
