import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Draft privacy policy — pending legal review.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Badge tone="warn">Draft — pending legal review</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">Privacy policy (draft)</h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground-dim">
        This is a working draft, not a finished legal document. It should be reviewed by qualified counsel before
        any public, commercial launch, and before this product is sold to or used by any school, clinical program,
        or institution.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground-dim">
        <section>
          <h2 className="font-display text-base font-bold text-foreground">What this demo collects today</h2>
          <p className="mt-2">
            The public demo stores no account data on a server. Learning progress is kept only in your browser’s
            local storage, on your own device, and is never transmitted to us. Clearing your browser data clears it.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Please don’t enter real patient information</h2>
          <p className="mt-2">
            Every case is fictional. Do not enter real patient names, identifiers, or protected health information
            (PHI) anywhere in this product, including the free-text fields.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Before real accounts exist</h2>
          <p className="mt-2">
            Once Momentum stores real account or learner data, this policy will need to cover: what’s collected, why,
            retention periods, data export and deletion, any third-party processors, and applicable law (for
            example, FERPA for schools, and a HIPAA assessment if any deployment context could bring the product
            into scope — not assumed true just because the subject matter is medical). None of that infrastructure
            exists yet.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Analytics and third parties</h2>
          <p className="mt-2">
            No third-party analytics or trackers are enabled by default. If any are added later, this page will
            disclose them and how to opt out before they go live.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Contact</h2>
          <p className="mt-2">A real contact method will be published here before commercial launch.</p>
        </section>
      </div>
    </div>
  );
}
