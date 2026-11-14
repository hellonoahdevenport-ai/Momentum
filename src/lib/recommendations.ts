import type { TrackKey } from "@/lib/tracks";
import { attemptsForUnit, bestScoreForUnit, type ProgressStore } from "@/lib/progress";
import { getWeakSpots } from "@/lib/weaknessProfile";

export interface AvailableUnit {
  trackKey: TrackKey;
  unitKey: string;
  title: string;
  estimatedMinutes: number;
}

export interface Recommendation {
  trackKey: TrackKey;
  unitKey: string;
  title: string;
  estimatedMinutes: number;
  reason: string;
  isRetry: boolean;
}

// Loose "related system" groupings used only to nudge toward a nearby topic
// after a weak spot — not a claim of clinical equivalence, just a simple
// heuristic so the suggestion isn't a random unrelated unit.
const RELATED_UNITS: Record<string, string[]> = {
  cardiovascular: ["respiratory", "multisystem"],
  respiratory: ["cardiovascular", "multisystem"],
  renal: ["gi", "endocrine"],
  gi: ["renal", "endocrine"],
  endocrine: ["renal", "gi", "reproductive"],
  reproductive: ["endocrine"],
  nervous: ["behavioral", "multisystem"],
  behavioral: ["nervous"],
  msk: ["blood-immune"],
  "blood-immune": ["msk", "multisystem"],
  multisystem: ["cardiovascular", "respiratory", "nervous"],
  foundations: [],
};

function attemptedUnitKeySet(progress: ProgressStore, trackKey: TrackKey): Set<string> {
  return new Set(progress.attempts.filter((a) => a.trackKey === trackKey).map((a) => a.unitKey));
}

/**
 * Picks one suggested next case from the units that actually have an
 * authored case available right now. Prefers a never-attempted unit related
 * to a current weak spot, then any never-attempted available unit, then a
 * retry of the lowest-scoring in-progress unit.
 */
export function getRecommendedNext(progress: ProgressStore, available: AvailableUnit[]): Recommendation | null {
  if (available.length === 0) return null;

  for (const trackKey of ["medicine", "nursing"] as TrackKey[]) {
    const trackUnits = available.filter((u) => u.trackKey === trackKey);
    if (trackUnits.length === 0) continue;
    const attempted = attemptedUnitKeySet(progress, trackKey);

    const weakSpots = getWeakSpots(
      progress,
      trackUnits.map((u) => u.unitKey),
    ).filter((w) => w.trackKey === trackKey);

    for (const weak of weakSpots) {
      const related = RELATED_UNITS[weak.unitKey] ?? [];
      const candidate = trackUnits.find((u) => related.includes(u.unitKey) && !attempted.has(u.unitKey));
      if (candidate) {
        return {
          trackKey,
          unitKey: candidate.unitKey,
          title: candidate.title,
          estimatedMinutes: candidate.estimatedMinutes,
          reason: `You're still building confidence in a related system — this one's a good next step before circling back.`,
          isRetry: false,
        };
      }
    }
  }

  for (const trackKey of ["medicine", "nursing"] as TrackKey[]) {
    const trackUnits = available.filter((u) => u.trackKey === trackKey);
    const attempted = attemptedUnitKeySet(progress, trackKey);
    const neverAttempted = trackUnits.find((u) => !attempted.has(u.unitKey));
    if (neverAttempted) {
      return {
        trackKey,
        unitKey: neverAttempted.unitKey,
        title: neverAttempted.title,
        estimatedMinutes: neverAttempted.estimatedMinutes,
        reason: "You haven't tried this one yet — a good next unit to add to your coverage.",
        isRetry: false,
      };
    }
  }

  // Everything available has been attempted at least once — retry the
  // lowest-scoring in-progress unit across both tracks.
  let worst: (AvailableUnit & { score: number }) | null = null;
  for (const u of available) {
    const best = bestScoreForUnit(progress, u.trackKey, u.unitKey);
    const attempts = attemptsForUnit(progress, u.trackKey, u.unitKey);
    if (attempts.length === 0 || best >= 70) continue;
    if (!worst || best < worst.score) worst = { ...u, score: best };
  }
  if (worst) {
    return {
      trackKey: worst.trackKey,
      unitKey: worst.unitKey,
      title: worst.title,
      estimatedMinutes: worst.estimatedMinutes,
      reason: `Your best score here is ${worst.score} so far — one more attempt could push it to mastery.`,
      isRetry: true,
    };
  }

  return null;
}
