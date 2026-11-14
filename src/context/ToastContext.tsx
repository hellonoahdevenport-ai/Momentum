"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export interface ToastItem {
  id: string;
  title: string;
  body?: string;
  tone: "accent" | "good" | "warn" | "bad";
}

interface ToastContextValue {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toasts: [], push: () => {}, dismiss: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((item) => item.id !== id));
  }, []);

  const push = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((t) => [...t, { ...toast, id }]);
      setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  return <ToastContext.Provider value={{ toasts, push, dismiss }}>{children}</ToastContext.Provider>;
}

export function useToast() {
  return useContext(ToastContext);
}
