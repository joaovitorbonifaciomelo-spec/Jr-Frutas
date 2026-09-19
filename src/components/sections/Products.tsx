import Image, { type StaticImageData } from "next/image";
import abacaxi from "@/assets/images/abacaxi-corte.webp";
import melancia from "@/assets/images/melancia-fatia.webp";
import cocoSeco from "@/assets/images/coco-seco.webp";
import cocoVerde from "@/assets/images/coco-verde.webp";
import melao from "@/assets/images/melao-corte.webp";
import { products, unitWhatsappLink, units, type Product } from "@/data/site";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const images: Record<Product["image"], StaticImageData> = { abacaxi, melancia, cocoSeco, cocoVerde, melao };

/* Não existe página /produtos: o CTA da seção pede a lista completa pelo WhatsApp (Unidade Goiânia). */
const listHref =
  unitWhatsappLink(units[0], "Olá! Vim pelo site da JR Frutas e gostaria de receber a lista completa de produtos e a cotação do dia.") ??
  "#cotacao";

export function Products() {
  return (
    <section id="produtos" className="bg-white text-black">
      <div className="container-site py-14 sm:py-20 lg:py-24">
        {/* Cabeçalho desktop */}
        <Reveal className="hidden items-end justify-between gap-8 sm:flex">
          <div>
            <p className="eyebrow text-black/55">Nosso portfólio</p>
            <h2 className="h-section mt-3 max-w-[16ch]">Frutas selecionadas para o seu negócio.</h2>
          </div>
          <ButtonLink href={listHref} variant="outline-black" target="_blank" rel="noopener">
            Solicitar lista de produtos
          </ButtonLink>
        </Reveal>

        {/* Cabeçalho mobile */}
        <Reveal className="flex items-end justify-between gap-4 sm:hidden">
          <h2 className="h-section">Nossos produtos</h2>
          <TextLink href={listHref} className="mb-1 shrink-0 text-black">
            Lista completa
          </TextLink>
        </Reveal>

        {/* Mobile: carrossel horizontal (≈1.3 cards por viewport) · Desktop: grid 4 colunas */}
        <ul
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-6 lg:gap-5 xl:grid-cols-5 xl:gap-4"
          aria-label="Produtos"
        >
          {products.map((p, i) => (
            <Reveal
              as="li"
              key={p.slug}
              delay={i * 70}
              className={`w-[76vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none lg:col-span-2 xl:col-span-1 xl:col-start-auto ${i === 3 ? "lg:col-start-2" : ""}`}
            >
              <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-black/10 bg-white p-3 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                <div className="relative aspect-[1/1] overflow-hidden rounded-[14px] bg-black">
                  <Image
                    src={images[p.image]}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 220px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 76vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-60px_60px_-30px_rgba(0,0,0,0.55)]" />
                </div>
                <div className="flex flex-1 flex-col px-2 pt-5 pb-3 xl:px-1">
                  <h3 className="h-card">{p.name}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-black/65">{p.short}</p>
                  <details className="group/d mt-auto pt-5">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
                      <span className="group-open/d:hidden">Saiba mais</span>
                      <span className="hidden group-open/d:inline">Fechar</span>
                      <ArrowRight size={15} className="transition-transform duration-300 group-open/d:rotate-90" />
                    </summary>
                    <p className="mt-3 text-[0.88rem] leading-relaxed text-black/70">{p.description}</p>
                  </details>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
