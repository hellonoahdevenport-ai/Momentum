"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "casebook_builder_mode";

interface BuilderModeValue {
  builderMode: boolean;
  setBuilderMode: (value: boolean) => void;
  ready: boolean;
}

const BuilderModeContext = createContext<BuilderModeValue>({
  builderMode: true,
  setBuilderMode: () => {},
  ready: false,
});

export function BuilderModeProvider({ children }: { children: ReactNode }) {
  // Defaults to on: this build has no accounts yet, and you're the one testing it.
  const [builderMode, setBuilderModeState] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Hydrating from a browser-only store after mount, on purpose: reading
      // localStorage during the initial render would mismatch the server HTML.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored !== null) setBuilderModeState(stored === "true");
    } catch {
      // ignore
    }
     
    setReady(true);
  }, []);

  function setBuilderMode(value: boolean) {
    setBuilderModeState(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // ignore
    }
  }

  return (
    <BuilderModeContext.Provider value={{ builderMode, setBuilderMode, ready }}>
      {children}
    </BuilderModeContext.Provider>
  );
}

export function useBuilderMode(): BuilderModeValue {
  return useContext(BuilderModeContext);
}
