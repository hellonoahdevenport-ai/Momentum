import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent font-display text-lg font-extrabold text-white">
        M
      </span>
      <h1 className="font-display mt-6 text-3xl font-extrabold text-foreground">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-dim">
        This page doesn’t exist, or the unit you’re looking for hasn’t been built yet — check the curriculum map to
        see what’s available.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="btn-press focus-ring rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white hover:bg-accent-dark"
        >
          Back home
        </Link>
        <Link
          href="/curriculum"
          className="focus-ring rounded-xl border border-border px-5 py-2.5 font-display text-sm font-bold text-foreground"
        >
          See the curriculum
        </Link>
      </div>
    </main>
  );
}
