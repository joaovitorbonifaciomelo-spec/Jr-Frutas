import Image from "next/image";
import { clients } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Quem confia, recomenda." — faixa de logos reais dos clientes (public/partners).
 * Logos brancos originais (sem conversão), em caixas de altura equivalente com
 * object-fit: contain; desktop em uma linha, mobile em grid 2×3.
 */
export function Clients() {
  return (
    <section id="clientes" className="bg-black text-white">
      <div className="container-site py-12 sm:py-14 lg:py-16">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="eyebrow text-white/55">Clientes e parceiros</p>
          <h2 className="h-section text-[1.5rem] sm:text-[1.7rem]">Quem confia, recomenda.</h2>
        </Reveal>

        <Reveal delay={80} className="mt-8 sm:mt-10">
          <ul
            aria-label="Clientes e parceiros"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-8"
          >
            {clients.map((c) => (
              <li key={c.name} className="flex items-center justify-center">
                <div className="flex h-12 w-[132px] items-center justify-center sm:h-14 sm:w-[150px] lg:h-16 lg:w-[160px]">
                  <Image
                    src={c.src}
                    alt={c.name}
                    title={c.name}
                    width={c.width}
                    height={c.height}
                    sizes="160px"
                    className="max-h-full w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
