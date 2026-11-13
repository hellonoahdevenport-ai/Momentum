import Link from "next/link";
import { getServerRole } from "@/lib/getServerRole";
import { RoleProvider } from "@/context/RoleContext";
import RoleSwitcher from "@/components/app/RoleSwitcher";
import UnauthorizedNotice from "@/components/app/UnauthorizedNotice";
import { listCases } from "@/lib/cases/registry";
import { TRACK_ORDER, TRACKS } from "@/lib/tracks";
import { UNITS } from "@/lib/units";
import Badge from "@/components/ui/Badge";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  const role = await getServerRole();
  if (role !== "owner") {
    return (
      <RoleProvider>
        <UnauthorizedNotice requiredRole="owner" />
      </RoleProvider>
    );
  }

  const cases = listCases();

  return (
    <RoleProvider>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <Link href="/app" className="focus-ring font-display text-sm font-bold text-accent">
              &larr; Back to learner app
            </Link>
            <h1 className="font-display mt-1 text-xl font-bold text-foreground">Owner / builder control center</h1>
          </div>
          <RoleSwitcher compact />
        </div>
      </header>

      <main className="mx-auto max-w-6xl flex-1 px-5 py-8 sm:px-8">
        <p className="max-w-xl text-sm leading-relaxed text-foreground-dim">
          Full visibility into every track, unit, and case, regardless of any learner’s progress. This access is
          gated by the demo role cookie read server-side — see the note in Settings about replacing it with real
          authentication before launch.
        </p>

        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">Every unit, every track</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {TRACK_ORDER.map((trackKey) => (
              <div key={trackKey} className="rounded-2xl border border-border bg-surface p-5">
                <div className="font-display text-base font-bold text-foreground">{TRACKS[trackKey].label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {UNITS.map((u) => {
                    const hasCase = cases.some((c) => c.meta.trackKey === trackKey && c.meta.unitKey === u.key);
                    return (
                      <Link
                        key={u.key}
                        href={`/app/learn/${trackKey}/${u.key}`}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${hasCase ? "bg-accent-soft text-accent" : "bg-surface-2 text-foreground-dim"}`}
                      >
                        {u.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-foreground">Case review status</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {cases.map((c) => (
              <div key={c.meta.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.meta.title}</div>
                  <div className="text-xs text-foreground-dim">v{c.meta.version} &middot; {c.meta.author}</div>
                </div>
                <ReviewStatusBadge status={c.meta.reviewStatus} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-foreground">Feature flags</h2>
          <p className="mt-2 max-w-lg text-sm text-foreground-dim">
            No real feature-flag service is wired up yet. Today, the only environment-driven flag is whether an
            Anthropic API key is set — when it’s absent, the interview falls back to fully scripted dialogue.
          </p>
          <Badge tone="neutral" className="mt-2">
            Static — not yet configurable at runtime
          </Badge>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-foreground">Usage &amp; errors</h2>
          <p className="mt-2 max-w-lg text-sm text-foreground-dim">
            No analytics or error-tracking service is connected in this build. Before adding one, it should be
            disclosed on the Privacy page with an opt-out, per this product’s own privacy commitments.
          </p>
        </section>
      </main>
    </RoleProvider>
  );
}
