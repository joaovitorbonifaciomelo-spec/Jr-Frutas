import Image from "next/image";
import estrutura from "@/assets/images/coco-caminhao.webp";
import { aboutHighlights } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="quem-somos" className="bg-white text-black">
      <div className="container-site py-14 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          {/* Foto: primeiro no mobile (card grande), à direita no desktop */}
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-neutral-200 lg:order-2 lg:aspect-[1.3/1]">
            <Image
              src={estrutura}
              alt="Caminhão da operação JR carregado com cocos verdes na estrada"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_45%] transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] hover:scale-[1.03]"
            />
          </Reveal>

          <div className="lg:order-1">
            <Reveal>
              <p className="eyebrow text-black/55">Quem somos</p>
              <h2 className="h-section mt-3 max-w-[18ch]">Especialistas em distribuição de frutas com excelência.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-black/68">
                A JR Frutas é referência no atacado de frutas em Goiânia e Brasília quando o assunto é qualidade, logística
                e atendimento. Trabalhamos para ser a ponte entre o campo e o seu negócio, com confiança, transparência e
                compromisso em cada entrega.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="mt-8 grid gap-5 sm:grid-cols-3">
                {aboutHighlights.map((h) => (
                  <li key={h.title} className="flex items-center gap-3 sm:flex-col sm:items-start">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/20">
                      <Icon name={h.icon} size={18} />
                    </span>
                    <p className="text-[0.86rem] leading-snug">
                      <span className="block font-extrabold">{h.title}</span>
                      <span className="text-black/65">{h.text}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220} className="mt-8 lg:hidden">
              <ButtonLink href="#cotacao" variant="black" full>
                Conhecer nossa estrutura
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
