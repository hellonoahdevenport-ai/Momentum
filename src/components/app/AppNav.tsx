"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import RoleSwitcher from "@/components/app/RoleSwitcher";
import NotificationCenter from "@/components/app/NotificationCenter";

const PRIMARY_LINKS = [
  { href: "/app", label: "Home", icon: "home" },
  { href: "/app/tracks", label: "Learn", icon: "learn" },
  { href: "/app/library", label: "Cases", icon: "cases" },
  { href: "/app/review", label: "Review", icon: "review" },
  { href: "/app/progress", label: "Progress", icon: "progress" },
] as const;

function Icon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" as const, "aria-hidden": true as const };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9.5 10 3l7 6.5V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "learn":
      return (
        <svg {...common}>
          <path d="M3 5.5 10 3l7 2.5-7 2.5-7-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5.5 7.3V12c0 1 2 2.3 4.5 2.3S14.5 13 14.5 12V7.3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "cases":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7.5 5.5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "review":
      return (
        <svg {...common}>
          <path d="M4 10a6 6 0 1 1 1.8 4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 14.5V10h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "progress":
      return (
        <svg {...common}>
          <path d="M4 16V11M9 16V7M14 16V4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AppNav() {
  const pathname = usePathname();
  const { role, ready } = useRole();

  function isActive(href: string) {
    if (href === "/app") return pathname === "/app";
    return pathname?.startsWith(href);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link href="/app" className="focus-ring flex items-center gap-2 rounded-lg">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-display text-sm font-extrabold text-white">
              M
            </span>
            <span className="font-display hidden text-base font-bold text-foreground sm:inline">Momentum</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive(l.href) ? "bg-accent-soft text-accent" : "text-foreground-dim hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {ready && role !== "learner" && (
              <Link href={role === "owner" ? "/admin" : "/educator"} className="focus-ring hidden text-xs font-bold text-accent sm:block">
                {role === "owner" ? "Owner view →" : "Educator view →"}
              </Link>
            )}
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
              className="focus-ring hidden items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground-dim hover:text-foreground sm:flex"
              aria-label="Open command palette"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <kbd className="font-data text-[10px]">&#8984;K</kbd>
            </button>
            <NotificationCenter />
            <RoleSwitcher compact />
            <Link href="/app/settings" className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-dim hover:text-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.3 3.3l1.1 1.1M11.6 11.6l1.1 1.1M3.3 12.7l1.1-1.1M11.6 4.4l1.1-1.1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
          {PRIMARY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`focus-ring flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
                isActive(l.href) ? "text-accent" : "text-foreground-dim"
              }`}
            >
              <Icon name={l.icon} />
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
