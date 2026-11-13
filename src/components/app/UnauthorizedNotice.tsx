import Link from "next/link";

export default function UnauthorizedNotice({ requiredRole }: { requiredRole: string }) {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
      <h1 className="font-display text-2xl font-bold text-foreground">This view needs {requiredRole} access</h1>
      <p className="mt-3 text-sm leading-relaxed text-foreground-dim">
        This demo uses a client-settable preview role, not real authentication — switch your preview role in
        Settings to see this page. A real deployment would enforce this with server-side accounts instead.
      </p>
      <Link href="/app/settings" className="btn-press focus-ring mt-6 inline-block rounded-xl bg-accent px-5 py-2.5 font-display text-sm font-bold text-white">
        Go to settings
      </Link>
    </div>
  );
}
