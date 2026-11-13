import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Casebook’s accessibility target and current status.",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Badge tone="accent">Accessibility</Badge>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-foreground">Our accessibility target</h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground-dim">
        Casebook is being built toward WCAG 2.2 AA as an engineering goal across the marketing site and the learning
        platform. This page describes what’s in place today and what’s still being worked on — it’s a statement of
        intent and current status, not a certification.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground-dim">
        <section>
          <h2 className="font-display text-base font-bold text-foreground">What’s in place</h2>
          <ul className="mt-2 flex flex-col gap-2">
            <li>Semantic HTML landmarks, headings, and labeled form controls throughout.</li>
            <li>Visible keyboard focus rings on every interactive control, including custom components.</li>
            <li>A fixed, high-contrast light theme — no low-contrast gray-on-white or white-on-white states.</li>
            <li><code>prefers-reduced-motion</code> is respected; transitions shorten to near-zero when requested.</li>
            <li>Touch targets sized for mobile, with a visible scroll cue on horizontally scrolling elements.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">What’s still being worked on</h2>
          <ul className="mt-2 flex flex-col gap-2">
            <li>A full screen-reader pass across every case question type, including the ranking interaction.</li>
            <li>Captions or transcripts for any future voice features (voice input/output is off by default today).</li>
            <li>An independent accessibility audit before any public, commercial launch.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-base font-bold text-foreground">Report an issue</h2>
          <p className="mt-2">
            If something doesn’t work with your screen reader, keyboard, or assistive technology, we want to know —
            a dedicated contact channel will be published here before commercial launch.
          </p>
        </section>
      </div>
    </div>
  );
}
