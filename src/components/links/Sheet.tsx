"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { Close } from "@/components/ui/Icons";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

const CLOSE_DISTANCE = 90; // px de arrasto para fechar

/**
 * Bottom sheet em vidro preto/neutro. Sem libs.
 * - dialog + foco no fechar + Esc + toque fora + swipe down
 * - fica sempre montado (transição de saída), `inert` quando fechado
 * - trava o scroll do fundo compensando a barra de rolagem (sem layout shift)
 */
export function Sheet({ open, onClose, title, description, children }: Props) {
  const uid = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const dragRef = useRef(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (gutter > 0) html.style.paddingRight = `${gutter}px`;
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      html.style.paddingRight = "";
      setDrag(0);
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  // ---- swipe down (só quando o conteúdo interno está no topo) ----
  const onTouchStart = (e: TouchEvent) => {
    if ((scrollRef.current?.scrollTop ?? 0) > 0) return;
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (startY.current === null) return;
    const dy = Math.max(0, e.touches[0].clientY - startY.current);
    dragRef.current = dy;
    setDrag(dy);
  };
  const onTouchEnd = () => {
    if (startY.current === null) return;
    startY.current = null;
    setDragging(false);
    if (dragRef.current > CLOSE_DISTANCE) onClose();
    dragRef.current = 0;
    setDrag(0);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-400 ${open ? "visible" : "invisible delay-400"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-t`}
        aria-describedby={description ? `${uid}-d` : undefined}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{ transform: open ? `translateY(${drag}px)` : "translateY(100%)" }}
        className={`absolute inset-x-0 bottom-0 mx-auto w-full max-w-[480px] glass-sheet rounded-t-[26px] px-5 pt-3 pb-[max(20px,env(safe-area-inset-bottom))] text-white ease-[var(--ease-out-soft)] sm:px-6 ${
          dragging ? "transition-none" : "transition-transform duration-400"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/30" aria-hidden />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={`${uid}-t`} className="text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em]">
              {title}
            </h2>
            {description ? (
              <p id={`${uid}-d`} className="mt-1 text-[0.88rem] text-white/65">
                {description}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white hover:text-black active:bg-white active:text-black"
          >
            <Close size={20} />
          </button>
        </div>
        <div ref={scrollRef} className="mt-5 max-h-[60dvh] overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
