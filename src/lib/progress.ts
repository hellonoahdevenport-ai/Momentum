"use client";

import type { TrackKey } from "./tracks";

const STORAGE_KEY = "casebook_progress_v2";
const REVIEW_INTERVALS_DAYS = [1, 3, 7, 16, 35];

export interface CaseAttemptRecord {
  caseId: string;
  trackKey: TrackKey;
  unitKey: string;
  completedAt: number;
  overallScore: number;
  verdict: "strong" | "developing" | "needs_review";
  conclusionCorrect: boolean;
  confidence: number;
  calibration: "well_calibrated" | "overconfident" | "underconfident" | "unknown";
}

export interface ReviewItem {
  id: string;
  caseId: string;
  prompt: string;
  answer: string;
  dueAt: number;
  intervalIndex: number;
}

export interface ProgressStore {
  attempts: CaseAttemptRecord[];
  reviewQueue: ReviewItem[];
  bookmarks: string[];
}

const EMPTY: ProgressStore = { attempts: [], reviewQueue: [], bookmarks: [] };

export function loadProgress(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<ProgressStore>;
    return {
      attempts: parsed.attempts ?? [],
      reviewQueue: parsed.reviewQueue ?? [],
      bookmarks: parsed.bookmarks ?? [],
    };
  } catch {
    return { ...EMPTY };
  }
}

export function saveProgress(progress: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore (private browsing, storage disabled, etc.)
  }
}

export function recordCaseAttempt(
  progress: ProgressStore,
  record: CaseAttemptRecord,
  missedItems: { id: string; caseId: string; prompt: string; answer: string }[],
): ProgressStore {
  const attempts = [...progress.attempts, record];
  const existingIds = new Set(progress.reviewQueue.map((r) => r.id));
  const newItems: ReviewItem[] = missedItems
    .filter((m) => !existingIds.has(m.id))
    .map((m) => ({ id: m.id, caseId: m.caseId, prompt: m.prompt, answer: m.answer, dueAt: Date.now(), intervalIndex: 0 }));
  const next: ProgressStore = { ...progress, attempts, reviewQueue: [...progress.reviewQueue, ...newItems] };
  saveProgress(next);
  return next;
}

export function recordReviewResult(progress: ProgressStore, itemId: string, correct: boolean): ProgressStore {
  const reviewQueue = progress.reviewQueue
    .map((item) => {
      if (item.id !== itemId) return item;
      if (!correct) return { ...item, dueAt: Date.now(), intervalIndex: 0 };
      const nextIndex = Math.min(item.intervalIndex + 1, REVIEW_INTERVALS_DAYS.length - 1);
      const days = REVIEW_INTERVALS_DAYS[nextIndex];
      return { ...item, dueAt: Date.now() + days * 24 * 60 * 60 * 1000, intervalIndex: nextIndex };
    })
    .filter((item) => item.intervalIndex < REVIEW_INTERVALS_DAYS.length - 1 || !correct || Date.now() < item.dueAt);
  const next = { ...progress, reviewQueue };
  saveProgress(next);
  return next;
}

export function dueReviewItems(progress: ProgressStore): ReviewItem[] {
  const now = Date.now();
  return progress.reviewQueue.filter((item) => item.dueAt <= now);
}

export function toggleBookmark(progress: ProgressStore, caseId: string): ProgressStore {
  const bookmarks = progress.bookmarks.includes(caseId)
    ? progress.bookmarks.filter((id) => id !== caseId)
    : [...progress.bookmarks, caseId];
  const next = { ...progress, bookmarks };
  saveProgress(next);
  return next;
}

export function attemptsForUnit(progress: ProgressStore, trackKey: TrackKey, unitKey: string): CaseAttemptRecord[] {
  return progress.attempts.filter((a) => a.trackKey === trackKey && a.unitKey === unitKey);
}

export function bestScoreForUnit(progress: ProgressStore, trackKey: TrackKey, unitKey: string): number {
  const attempts = attemptsForUnit(progress, trackKey, unitKey);
  return attempts.reduce((best, a) => Math.max(best, a.overallScore), 0);
}

export type UnitStatus = "complete" | "in_progress" | "available" | "planned";

export function unitStatus(progress: ProgressStore, trackKey: TrackKey, unitKey: string, hasCase: boolean): UnitStatus {
  if (!hasCase) return "planned";
  const attempts = attemptsForUnit(progress, trackKey, unitKey);
  if (attempts.length === 0) return "available";
  const best = bestScoreForUnit(progress, trackKey, unitKey);
  return best >= 70 ? "complete" : "in_progress";
}
