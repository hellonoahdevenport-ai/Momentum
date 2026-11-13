"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/educator", label: "Overview" },
  { href: "/educator/courses", label: "Courses" },
  { href: "/educator/learners", label: "Learners" },
  { href: "/educator/assignments", label: "Assignments" },
  { href: "/educator/analytics", label: "Analytics" },
  { href: "/educator/content-review", label: "Content review" },
];

export default function EducatorNav() {
  const pathname = usePathname();
  return (
    <nav className="scrollbar-thin -mx-5 flex gap-1 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
      {LINKS.map((l) => {
        const active = l.href === "/educator" ? pathname === l.href : pathname?.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`focus-ring whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${
              active ? "bg-accent-soft text-accent" : "text-foreground-dim hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
