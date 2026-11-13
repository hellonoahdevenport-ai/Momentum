import Link from "next/link";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/curriculum", label: "Curriculum" },
      { href: "/pricing", label: "Pricing" },
      { href: "/app", label: "Explore the demo" },
    ],
  },
  {
    heading: "Tracks",
    links: [
      { href: "/tracks/medicine", label: "Medicine" },
      { href: "/tracks/nursing", label: "Nursing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-bold uppercase tracking-wider text-foreground-dim">{col.heading}</div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="focus-ring rounded text-sm text-foreground-dim hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-foreground-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            Casebook is a working product name. Built for education and simulation only — not a clinical
            decision-support tool, and not a substitute for supervision, local policy, or professional judgment.
          </p>
          <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} Casebook</p>
        </div>
      </div>
    </footer>
  );
}
