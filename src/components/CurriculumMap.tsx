"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Unit } from "@/lib/units";
import type { UnitStatus } from "@/lib/progress";

const STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Available",
  in_progress: "In progress",
  complete: "Complete",
  planned: "Planned",
};

function StatusDot({ status, color }: { status: UnitStatus; color: string }) {
  if (status === "planned") {
    return <span className="h-2 w-2 rounded-full bg-border-strong" aria-hidden="true" />;
  }
  if (status === "complete") {
    return <span className="h-2 w-2 rounded-full bg-good" aria-hidden="true" />;
  }
  return <span className="h-2 w-2 rounded-full" style={{ background: color }} aria-hidden="true" />;
}

export interface CurriculumMapUnit {
  unit: Unit;
  status: UnitStatus;
  href: string | null;
}

export default function CurriculumMap({
  items,
  interactive = true,
}: {
  items: CurriculumMapUnit[];
  interactive?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-foreground-dim">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-good" /> Complete
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-border-strong" /> Planned
        </span>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-240)}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground-dim hover:text-foreground"
            aria-label="Scroll curriculum left"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollBy(240)}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground-dim hover:text-foreground"
            aria-label="Scroll curriculum right"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-thin -mx-1 flex gap-3 overflow-x-auto px-1 pb-2"
        role="list"
        aria-label="Curriculum units"
      >
        {items.map(({ unit: u, status, href }) => {
          const content = (
            <div
              className={`card-lift flex w-[150px] flex-none flex-col gap-2 rounded-2xl border px-4 py-4 ${
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
                <StatusDot status={status} color={u.color} />
              </div>
              <div className="text-sm font-semibold leading-snug text-foreground">{u.label}</div>
              <div className="text-[11px] font-medium text-foreground-dim">{STATUS_LABEL[status]}</div>
            </div>
          );
          return (
            <div role="listitem" key={u.key} className="scroll-snap-align-start">
              {interactive && href ? (
                <Link href={href} className="focus-ring block rounded-2xl">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
