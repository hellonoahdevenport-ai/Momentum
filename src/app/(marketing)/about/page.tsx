import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description: "What Casebook is building, and what’s still open.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Badge tone="accent">About</Badge>
      <h1 className="font-display mt-4 text-4xl font-extrabold text-foreground">Practice before it counts</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground-dim">
        Casebook (a working title) is an early-stage education product for medicine and nursing students. The goal
        is simple to say and hard to build well: let a trainee work a full case — interview, evidence, reasoning,
        plan, debrief — the way they actually will in practice, with honest feedback instead of just a score.
      </p>
      <p className="mt-4 text-base leading-relaxed text-foreground-dim">
        Casebook is for education and simulation only. It is not a clinical decision-support tool, and it does not
        replace supervision, local policy, clinical judgment, or professional care. Every case is fictional.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-6">
        <h2 className="font-display text-base font-bold text-foreground">Team</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
          Team bios aren’t published here yet — this placeholder exists so the page structure is ready once there
          are verified credentials to show. We won’t invent names, titles, or qualifications to fill the space.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-6">
        <h2 className="font-display text-base font-bold text-foreground">Where things stand</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground-dim">
          <li>One fully authored, playable case per track today; the rest of the curriculum map is planned.</li>
          <li>No case has completed a licensed clinician or nursing-faculty review yet — each one says so.</li>
          <li>No real accounts, payments, or production hosting exist yet; the demo runs on seeded local data.</li>
        </ul>
      </div>
    </div>
  );
}
