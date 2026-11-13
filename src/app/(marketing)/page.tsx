import Link from "next/link";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import Badge from "@/components/ui/Badge";
import ProductPreview from "@/components/marketing/ProductPreview";

const FAQS = [
  {
    q: "Is this a real patient or a clinical tool?",
    a: "No. Every case is fictional and built for education and simulation only. Casebook is not a clinical decision-support tool and never replaces supervision, local policy, clinical judgment, or professional care.",
  },
  {
    q: "Do I need an account to try it?",
    a: "No. The demo runs on seeded local data with no sign-up and no API key required. A real account system is planned before any personal progress is stored.",
  },
  {
    q: "Has the case content been reviewed by a clinician?",
    a: "Not yet. Every case clearly shows a content-review status. Nothing is labeled clinically validated unless an actual clinician or nursing-faculty review has happened and been recorded.",
  },
  {
    q: "Is Casebook the final product name?",
    a: "Casebook is a working title. Name, pricing, and company details are still open.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge tone="coral">Working title · early build</Badge>
            <h1 className="font-display mt-5 text-[40px] font-extrabold leading-[1.08] text-foreground sm:text-[52px]">
              Practice clinical reasoning before it counts.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground-dim">
              Casebook is a learning environment for medicine and nursing students: interview a fictional patient,
              gather evidence, commit to a call, and get a transparent debrief &mdash; for education and simulation
              only.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/app"
                className="btn-press focus-ring rounded-xl bg-accent px-6 py-3.5 font-display font-bold text-white shadow-sm shadow-accent/20 hover:bg-accent-dark"
              >
                Explore the demo &rarr;
              </Link>
              <Link
                href="/how-it-works"
                className="focus-ring rounded-xl border border-border px-6 py-3.5 font-display font-bold text-foreground hover:border-border-strong"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-xs text-foreground-dim">No account or API key needed to explore the demo.</p>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-display text-center text-sm font-bold uppercase tracking-wider text-foreground-dim">
            The gap this fills
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Reading isn’t doing",
                body: "Flashcards and question banks test recall. They rarely make you ask the next question, choose a workup, or commit to a call under uncertainty.",
              },
              {
                title: "Real patients are high-stakes",
                body: "Trainees need somewhere lower-stakes to practice the full loop — interview, evidence, reasoning, plan — before it’s a real encounter.",
              },
              {
                title: "Feedback is often just a score",
                body: "A percentage doesn’t tell you what you missed or why. A real debrief should show the reasoning, not just the result.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border p-6">
                <div className="font-display text-base font-bold text-foreground">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-dim">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-center text-sm font-bold uppercase tracking-wider text-foreground-dim">
          The Casebook loop
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "1", title: "Interview", desc: "Ask a fictional patient about their history. Findings come out through your questions, not a dumped chart." },
            { n: "2", title: "Evidence", desc: "Order the labs, imaging, or assessments you think matter. Each one carries a cost and teaching note." },
            { n: "3", title: "Reasoning", desc: "Commit to a leading diagnosis or priority, log your confidence, and name what would change your mind." },
            { n: "4", title: "Debrief", desc: "See exactly what was right, what was missed, and why — with the full rubric, not just a score." },
          ].map((s) => (
            <div key={s.n} className="card-lift rounded-2xl border border-border bg-surface p-5">
              <div className="font-display text-2xl font-extrabold text-accent">{s.n}</div>
              <div className="mt-2 font-display text-base font-bold text-foreground">{s.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-center text-sm font-bold uppercase tracking-wider text-foreground-dim">
            Two tracks, built for their own scope
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-foreground-dim">
            Medicine follows a diagnostic loop. Nursing follows the clinical judgment cycle &mdash; nursing isn&rsquo;t
            medicine with the labels swapped.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {TRACK_ORDER.map((key) => {
              const t = TRACKS[key];
              return (
                <Link
                  key={key}
                  href={`/tracks/${key}`}
                  className={`track-${key} card-lift group rounded-3xl bg-accent-soft p-7`}
                >
                  <Badge tone={key === "medicine" ? "accent" : "teal"}>{t.tierLabel}</Badge>
                  <div className="mt-4 font-display text-2xl font-extrabold text-foreground">{t.label}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-dim">{t.shortDesc}</p>
                  <div className="mt-4 text-xs font-semibold text-foreground-dim">{t.loopStages.join(" → ")}</div>
                  <div className="mt-4 font-display text-sm font-bold text-accent">Explore {t.label} &rarr;</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-center text-sm font-bold uppercase tracking-wider text-foreground-dim">
          A curriculum you can see end to end
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-foreground-dim">
          {UNITS.length} organ-system and competency units on the map today. One case is authored and playable right
          now &mdash; the rest are shown honestly as planned.
        </p>
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
        <div className="mt-8 flex justify-center">
          <Link href="/curriculum" className="focus-ring font-display text-sm font-bold text-accent">
            See the full curriculum map &rarr;
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-foreground">For educators and schools</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground-dim">
                An educator workspace for assignments, learner progress, and content review sits alongside the
                learner experience. It&rsquo;s an early, scoped MVP today &mdash; built, server-permissioned, and
                ready to grow with real cohorts.
              </p>
              <Link href="/educator" className="focus-ring mt-4 inline-block font-display text-sm font-bold text-accent">
                Preview the educator workspace &rarr;
              </Link>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold text-foreground">Builder &amp; owner access</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground-dim">
                A builder preview can inspect every track, unit, and case, and switch between learner, educator, and
                owner views &mdash; useful for the team shaping the curriculum before it ships to real cohorts.
              </p>
              <Link href="/admin" className="focus-ring mt-4 inline-block font-display text-sm font-bold text-accent">
                Preview the owner workspace &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-center text-2xl font-extrabold text-foreground">Questions</h2>
        <div className="mt-8 flex flex-col divide-y divide-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded font-display text-[15px] font-bold text-foreground">
                {f.q}
                <span className="ml-3 text-foreground-dim transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground-dim">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl bg-accent-soft px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground">Try the first case now</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-foreground-dim">
            Maya Chen&rsquo;s case is fully playable, start to debrief, with no sign-up required.
          </p>
          <Link
            href="/app"
            className="btn-press focus-ring mt-6 inline-block rounded-xl bg-accent px-7 py-3.5 font-display font-bold text-white hover:bg-accent-dark"
          >
            Explore the demo &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
