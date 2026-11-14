"use client";

import { useMemo } from "react";
import { buildEcgPath, VIEW_WIDTH, VIEW_HEIGHT } from "@/lib/ecg/waveform";
import type { EcgWaveformSpec } from "@/lib/ecg/types";

export default function EcgStrip({ waveform, seed = 1 }: { waveform: EcgWaveformSpec; seed?: number }) {
  const path = useMemo(() => buildEcgPath(waveform, seed), [waveform, seed]);

  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    for (let x = 0; x <= VIEW_WIDTH; x += 20) {
      lines.push({ x1: x, y1: 0, x2: x, y2: VIEW_HEIGHT, major: x % 100 === 0 });
    }
    for (let y = 0; y <= VIEW_HEIGHT; y += 20) {
      lines.push({ x1: 0, y1: y, x2: VIEW_WIDTH, y2: y, major: y % 100 === 0 });
    }
    return lines;
  }, []);

  return (
    <div className="scrollbar-thin overflow-x-auto rounded-xl border border-border bg-[#2a0a0a]">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="h-[180px] w-[1000px] min-w-full" role="img" aria-label="Rhythm strip, illustrative">
        {gridLines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.major ? "#7a1f1f" : "#4a1414"} strokeWidth={l.major ? 1 : 0.5} />
        ))}
        <path d={path} fill="none" stroke="#4ade80" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
