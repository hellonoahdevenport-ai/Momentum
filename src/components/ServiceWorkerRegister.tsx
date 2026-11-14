"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    try {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures should never affect the page.
      });
    } catch {
      // Ignore — offline support is a progressive enhancement only.
    }
  }, []);

  return null;
}
