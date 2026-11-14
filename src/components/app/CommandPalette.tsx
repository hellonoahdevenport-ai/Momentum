"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Destination {
  label: string;
  href: string;
  group: string;
}

const DESTINATIONS: Destination[] = [
  { label: "Home", href: "/app", group: "Navigate" },
  { label: "Tracks", href: "/app/tracks", group: "Navigate" },
  { label: "Case library", href: "/app/library", group: "Navigate" },
  { label: "Spaced review", href: "/app/review", group: "Navigate" },
  { label: "Progress", href: "/app/progress", group: "Navigate" },
  { label: "Settings", href: "/app/settings", group: "Navigate" },
  { label: "ECG practice", href: "/app/ecg", group: "Skill drills" },
  { label: "ER timed scenarios", href: "/app/er", group: "Skill drills" },
  { label: "Medicine track", href: "/app/tracks/medicine", group: "Tracks" },
  { label: "Nursing track", href: "/app/tracks/nursing", group: "Tracks" },
  { label: "Maya Chen case (iron deficiency anemia)", href: "/app/case/maya-chen-iron-deficiency-anemia", group: "Cases" },
  { label: "Jordan Alvarez case (post-op safety)", href: "/app/case/jordan-alvarez-postop-safety", group: "Cases" },
  { label: "NSR rhythm", href: "/app/ecg/normal-sinus", group: "ECG" },
  { label: "AFib rhythm", href: "/app/ecg/atrial-fibrillation", group: "ECG" },
  { label: "STEMI rhythm", href: "/app/ecg/stemi-anterior", group: "ECG" },
  { label: "Anaphylaxis scenario", href: "/app/er/anaphylaxis", group: "ER" },
  { label: "STEMI chest pain scenario", href: "/app/er/stemi-chest-pain", group: "ER" },
  { label: "Educator overview", href: "/educator", group: "Educator" },
  { label: "Owner control center", href: "/admin", group: "Owner" },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      // Resetting the palette's own search/selection when it opens, not
      // syncing from an external source — intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.label.toLowerCase().includes(q) || d.group.toLowerCase().includes(q));
  }, [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) go(results[activeIndex].href);
    }
  }

  if (!open) return null;

  const resultsWithGroupFlag = results.map((d, i) => ({ ...d, showGroup: i === 0 || results[i - 1].group !== d.group }));

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-[rgba(23,34,55,0.45)] px-4 pt-[12vh]" onClick={() => setOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-foreground-dim">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a case, track, or page…"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-dim"
            aria-label="Command palette search"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-foreground-dim">Esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && <div className="px-4 py-6 text-center text-sm text-foreground-dim">No matches.</div>}
          {resultsWithGroupFlag.map((d, i) => {
            return (
              <div key={d.href + d.label}>
                {d.showGroup && <div className="px-4 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-foreground-dim">{d.group}</div>}
                <button
                  onClick={() => go(d.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`block w-full px-4 py-2 text-left text-sm font-semibold ${i === activeIndex ? "bg-accent-soft text-accent" : "text-foreground"}`}
                >
                  {d.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
