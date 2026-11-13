import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms",
  description: "Draft terms of use — pending legal review.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Badge tone="warn">Draft — pending legal review</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">Terms of use (draft)</h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground-dim">
        This is a working draft, not a finished legal document. It should be reviewed by qualified counsel before
        any public, commercial launch.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground-dim">
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Educational use only</h2>
          <p className="mt-2">
            Casebook is for education and simulation only. It is not a clinical decision-support tool, and it must
            never be used as a substitute for supervision, local policy, clinical judgment, or professional care.
            Every patient, case, and result in this product is fictional.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">No warranty of clinical accuracy</h2>
          <p className="mt-2">
            Case content is clearly marked with a review status. Content marked &ldquo;needs clinical review&rdquo; has not been
            checked by a licensed clinician or nursing faculty member and should not be relied on as authoritative.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">No real patient data</h2>
          <p className="mt-2">
            Do not submit real patient information, including protected health information (PHI), into any field in
            this product.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Product name and availability</h2>
          <p className="mt-2">
            &ldquo;Casebook&rdquo; is a working title and may change. Features described on this site may be planned rather
            than available today — the curriculum map and each page say which is which.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Changes</h2>
          <p className="mt-2">These terms may change as the product develops. A dated changelog will be added before commercial launch.</p>
        </section>
      </div>
    </div>
  );
}
