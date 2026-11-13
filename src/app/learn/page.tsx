import Link from "next/link";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";

export default function LearnPicker() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 pb-24">
      <div className="mb-6 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="font-display text-lg font-extrabold">Casebook</span>
      </div>
      <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground text-balance">
        Practice the hard part.
      </h1>
      <p className="mt-4 max-w-md text-base text-foreground-dim leading-relaxed">
        Work a case from first conversation to final call. Pick a track to
        start.
      </p>

      <div className="mt-8 flex flex-col gap-3.5">
        {TRACK_ORDER.map((key) => {
          const t = TRACKS[key];
          return (
            <Link
              key={key}
              href={`/learn/${key}`}
              className={`track-${key} btn-chunky group flex items-center justify-between gap-4 rounded-[18px] bg-accent-soft px-6 py-5 border-b-[5px] border-accent-dark`}
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
