import Link from "next/link";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";

export const metadata = { title: "Tracks" };

export default function AppTracksPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Pick a track</h1>
      <p className="mt-2 text-sm text-foreground-dim">Medicine and Nursing share a curriculum spine but follow their own loop.</p>

      <div className="mt-8 flex flex-col gap-4">
        {TRACK_ORDER.map((key) => {
          const t = TRACKS[key];
          return (
            <Link
              key={key}
              href={`/app/tracks/${key}`}
              className={`track-${key} btn-press focus-ring group flex items-center justify-between gap-4 rounded-2xl bg-accent-soft px-6 py-5`}
            >
              <div>
                <div className="font-display text-xl font-extrabold text-foreground">{t.label}</div>
                <p className="mt-1 max-w-sm text-sm text-foreground-dim">{t.shortDesc}</p>
              </div>
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent text-lg text-white">
                &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
