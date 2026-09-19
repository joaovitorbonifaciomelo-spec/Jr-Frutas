"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ToastState = { message: string; action?: { label: string; onClick: () => void } } | null;

/** Um único toast por vez — nunca empilha. */
export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<number | null>(null);
  const show = useCallback((message: string, action?: NonNullable<ToastState>["action"], ms = 3200) => {
    if (timer.current) window.clearTimeout(timer.current);
    setToast({ message, action });
    timer.current = window.setTimeout(() => setToast(null), ms);
  }, []);
  const hide = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setToast(null);
  }, []);
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  return { toast, show, hide };
}

export function Toast({ toast, onHide }: { toast: ToastState; onHide: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-[max(20px,env(safe-area-inset-bottom))] z-[60] flex justify-center px-5 transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] ${
        toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {toast ? (
        <div className="pointer-events-auto flex max-w-[420px] items-center gap-3 rounded-full border border-white/15 bg-black/80 py-2.5 pr-2.5 pl-4 text-[0.86rem] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <span>{toast.message}</span>
          {toast.action ? (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                onHide();
              }}
              className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-black"
            >
              {toast.action.label}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
