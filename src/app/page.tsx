import Link from "next/link";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold text-accent">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Now in early build
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-[1.05] text-foreground text-balance">
          Practice the hard part
          <br />
          before it counts.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-foreground-dim leading-relaxed">
          Casebook is a skill path for med and nursing students. Talk to a
          patient, gather the evidence, commit to a diagnosis, get graded &mdash;
          organized by organ system, starting right where Step&nbsp;1 does.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/learn"
            className="btn-chunky rounded-2xl bg-accent px-7 py-3.5 font-display font-bold text-white border-b-4 border-accent-dark"
            style={{}}
          >
            Start learning &rarr;
          </Link>
          <a
            href="#how-it-works"
            className="rounded-2xl px-7 py-3.5 font-display font-bold text-foreground border border-border"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground-dim text-center">
          How a case works
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "1", title: "Interview", desc: "Talk to an AI patient who answers in character — nothing is handed to you." },
            { n: "2", title: "Evidence", desc: "Order the labs, imaging, or assessments you think matter. Pay for what you don't need." },
            { n: "3", title: "Conclusion", desc: "Pick your diagnosis and write the plan — a real commitment, not a guess." },
            { n: "4", title: "Feedback", desc: "Get graded on accuracy, evidence choices, and what you missed." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border p-5">
              <div className="font-display text-2xl font-extrabold text-accent">{s.n}</div>
              <div className="mt-2 font-display text-base font-bold text-foreground">{s.title}</div>
              <p className="mt-1.5 text-sm text-foreground-dim leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground-dim text-center">
          Two tracks, one spine
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-foreground-dim">
          Medicine and Nursing share the same {UNITS.length} organ-system units
          &mdash; only the role, the vocabulary, and the grading focus change.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {TRACK_ORDER.map((key) => {
            const t = TRACKS[key];
            return (
              <Link
                key={key}
                href={`/learn/${key}`}
                className={`track-${key} group rounded-3xl bg-accent-soft p-7 border-b-[6px] border-accent-dark transition hover:-translate-y-0.5`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white">
                  {t.tierLabel}
                </div>
                <div className="mt-4 font-display text-2xl font-extrabold text-foreground">{t.label}</div>
                <p className="mt-1.5 text-sm text-foreground-dim leading-relaxed">{t.shortDesc}</p>
                <div className="mt-4 font-display text-sm font-bold text-accent">Start {t.label} &rarr;</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Unit spine preview */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground-dim text-center">
          The Step 1 / Year 1 spine
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm font-semibold text-foreground"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full font-display text-[10px] font-bold text-white"
                style={{ background: u.color }}
              >
                {u.mono}
              </span>
              {u.label}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-xs text-foreground-dim">
          More tiers in the works &mdash; Step 2 CK, Step 3, Med-Surg, NCLEX
          Prep &mdash; shown as a locked roadmap inside each track.
        </p>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-center text-xs text-foreground-dim border-t border-border">
        Casebook &middot; built for learning, not a medical or legal device.
      </footer>
    </main>
  );
}
