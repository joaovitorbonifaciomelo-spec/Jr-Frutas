import Image, { type StaticImageData } from "next/image";
import campo from "@/assets/images/campo-caminhao.webp";
import frutas from "@/assets/images/coco-verde-estoque.webp";
import carregamento from "@/assets/images/carregamento.webp";
import estrutura from "@/assets/images/galpao-abacaxi.webp";
import { operationHighlights } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const mosaic: { src: StaticImageData; alt: string; pos?: string }[] = [
  { src: campo, alt: "Caminhão sendo carregado com abacaxis direto no campo", pos: "object-[50%_60%]" },
  { src: frutas, alt: "Cocos verdes armazenados em grande volume", pos: "object-[50%_30%]" },
  { src: carregamento, alt: "Equipe carregando abacaxis no caminhão", pos: "object-[50%_70%]" },
  { src: estrutura, alt: "Galpão de armazenagem com abacaxis e caixas organizadas", pos: "object-[50%_55%]" },
];

export function Operation() {
  return (
    <section id="producao" className="bg-black text-white">
      <div className="container-site py-14 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          {/* Mobile: imagem grande primeiro */}
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-neutral-900 lg:hidden">
            <Image src={campo} alt={mosaic[0].alt} fill sizes="(min-width: 640px) 90vw, 100vw" placeholder="blur" className="object-cover object-[50%_60%]" />
          </Reveal>

          <div className="lg:order-1">
            <Reveal>
              <h2 className="h-section max-w-[18ch]">Produção, operação e qualidade que geram confiança.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-[42ch] text-[1rem] leading-relaxed text-white/72">
                Cuidamos de cada etapa para entregar frutas com frescor, segurança e regularidade para o seu negócio.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="mt-7 space-y-3">
                {operationHighlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-black">
                      <Check size={13} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220} className="mt-8">
              <ButtonLink href="#quem-somos" className="w-full sm:w-auto">
                Conheça nossa operação
              </ButtonLink>
            </Reveal>
          </div>

          {/* Desktop: mosaico 2x2 */}
          <div className="hidden grid-cols-2 gap-4 lg:order-2 lg:grid">
            {mosaic.map((m, i) => (
              <Reveal key={m.alt} delay={i * 80} className="group relative aspect-[1.25/1] overflow-hidden rounded-[16px] bg-neutral-900">
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1280px) 330px, 28vw"
                  placeholder="blur"
                  className={`object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] ${m.pos ?? ""}`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[16px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
