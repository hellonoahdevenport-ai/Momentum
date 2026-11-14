"use client";

import { useMemo } from "react";
import { buildEcgPath, VIEW_HEIGHT } from "@/lib/ecg/waveform";
import type { EcgWaveformSpec } from "@/lib/ecg/types";

interface SnapshotFact {
  label: string;
  value: string;
}

function parseNumber(value: string): number | null {
  const m = value.match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

function toneFor(label: string, value: string): "normal" | "warn" | "bad" {
  const n = parseNumber(value);
  if (n === null) return "normal";
  const l = label.toLowerCase();
  if (l.includes("hr")) return n > 110 ? "bad" : n > 95 ? "warn" : "normal";
  if (l.includes("spo2")) return n < 92 ? "bad" : n < 95 ? "warn" : "normal";
  if (l.includes("rr")) return n > 24 ? "bad" : n > 20 ? "warn" : "normal";
  if (l.includes("bp")) {
    const sys = parseInt(value.split("/")[0], 10);
    return sys < 90 ? "bad" : sys < 100 ? "warn" : "normal";
  }
  if (l.includes("pain")) return n >= 7 ? "bad" : n >= 4 ? "warn" : "normal";
  return "normal";
}

const TONE_CLASS: Record<string, string> = {
  normal: "text-foreground",
  warn: "text-warn",
  bad: "text-bad",
};

const TONE_WORD: Record<string, string> = {
  normal: "",
  warn: ", which is mildly elevated",
  bad: ", which is notably abnormal",
};

function describeFact(f: SnapshotFact, driftedValue: string): string {
  const tone = toneFor(f.label, driftedValue);
  const qualifier = TONE_WORD[tone] ?? "";
  const label = f.label.toLowerCase();
  if (label.includes("hr")) return `Heart rate ${driftedValue}${qualifier}.`;
  if (label.includes("bp")) return `Blood pressure ${driftedValue}${qualifier}.`;
  if (label.includes("rr")) return `Respiratory rate ${driftedValue}${qualifier}.`;
  if (label.includes("spo2")) return `Oxygen saturation ${driftedValue}${qualifier}.`;
  if (label.includes("temp")) return `Temperature ${driftedValue}${qualifier}.`;
  if (label.includes("pain")) return `Pain level ${driftedValue}${qualifier}.`;
  return `${f.label}: ${driftedValue}${qualifier}.`;
}

/** Bumps the leading number in a vitals string by `drift`, keeping any unit text that follows (e.g. "96 bpm" -> "100 bpm"). */
function driftValue(value: string, drift: number): string {
  if (!drift) return value;
  const n = parseNumber(value);
  if (n === null) return value;
  return value.replace(/\d+(\.\d+)?/, String(Math.round(n + drift)));
}

export default function LiveVitalsStrip({
  snapshotFacts,
  driftBpm = 0,
}: {
  snapshotFacts: SnapshotFact[];
  /** Small, presentation-only bump applied to the displayed heart rate (e.g. a narrative "time pressure" nudge). Never affects grading. */
  driftBpm?: number;
}) {
  const hrFact = snapshotFacts.find((f) => f.label.toLowerCase().includes("hr"));
  const hr = ((hrFact && parseNumber(hrFact.value)) || 75) + driftBpm;
  const beatDuration = Math.max(0.4, 60 / hr);
  const accessibleSummary = snapshotFacts
    .map((f) => describeFact(f, f.label.toLowerCase().includes("hr") ? driftValue(f.value, driftBpm) : f.value))
    .join(" ");

  const path = useMemo(() => {
    const waveform: EcgWaveformSpec = {
      rate: hr,
      rhythmType: "regular",
      pWavePresent: true,
      qrsWidth: "narrow",
      stSegment: "normal",
      tWaveInverted: false,
    };
    return buildEcgPath(waveform, 7);
  }, [hr]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#120404]">
      <p className="sr-only">{accessibleSummary}</p>
      <div className="flex items-center justify-between gap-3 px-3 py-2" aria-hidden="true">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {snapshotFacts.map((f) => {
            const displayValue = f.label.toLowerCase().includes("hr") ? driftValue(f.value, driftBpm) : f.value;
            return (
              <span key={f.label} className="font-data text-xs">
                <span className="text-foreground-dim/70">{f.label} </span>
                <span className={TONE_CLASS[toneFor(f.label, displayValue)]}>{displayValue}</span>
              </span>
            );
          })}
        </div>
        <div className="heartbeat flex-none text-coral" style={{ animationDuration: `${beatDuration}s` }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 14S1.5 9.8 1.5 5.8a3.3 3.3 0 0 1 6-1.9A3.3 3.3 0 0 1 14.5 5.8C14.5 9.8 8 14 8 14Z" />
          </svg>
        </div>
      </div>
      <div className="relative h-10 w-full overflow-hidden" aria-hidden="true">
        <div className="scrolling-strip absolute inset-y-0 left-0 flex w-[2000px]" style={{ animationDuration: `${beatDuration * 9}s` }}>
          {[0, 1].map((copy) => (
            <svg key={copy} viewBox={`0 0 1000 ${VIEW_HEIGHT}`} preserveAspectRatio="none" className="h-10 w-[1000px] flex-none">
              <path d={path} fill="none" stroke="#4ade80" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
