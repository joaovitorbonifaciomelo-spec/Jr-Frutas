"use client";

import Image from "next/image";
import { useRef } from "react";
import { clients } from "@/data/site";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Clients() {
  const track = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section id="clientes" className="bg-black text-white">
      <div className="container-site py-12 sm:py-14 lg:py-16">
        <Reveal>
          <h2 className="h-section text-[1.5rem] sm:text-center sm:text-[1.7rem]">Quem confia, recomenda.</h2>
        </Reveal>

        <Reveal delay={80} className="relative mt-8 flex items-center gap-3 sm:mt-10">
          <NavButton dir={-1} onClick={() => scrollBy(-1)} />
          <ul
            ref={track}
            aria-label="Clientes"
            className="no-scrollbar flex flex-1 snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth py-2 lg:gap-6"
          >
            {clients.map((c) => (
              <li key={c.name} className="shrink-0 snap-start">
                {c.src ? (
                  <div className="flex h-[72px] w-[160px] items-center justify-center opacity-85 transition-opacity duration-300 hover:opacity-100 lg:w-[180px]">
                    <Image src={c.src} alt={c.name} width={180} height={72} className="max-h-[52px] w-auto object-contain" />
                  </div>
                ) : (
                  /* PLACEHOLDER: substituir por logo real em /public/clients e apontar `src` em data/site.ts */
                  <div
                    data-pending=""
                    title="Logo de cliente pendente"
                    className="flex h-[72px] w-[160px] items-center justify-center rounded-[10px] border border-dashed border-white/30 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/50 lg:w-[180px]"
                  >
                    {c.name}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <NavButton dir={1} onClick={() => scrollBy(1)} />
        </Reveal>
      </div>
    </section>
  );
}

function NavButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Próximos clientes" : "Clientes anteriores"}
      className="hidden size-11 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-[background-color,color] duration-300 hover:bg-white hover:text-black sm:grid"
    >
      {dir === 1 ? <ChevronRight /> : <ChevronLeft />}
    </button>
  );
}
