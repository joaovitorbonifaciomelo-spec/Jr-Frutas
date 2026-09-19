"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** atraso em ms (para escalonar cards) */
  delay?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * Fade/slide discreto ao entrar na viewport.
 * O estado "escondido" só é aplicado quando html[data-js] existe (ver globals.css),
 * então sem JS o conteúdo permanece visível.
 */
export function Reveal({ as: Tag = "div", children, className = "", delay = 0, id, style }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
