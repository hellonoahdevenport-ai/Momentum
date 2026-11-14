"use client";

import { useState } from "react";

const REGIONS: { id: string; label: string; d?: string; shape: "circle" | "rect"; x: number; y: number; w?: number; h?: number; r?: number }[] = [
  { id: "head", label: "Head & neck", shape: "circle", x: 100, y: 28, r: 20 },
  { id: "chest", label: "Chest", shape: "rect", x: 72, y: 54, w: 56, h: 48 },
  { id: "abdomen", label: "Abdomen", shape: "rect", x: 76, y: 104, w: 48, h: 40 },
  { id: "arms", label: "Arms & hands", shape: "rect", x: 30, y: 58, w: 36, h: 90 },
  { id: "legs", label: "Legs", shape: "rect", x: 76, y: 148, w: 48, h: 90 },
  { id: "skin", label: "Skin (overall)", shape: "rect", x: 134, y: 58, w: 36, h: 90 },
];

export default function AnatomyDiagram({ findings }: { findings: Record<string, string> }) {
  const [active, setActive] = useState<string | null>(null);
  const activeFinding = active ? findings[active] : null;
  const activeLabel = REGIONS.find((r) => r.id === active)?.label;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <svg viewBox="0 0 200 250" className="h-56 w-auto flex-none self-center sm:self-start" role="img" aria-label="Clickable body diagram">
          {REGIONS.map((r) => {
            const has = Boolean(findings[r.id]);
            const isActive = active === r.id;
            const fill = isActive ? "var(--accent)" : has ? "var(--accent-soft)" : "var(--surface-2)";
            const stroke = isActive ? "var(--accent-dark)" : "var(--border-strong)";
            const shared = {
              fill,
              stroke,
              strokeWidth: 1.5,
              className: "cursor-pointer transition-colors",
              onClick: () => setActive(r.id),
              role: "button" as const,
              tabIndex: 0,
              "aria-label": r.label,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(r.id);
                }
              },
            };
            return r.shape === "circle" ? (
              <circle key={r.id} cx={r.x} cy={r.y} r={r.r} {...shared} />
            ) : (
              <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h} rx={10} {...shared} />
            );
          })}
        </svg>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-foreground-dim">Tap a region to examine</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={`focus-ring rounded-full border px-2.5 py-1 text-xs font-semibold ${
                  active === r.id ? "border-accent bg-accent-soft text-accent" : "border-border text-foreground-dim"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="mt-3 min-h-[64px] rounded-xl bg-surface-2 p-3.5 text-sm leading-relaxed text-foreground">
            {activeFinding ? (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wide text-accent">{activeLabel}</span>
                <p className="mt-1">{activeFinding}</p>
              </>
            ) : (
              <span className="text-foreground-dim">Select a region on the diagram to see the exam finding there.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
