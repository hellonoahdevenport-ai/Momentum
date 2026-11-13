"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleSwitcher from "@/components/app/RoleSwitcher";
import { loadProgress } from "@/lib/progress";

export default function SettingsPage() {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  function exportData() {
    const progress = loadProgress();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "casebook-progress-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetData() {
    localStorage.removeItem("casebook_progress_v2");
    setConfirmingReset(false);
    setMessage("Local demo data cleared.");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-extrabold text-foreground">Settings</h1>

      {message && <div className="mt-4 rounded-xl bg-good-soft px-4 py-2.5 text-sm text-good">{message}</div>}

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-base font-bold text-foreground">Demo preview role</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
          This switch lets anyone preview the learner, educator, and owner surfaces locally. It is <strong>not</strong>{" "}
          real authentication — before this product stores real account or learner data, it needs a real login
          system with server-enforced roles.
        </p>
        <div className="mt-4">
          <RoleSwitcher />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-base font-bold text-foreground">Accessibility</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
          Casebook is a fixed light theme by design, with high-contrast text and visible focus states throughout.
          Motion follows your operating system’s reduced-motion setting automatically — there’s nothing to turn on
          here.
        </p>
        <Link href="/accessibility" className="focus-ring mt-3 inline-block font-display text-sm font-bold text-accent">
          Read the full accessibility statement &rarr;
        </Link>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-base font-bold text-foreground">Your local data</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
          Progress is stored only in this browser’s local storage. There is no server account yet, so nothing is
          sent anywhere.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={exportData} className="focus-ring rounded-xl border border-border px-4 py-2.5 font-display text-sm font-bold text-foreground">
            Export my local data
          </button>
          {!confirmingReset ? (
            <button onClick={() => setConfirmingReset(true)} className="focus-ring rounded-xl border border-bad px-4 py-2.5 font-display text-sm font-bold text-bad">
              Delete my local data
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-dim">Delete everything? This can’t be undone.</span>
              <button onClick={resetData} className="btn-press focus-ring rounded-xl bg-bad px-3.5 py-2 font-display text-sm font-bold text-white">
                Yes, delete
              </button>
              <button onClick={() => setConfirmingReset(false)} className="focus-ring rounded-xl border border-border px-3.5 py-2 font-display text-sm font-bold text-foreground-dim">
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-base font-bold text-foreground">Privacy</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-dim">
          Please don’t enter real patient information anywhere in this product — every case is fictional.
        </p>
        <Link href="/privacy" className="focus-ring mt-3 inline-block font-display text-sm font-bold text-accent">
          Read the privacy policy &rarr;
        </Link>
      </section>
    </div>
  );
}
