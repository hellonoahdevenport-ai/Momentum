"use client";

// Thin, feature-detected wrappers around the browser's native Web Speech
// API. Both SpeechRecognition (dictation) and SpeechSynthesis (text-to-
// speech) have inconsistent browser support (notably Safari), so every
// export here is safe to call unconditionally — it no-ops or returns null
// when the browser doesn't support it, rather than throwing.

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export interface VoiceRecognizer {
  start: () => void;
  stop: () => void;
}

/**
 * Creates a one-shot dictation recognizer. onResult fires with the final
 * transcript once the learner stops speaking; onEnd always fires when
 * listening stops (success, error, or manual stop), so callers can reset
 * their "listening" UI state reliably.
 */
export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onEnd: () => void,
): VoiceRecognizer | null {
  const Ctor = getRecognitionConstructor();
  if (!Ctor) return null;

  const recognizer = new Ctor();
  recognizer.continuous = false;
  recognizer.interimResults = false;
  recognizer.lang = "en-US";

  recognizer.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const transcript = last?.[0]?.transcript?.trim();
    if (transcript) onResult(transcript);
  };
  recognizer.onerror = () => onEnd();
  recognizer.onend = () => onEnd();

  return {
    start: () => recognizer.start(),
    stop: () => recognizer.stop(),
  };
}

/** Speaks text aloud, canceling any speech already in progress first. */
export function speak(text: string): void {
  if (!isSpeechSynthesisSupported() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
}
