"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/tracks/medicine", label: "Medicine" },
  { href: "/tracks/nursing", label: "Nursing" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-display text-sm font-extrabold text-white">
            C
          </span>
          <span className="font-display text-lg font-bold text-foreground">Casebook</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="focus-ring rounded text-sm font-semibold text-foreground-dim transition hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/app"
            className="btn-press focus-ring rounded-xl bg-accent px-4 py-2.5 font-display text-sm font-bold text-white shadow-sm shadow-accent/20 hover:bg-accent-dark"
          >
            Explore the demo
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M1 4H17M1 9H17M1 14H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-border px-5 pb-5 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-2 py-2.5 text-[15px] font-semibold text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="btn-press focus-ring mt-3 block rounded-xl bg-accent px-4 py-3 text-center font-display text-sm font-bold text-white"
          >
            Explore the demo
          </Link>
        </nav>
      )}
    </header>
  );
}
