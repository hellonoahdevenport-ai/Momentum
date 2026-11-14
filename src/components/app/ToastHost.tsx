"use client";

import { useToast } from "@/context/ToastContext";

const TONES: Record<string, string> = {
  accent: "border-accent bg-accent-soft text-accent",
  good: "border-good bg-good-soft text-good",
  warn: "border-warn bg-warn-soft text-warn",
  bad: "border-bad bg-bad-soft text-bad",
};

export default function ToastHost() {
  const { toasts, dismiss } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`toast-enter pointer-events-auto w-full max-w-sm rounded-xl border-2 px-4 py-3 shadow-lg backdrop-blur-sm ${TONES[t.tone]}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold">{t.title}</div>
              {t.body && <div className="mt-0.5 text-xs opacity-90">{t.body}</div>}
            </div>
            <button onClick={() => dismiss(t.id)} className="focus-ring text-xs font-bold opacity-70 hover:opacity-100" aria-label="Dismiss notification">
              &#10005;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
