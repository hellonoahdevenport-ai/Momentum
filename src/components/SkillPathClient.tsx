"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBuilderMode } from "@/context/BuilderModeContext";
import { TRACKS } from "@/lib/tracks";
import type { TrackKey } from "@/lib/types";
import { UNITS, PASS_THRESHOLD } from "@/lib/units";
import { loadProgress, getUnitProgress, isUnitUnlocked } from "@/lib/progress";
import type { AllProgress } from "@/lib/types";

const WAVE_OFFSETS = [0, 56, 0, -56];

export default function SkillPathClient({ trackKey }: { trackKey: TrackKey }) {
  const track = TRACKS[trackKey];
  const { builderMode } = useBuilderMode();
  const [progress, setProgress] = useState<AllProgress>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrating from a browser-only store after mount, on purpose: reading
    // localStorage during the initial render would mismatch the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
     
    setReady(true);
  }, []);

  const completeCount = ready
    ? UNITS.filter((u) => getUnitProgress(progress, trackKey, u.key).attempts >= PASS_THRESHOLD).length
    : 0;

  const unitStates = UNITS.map((u, idx) => {
    const unlocked = ready ? isUnitUnlocked(progress, trackKey, idx, builderMode) : false;
    const prog = getUnitProgress(progress, trackKey, u.key);
    const complete = prog.attempts >= PASS_THRESHOLD;
    return { u, idx, unlocked, prog, complete };
  });
  let firstActionableKey: string | null = null;
  for (const s of unitStates) {
    if (s.unlocked && !s.complete) {
      firstActionableKey = s.u.key;
      break;
    }
  }

  return (
    <div className={`track-${trackKey} mx-auto max-w-2xl px-6 pt-10 pb-24`}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-white">
          &#9670; {track.tierLabel}
        </span>
        <Link href="/learn" className="font-display text-sm font-bold text-accent">
          Switch track
        </Link>
      </div>

      <h1 className="font-display mt-4 text-3xl font-extrabold">{track.label} &middot; Skill path</h1>
      <p className="mt-1 text-sm text-foreground-dim">{track.tierSub}</p>
      <p className="font-data mt-2 text-xs text-foreground-dim">
        {completeCount} / {UNITS.length} units complete
      </p>

      <div className="relative mt-10 flex flex-col items-center gap-8 pb-2">
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-border" />
        {unitStates.map(({ u, idx, unlocked, prog, complete }) => {
          const node = (
            <div
              className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border-b-[5px] font-display text-[17px] font-bold text-white"
              style={
                unlocked
                  ? { background: u.color, borderBottomColor: u.colorDark }
                  : { background: "var(--surface-2)", borderBottomColor: "var(--border)", color: "var(--foreground-dim)" }
              }
            >
              {unlocked ? u.mono : "🔒"}
              {complete && (
                <span className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-good text-xs text-white ring-[3px] ring-background">
                  &#10003;
                </span>
              )}
            </div>
          );

          return (
            <div
              key={u.key}
              className="relative z-10 flex flex-col items-center gap-1.5"
              style={{ transform: `translateX(${WAVE_OFFSETS[idx % 4]}px)` }}
            >
              {unlocked ? (
                <Link href={`/learn/${trackKey}/${u.key}`} className="btn-chunky rounded-full">
                  {node}
                </Link>
              ) : (
                node
              )}
              <div className="max-w-[110px] text-center text-xs font-semibold">{u.label}</div>
              {unlocked && (
                <div className="font-data text-[10.5px] text-foreground-dim">
                  {Math.min(prog.attempts, PASS_THRESHOLD)}/{PASS_THRESHOLD}
                </div>
              )}
              {unlocked && u.key === firstActionableKey && (
                <div className="-mt-0.5 rounded-[10px] bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                  {prog.attempts === 0 ? "START" : "CONTINUE"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-border pt-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-dim">Coming later</span>
        <div className="mt-2.5 flex flex-col gap-2">
          {track.futureTiers.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-xl bg-surface-2 px-3.5 py-3 opacity-75">
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-foreground-dim">{t.sub}</div>
              </div>
              <span className="text-foreground-dim">&#128274;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
