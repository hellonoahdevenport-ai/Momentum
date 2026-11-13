"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TRACKS, type TrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { loadProgress, unitStatus, type ProgressStore, type UnitStatus } from "@/lib/progress";
import CurriculumMap from "@/components/CurriculumMap";
import Badge from "@/components/ui/Badge";

const FILTERS: { key: "all" | UnitStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "in_progress", label: "In progress" },
  { key: "complete", label: "Complete" },
  { key: "planned", label: "Planned" },
];

export default function TrackCurriculumClient({ trackKey }: { trackKey: TrackKey }) {
  const t = TRACKS[trackKey];
  const [progress, setProgress] = useState<ProgressStore | null>(null);
  const [filter, setFilter] = useState<"all" | UnitStatus>("all");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  // Only "blood-immune" (medicine) and "gi" (nursing) have an authored case today.
  const unitHasCase = (unitKey: string) =>
    (trackKey === "medicine" && unitKey === "blood-immune") || (trackKey === "nursing" && unitKey === "gi");

  const statusOf = (unitKey: string): UnitStatus =>
    progress ? unitStatus(progress, trackKey, unitKey, unitHasCase(unitKey)) : unitHasCase(unitKey) ? "available" : "planned";

  const mapItems = useMemo(() => {
    return UNITS.filter((u) => filter === "all" || statusOf(u.key) === filter).map((unit) => ({
      unit,
      status: statusOf(unit.key),
      href: `/app/learn/${trackKey}/${unit.key}`,
    }));
  }, [filter, progress]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`track-${trackKey} mx-auto max-w-5xl px-5 py-10 sm:px-8`}>
      <div className="flex items-center justify-between">
        <Badge tone={trackKey === "medicine" ? "accent" : "teal"}>{t.tierLabel}</Badge>
        <Link href="/app/tracks" className="focus-ring font-display text-sm font-bold text-accent">
          Switch track
        </Link>
      </div>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">{t.label} curriculum</h1>
      <p className="mt-1 text-sm text-foreground-dim">{t.tierSub}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-bold ${
              filter === f.key ? "bg-accent text-white" : "border border-border text-foreground-dim"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <CurriculumMap items={mapItems} />
      </div>

      {mapItems.length === 0 && (
        <p className="mt-6 text-sm text-foreground-dim">No units match this filter yet.</p>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-5 text-xs leading-relaxed text-foreground-dim">
        Sequencing is off by default in this demo — every available unit is open regardless of order. Educators can
        configure a recommended sequence per cohort once real accounts exist.
      </div>
    </div>
  );
}
