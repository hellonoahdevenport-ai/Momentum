import type { EcgWaveformSpec } from "./types";

/**
 * Procedurally generates a stylized rhythm-strip waveform as an SVG path.
 * This is an illustrative, parameter-driven tracing for pattern-recognition
 * practice — not real patient data, and not a clinically validated ECG
 * simulator. Each rhythm type is deterministic (seeded) so the same strip
 * looks the same on every view.
 */
export const VIEW_WIDTH = 1000;
export const VIEW_HEIGHT = 200;
const BASELINE = 100;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function buildEcgPath(spec: EcgWaveformSpec, seed = 1): string {
  const rand = seededRandom(seed);
  const targetBeats = 9;
  const baseSpacing = VIEW_WIDTH / targetBeats;

  let x = 40;
  const segments: string[] = [`M 0 ${BASELINE} L ${x} ${BASELINE}`];

  while (x < VIEW_WIDTH - 60) {
    const spacing =
      spec.rhythmType === "irregularly_irregular" ? baseSpacing * (0.65 + rand() * 0.75) : baseSpacing;

    // P wave or fibrillatory baseline
    if (spec.pWavePresent) {
      const pStart = x;
      const pPeak = x + 10;
      const pEnd = x + 20;
      segments.push(`L ${pStart} ${BASELINE}`);
      segments.push(`Q ${pPeak} ${BASELINE - 6} ${pEnd} ${BASELINE}`);
      x = pEnd + 10;
    } else {
      // fine fibrillatory wiggle across the PR-ish interval
      const wiggleEnd = x + 26;
      let wx = x;
      while (wx < wiggleEnd) {
        const amp = (rand() - 0.5) * 4;
        segments.push(`L ${wx} ${BASELINE + amp}`);
        wx += 4;
      }
      x = wiggleEnd + 4;
    }

    // QRS complex
    const qrsHalf = spec.qrsWidth === "wide" ? 26 : 12;
    const qx = x;
    segments.push(`L ${qx} ${BASELINE}`);
    segments.push(`L ${qx + qrsHalf * 0.3} ${BASELINE + 8}`);
    segments.push(`L ${qx + qrsHalf * 0.6} ${BASELINE - 70}`);
    segments.push(`L ${qx + qrsHalf} ${BASELINE + 20}`);
    segments.push(`L ${qx + qrsHalf * 1.3} ${BASELINE}`);
    x = qx + qrsHalf * 1.3;

    // ST segment
    const stOffset = spec.stSegment === "elevated" ? -18 : spec.stSegment === "depressed" ? 14 : 0;
    const stEnd = x + 24;
    segments.push(`L ${x} ${BASELINE + stOffset}`);
    segments.push(`L ${stEnd} ${BASELINE + stOffset}`);
    x = stEnd;

    // T wave
    const tPeak = x + 18;
    const tEnd = x + 36;
    const tAmp = spec.tWaveInverted ? 14 : -14;
    segments.push(`Q ${tPeak} ${BASELINE + tAmp} ${tEnd} ${BASELINE}`);
    x = tEnd;

    segments.push(`L ${x + spacing * 0.15} ${BASELINE}`);
    x += Math.max(spacing - (x - qx), 20);
  }

  segments.push(`L ${VIEW_WIDTH} ${BASELINE}`);
  return segments.join(" ");
}
