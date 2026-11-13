"use client";

import type { AllProgress, TrackKey, UnitProgress } from "./types";
import { PASS_THRESHOLD, UNITS } from "./units";

const STORAGE_KEY = "casebook_progress_v1";

export function loadProgress(): AllProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AllProgress) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: AllProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function getUnitProgress(progress: AllProgress, track: TrackKey, unitKey: string): UnitProgress {
  return progress[track]?.[unitKey] ?? { attempts: 0, best: 0 };
}

export function isUnitUnlocked(progress: AllProgress, track: TrackKey, idx: number, builderMode: boolean): boolean {
  if (builderMode) return true;
  if (idx === 0) return true;
  return getUnitProgress(progress, track, UNITS[idx - 1].key).attempts >= PASS_THRESHOLD;
}

export function recordAttempt(
  progress: AllProgress,
  track: TrackKey,
  unitKey: string,
  score: number,
): AllProgress {
  const trackProgress = { ...(progress[track] ?? {}) };
  const current = trackProgress[unitKey] ?? { attempts: 0, best: 0 };
  trackProgress[unitKey] = {
    attempts: current.attempts + 1,
    best: Math.max(current.best, score || 0),
  };
  const next: AllProgress = { ...progress, [track]: trackProgress };
  saveProgress(next);
  return next;
}
