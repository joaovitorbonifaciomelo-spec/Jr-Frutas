import Image from "next/image";
import { quoteWhatsappLink, stats } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section id="inicio" className="relative bg-black text-white">
      <div className="container-site relative">
        {/* Mobile: headline → texto → CTAs → vídeo · Desktop: texto | vídeo */}
        <div className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-10 lg:py-16">
          <div className="max-w-[620px]">
            <Reveal>
              <h1 className="h-display">
                Qualidade que começa no campo. Confiança que chega até o seu negócio.
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-white/80 sm:text-[1.08rem]">
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

          {/* Vídeo real da operação — mesmo frame/raio do design */}
          <Reveal delay={120} className="relative">
            <HeroVideo className="aspect-[4/3] w-full rounded-[22px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:aspect-[1.25/1] lg:aspect-[1.08/1] lg:rounded-[28px]" />
          </Reveal>
        </div>

        {/* Faixa de autoridade — só informação confirmada + produção própria */}
        <Reveal delay={200} className="relative pb-10 sm:pb-14">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/20 bg-white/15 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            {stats.map((s) => (
              <li
                key={s.label}
                className={`flex min-h-[104px] items-center gap-3 bg-black px-4 py-5 sm:gap-4 sm:px-7 lg:min-h-[112px] ${
                  s.featured ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {s.icon === "seal" ? (
                  <Image src="/brand/symbol-white.png" alt="" width={512} height={512} className="size-12 shrink-0 sm:size-14" />
                ) : (
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-white sm:size-11">
                    <Icon name={s.icon} size={20} />
                  </span>
                )}
                <div>
                  <p className="font-display text-[1.3rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.6rem]">{s.value}</p>
                  <p
                    className={`mt-1.5 leading-snug text-white/70 ${
                      s.featured
                        ? "text-[0.84rem] font-semibold"
                        : "text-[0.7rem] font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em]"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
