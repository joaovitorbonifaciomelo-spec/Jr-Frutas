import { quoteWhatsappLink, stats } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate bg-black text-white">
      {/* Vídeo real da operação em full background (mesmo conceito da Frutas Beca) */}
      <HeroVideo className="absolute inset-0 -z-10" />

      <div className="container-site relative">
        {/* Conteúdo à esquerda, por cima do vídeo */}
        <div className="flex min-h-[min(calc(100svh-72px),640px)] items-center py-14 sm:py-20 lg:min-h-[600px] lg:py-24">
          <div className="max-w-[640px]">
            <Reveal>
              <h1 className="h-display [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
                Qualidade que começa no campo. Confiança que chega até o seu negócio.
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-white/85 sm:text-[1.1rem] [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                Frutas selecionadas com rigor, logística inteligente e atendimento dedicado para o seu negócio crescer.
              </p>
            </Reveal>
            <Reveal delay={170}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {/* CTA de cotação → WhatsApp da Unidade Goiânia */}
                <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" size="lg" className="w-full sm:w-auto lg:px-5">
                  Solicite uma cotação
                </ButtonLink>
                <ButtonLink href="#produtos" variant="outline-white" size="lg" className="w-full sm:w-auto lg:px-5">
                  Conheça nossos produtos
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Faixa de indicadores — 4 itens lado a lado no desktop */}
        <Reveal delay={200} className="relative pb-10 sm:pb-14">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/22 bg-white/15 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="flex min-h-[104px] items-center gap-3 bg-black/90 px-4 py-5 backdrop-blur-sm sm:gap-4 sm:px-7 lg:min-h-[116px]">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-white sm:size-12">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <p className="font-display text-[1.3rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.7rem]">{s.value}</p>
                  <p className="mt-1.5 text-[0.7rem] font-bold uppercase leading-snug tracking-[0.08em] text-white/70 sm:tracking-[0.12em]">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
