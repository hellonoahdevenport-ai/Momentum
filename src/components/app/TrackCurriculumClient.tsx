"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TRACKS, type TrackKey } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { loadProgress, unitStatus, type ProgressStore, type UnitStatus } from "@/lib/progress";
import Badge from "@/components/ui/Badge";

export interface UnitCaseInfo {
  title: string;
  estimatedMinutes: number;
}

const STATUS_FILTERS: { key: "all" | UnitStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "in_progress", label: "In progress" },
  { key: "complete", label: "Complete" },
  { key: "planned", label: "Planned" },
];

const STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Available",
  in_progress: "In progress",
  complete: "Complete",
  planned: "Planned",
};

function StatusDot({ status, color }: { status: UnitStatus; color: string }) {
  if (status === "planned") return <span className="h-2 w-2 rounded-full bg-border-strong" aria-hidden="true" />;
  if (status === "complete") return <span className="h-2 w-2 rounded-full bg-good" aria-hidden="true" />;
  return <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />;
}

export default function TrackCurriculumClient({
  trackKey,
  unitCaseInfo,
}: {
  trackKey: TrackKey;
  unitCaseInfo: Record<string, UnitCaseInfo | null>;
}) {
  const t = TRACKS[trackKey];
  const [progress, setProgress] = useState<ProgressStore | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | UnitStatus>("all");
  const [query, setQuery] = useState("");
  const [maxMinutes, setMaxMinutes] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  const unitHasCase = (unitKey: string) => unitCaseInfo[unitKey] != null;

  const statusOf = (unitKey: string): UnitStatus =>
    progress ? unitStatus(progress, trackKey, unitKey, unitHasCase(unitKey)) : unitHasCase(unitKey) ? "available" : "planned";

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNITS.map((unit) => ({
      unit,
      status: statusOf(unit.key),
      caseInfo: unitCaseInfo[unit.key] ?? null,
      href: `/app/learn/${trackKey}/${unit.key}`,
    }))
      .filter((it) => statusFilter === "all" || it.status === statusFilter)
      .filter((it) => maxMinutes === null || (it.caseInfo?.estimatedMinutes ?? Infinity) <= maxMinutes)
      .filter((it) => {
        if (!q) return true;
        const haystack = [it.unit.label, it.unit.hint, it.caseInfo?.title ?? ""].join(" ").toLowerCase();
        return haystack.includes(q);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, query, maxMinutes, progress, unitCaseInfo, trackKey]);

  const timeOptions = [
    { key: null as number | null, label: "Any length" },
    { key: 15, label: "Under 15 min" },
    { key: 20, label: "Under 20 min" },
  ];

  const resultsLabel = `${items.length} of ${UNITS.length} unit${UNITS.length === 1 ? "" : "s"}`;

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

      <div className="mt-6 flex flex-col gap-3">
        <div className="relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-dim"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search units or case topics…"
            className="focus-ring w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3.5 text-sm text-foreground placeholder:text-foreground-dim"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-bold ${
                statusFilter === f.key ? "bg-accent text-white" : "border border-border text-foreground-dim"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="mx-1 self-center text-border-strong">|</span>
          {timeOptions.map((o) => (
            <button
              key={o.label}
              onClick={() => setMaxMinutes(o.key)}
              className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-bold ${
                maxMinutes === o.key ? "bg-accent text-white" : "border border-border text-foreground-dim"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground-dim">{resultsLabel}</p>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-foreground-dim">No units match these filters yet. Try clearing the search or filters.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ unit: u, status, caseInfo, href }) => {
            const content = (
              <div
                className={`card-lift flex h-full flex-col gap-2.5 rounded-2xl border px-4 py-4 ${
                  status === "planned" ? "border-border bg-surface-2" : "border-border bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-xs font-bold text-white"
                    style={{ background: status === "planned" ? "var(--border-strong)" : u.color }}
                  >
                    {u.mono}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StatusDot status={status} color={u.color} />
                    <span className="text-[11px] font-medium text-foreground-dim">{STATUS_LABEL[status]}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold leading-snug text-foreground">{u.label}</div>
                {caseInfo ? (
                  <div className="text-xs leading-snug text-foreground-dim">
                    {caseInfo.title} · about {caseInfo.estimatedMinutes} min
                  </div>
                ) : (
                  <div className="text-xs leading-snug text-foreground-dim">{u.hint}</div>
                )}
              </div>
            );
            return href ? (
              <Link key={u.key} href={href} className="focus-ring block h-full rounded-2xl">
                {content}
              </Link>
            ) : (
              <div key={u.key}>{content}</div>
            );
          })}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-5 text-xs leading-relaxed text-foreground-dim">
        Sequencing is off by default in this demo — every available unit is open regardless of order. Educators can
        configure a recommended sequence per cohort once real accounts exist.
      </div>
    </div>
  );
}
