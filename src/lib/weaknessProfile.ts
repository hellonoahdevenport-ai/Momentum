import type { TrackKey } from "@/lib/tracks";
import { attemptsForUnit, bestScoreForUnit, type ProgressStore, type CaseAttemptRecord } from "@/lib/progress";

export interface WeakSpot {
  trackKey: TrackKey;
  unitKey: string;
  bestScore: number;
  mostRecent: CaseAttemptRecord;
  reason: string;
  severity: number;
}

const TRACK_KEYS: TrackKey[] = ["medicine", "nursing"];

/**
 * Ranks units the learner has attempted but hasn't yet mastered, using only
 * data already recorded in ProgressStore.attempts. Higher severity = more
 * worth revisiting soon.
 */
export function getWeakSpots(progress: ProgressStore, unitKeys: string[], limit = 5): WeakSpot[] {
  const spots: WeakSpot[] = [];

  for (const trackKey of TRACK_KEYS) {
    for (const unitKey of unitKeys) {
      const attempts = attemptsForUnit(progress, trackKey, unitKey);
      if (attempts.length === 0) continue;

      const best = bestScoreForUnit(progress, trackKey, unitKey);
      if (best >= 70) continue; // already "complete" per unitStatus's own threshold

      const mostRecent = [...attempts].sort((a, b) => b.completedAt - a.completedAt)[0];
      const overconfidentRecently = mostRecent.calibration === "overconfident";

      let reason: string;
      if (overconfidentRecently) {
        reason = `Scored ${mostRecent.overallScore} on your last attempt — you were more confident than the result supported.`;
      } else if (attempts.length === 1 && best >= 60) {
        reason = `Scored ${best} on your one attempt — another pass would likely push this to mastery.`;
      } else {
        reason = `Best score so far is ${best} — another pass would help.`;
      }

      // Severity: lower score = more urgent; overconfidence adds urgency since
      // it signals a gap the learner doesn't realize they have.
      const severity = (70 - best) + (overconfidentRecently ? 15 : 0);

      spots.push({ trackKey, unitKey, bestScore: best, mostRecent, reason, severity });
    }
  }

  return spots.sort((a, b) => b.severity - a.severity).slice(0, limit);
}

/** Units where the learner's last two attempts both scored >=90. */
export function getExcellingUnitKeys(progress: ProgressStore, unitKeys: string[]): Set<string> {
  const excelling = new Set<string>();
  for (const trackKey of TRACK_KEYS) {
    for (const unitKey of unitKeys) {
      const attempts = [...attemptsForUnit(progress, trackKey, unitKey)].sort((a, b) => b.completedAt - a.completedAt);
      if (attempts.length >= 2 && attempts[0].overallScore >= 90 && attempts[1].overallScore >= 90) {
        excelling.add(`${trackKey}:${unitKey}`);
      }
    }
  }
  return excelling;
}
