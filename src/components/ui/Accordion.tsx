"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "./Icons";

export type AccordionItem = {
  title: ReactNode;
  subtitle?: ReactNode;
  content: ReactNode;
  leading?: ReactNode;
};

type Props = {
  items: AccordionItem[];
  tone?: "dark" | "light";
  defaultOpen?: number | null;
  className?: string;
};

/**
 * Accordion acessível (button + region), abre um item por vez.
 * Animação de altura via grid-template-rows (sem medir DOM).
 */
export function Accordion({ items, tone = "dark", defaultOpen = null, className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  const shell =
    tone === "dark"
      ? "border-white/18 bg-black text-white hover:border-white/40"
      : "border-black/12 bg-white text-black hover:border-black/40";
  const sub = tone === "dark" ? "text-white/60" : "text-black/60";
  const body = tone === "dark" ? "text-white/72" : "text-black/70";

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b-${i}`;
        const panelId = `${uid}-p-${i}`;
        return (
          <li key={i} className={`rounded-[var(--radius-pill)] border transition-colors duration-300 ${shell}`}>
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
            >
              {item.leading ? <span className="shrink-0">{item.leading}</span> : null}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.98rem] font-extrabold leading-snug sm:text-[1.02rem]">{item.title}</span>
                {item.subtitle ? <span className={`mt-0.5 block text-[0.86rem] leading-snug ${sub}`}>{item.subtitle}</span> : null}
              </span>
              <Plus
                size={18}
                className={`shrink-0 transition-transform duration-300 ease-[var(--ease-out-soft)] ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-soft)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`px-4 pb-5 text-[0.92rem] leading-relaxed sm:px-5 ${body} ${item.leading ? "sm:pl-[68px]" : ""}`}>
                  {item.content}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
