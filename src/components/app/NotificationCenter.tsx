"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loadProgress, dueReviewItems, type ProgressStore } from "@/lib/progress";

interface NotificationRow {
  id: string;
  title: string;
  body: string;
  href: string;
  at: number;
}

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<ProgressStore | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!progress) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-dim">
        <BellIcon />
      </div>
    );
  }

  const due = dueReviewItems(progress);
  const recentAttempts = [...progress.attempts].sort((a, b) => b.completedAt - a.completedAt).slice(0, 3);

  const rows: NotificationRow[] = [
    ...due.slice(0, 4).map((d) => ({
      id: `due-${d.id}`,
      title: "Review item due",
      body: d.prompt,
      href: "/app/review",
      at: d.dueAt,
    })),
    ...recentAttempts.map((a, i) => ({
      id: `attempt-${i}`,
      title: `Debrief ready — ${a.overallScore}/100`,
      body: a.caseId.replace(/-/g, " "),
      href: "/app/progress",
      at: a.completedAt,
    })),
  ].sort((a, b) => b.at - a.at);

  const count = due.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-dim hover:text-foreground"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <BellIcon />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-white">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
          <div className="border-b border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-foreground-dim">Notifications</div>
          <div className="max-h-80 overflow-y-auto">
            {rows.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-foreground-dim">You&rsquo;re all caught up.</p>
            ) : (
              rows.map((r) => (
                <Link
                  key={r.id}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block border-b border-border px-4 py-3 last:border-b-0 hover:bg-surface-2"
                >
                  <div className="text-sm font-semibold text-foreground">{r.title}</div>
                  <div className="mt-0.5 truncate text-xs text-foreground-dim">{r.body}</div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5c-1.8 0-3 1.4-3 3.2v1.9c0 .5-.2 1-.5 1.4L3.4 9.6c-.5.6-.1 1.4.6 1.4h8c.7 0 1.1-.8.6-1.4l-1.1-1.6a2.3 2.3 0 0 1-.5-1.4V4.7c0-1.8-1.2-3.2-3-3.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6.3 13a1.8 1.8 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
