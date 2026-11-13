"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TRACKS, type TrackKey } from "@/lib/tracks";
import { unitByKey } from "@/lib/units";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import type { ReviewStatus } from "@/lib/cases/types";

interface LibraryCard {
  id: string;
  title: string;
  trackKey: TrackKey;
  unitKey: string;
  estimatedMinutes: number;
  reviewStatus: ReviewStatus;
  presentingIssue: string;
}

export default function LibraryClient({ cards }: { cards: LibraryCard[] }) {
  const [query, setQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | TrackKey>("all");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (trackFilter !== "all" && c.trackKey !== trackFilter) return false;
      if (!query.trim()) return true;
      const haystack = `${c.title} ${c.presentingIssue}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [cards, query, trackFilter]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Case library</h1>
      <p className="mt-2 text-sm text-foreground-dim">Search and filter every authored case across both tracks.</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label htmlFor="library-search" className="sr-only">
          Search cases
        </label>
        <input
          id="library-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or presenting issue…"
          className="focus-ring min-w-[220px] flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none"
        />
        <div className="flex gap-2">
          {(["all", "medicine", "nursing"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTrackFilter(k)}
              className={`focus-ring rounded-full px-3.5 py-2 text-xs font-bold capitalize ${
                trackFilter === k ? "bg-accent text-white" : "border border-border text-foreground-dim"
              }`}
            >
              {k === "all" ? "All tracks" : TRACKS[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((c) => {
          const unit = unitByKey(c.unitKey);
          return (
            <Link key={c.id} href={`/app/case/${c.id}`} className={`track-${c.trackKey} card-lift block rounded-2xl border border-border bg-surface p-5`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-accent">{TRACKS[c.trackKey].label}</span>
                <ReviewStatusBadge status={c.reviewStatus} />
              </div>
              <h2 className="font-display mt-2 text-base font-bold text-foreground">{c.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{c.presentingIssue}</p>
              <div className="mt-3 text-xs text-foreground-dim">
                {unit?.label} &middot; about {c.estimatedMinutes} min
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center text-sm text-foreground-dim">No cases match that search.</p>}
    </div>
  );
}
