import type { Metadata } from "next";
import Link from "next/link";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import { casesForUnit } from "@/lib/cases/registry";
import CurriculumMap from "@/components/CurriculumMap";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "What’s available now in Momentum, and an honest roadmap of what’s planned.",
};

export default function CurriculumPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <Badge tone="accent">Curriculum map</Badge>
      <h1 className="font-display mt-4 text-4xl font-extrabold text-foreground">What’s here, and what’s next</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-dim">
        Momentum organizes both tracks around the same {UNITS.length} organ-system and competency units. Right now,
        one authored case is live per track. Everything else on the map is shown honestly as planned, not as a
        finished library.
      </p>

      <div className="mt-12 flex flex-col gap-14">
        {TRACK_ORDER.map((key) => {
          const t = TRACKS[key];
          return (
            <div key={key} className={`track-${key}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{t.label}</h2>
                  <p className="text-sm text-foreground-dim">{t.tierSub}</p>
                </div>
                <Link href={`/tracks/${key}`} className="focus-ring font-display text-sm font-bold text-accent">
                  Track overview &rarr;
                </Link>
              </div>
              <div className="mt-5">
                <CurriculumMap
                  items={UNITS.map((unit) => ({
                    unit,
                    status: casesForUnit(key, unit.key).length > 0 ? "available" : "planned",
                    href: `/app/learn/${key}/${unit.key}`,
                  }))}
                  interactive={false}
                />
              </div>
              <p className="mt-3 text-xs text-foreground-dim">{t.mappingNote}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-surface-2 p-6">
        <h2 className="font-display text-base font-bold text-foreground">How to read this map</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground-dim">
          <li>
            <strong className="text-foreground">Available</strong> means a case has been authored for that unit and
            track. It still carries a content-review status inside the demo.
          </li>
          <li>
            <strong className="text-foreground">Planned</strong> means the unit exists in the taxonomy but no case
            has been written yet — it is not clickable and nothing is implied about its content.
          </li>
          <li>Educators can enable or disable sequencing for their learners; this public map always shows everything.</li>
        </ul>
      </div>
    </div>
  );
}
