import Image from "next/image";
import heroImg from "@/assets/images/hero-melancia.webp";
import { stats } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section id="inicio" className="relative bg-black text-white">
      {/* Foto — fundo total no mobile, coluna direita no desktop */}
      <div className="absolute inset-0 lg:hidden" aria-hidden>
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[62%_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.95))]" />
      </div>

      <div className="container-site relative">
        <div className="grid min-h-[min(calc(100svh-72px),720px)] items-center gap-8 py-14 sm:min-h-0 sm:py-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-10 lg:py-16">
          {/* Texto */}
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
                <ButtonLink href="#cotacao" size="lg" className="w-full sm:w-auto lg:px-5">
                  Solicite uma cotação
                </ButtonLink>
                <ButtonLink href="#produtos" variant="outline-white" size="lg" className="w-full sm:w-auto lg:px-5">
                  Conheça nossos produtos
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Foto desktop */}
          <Reveal delay={120} className="relative hidden lg:block">
            <div className="relative aspect-[1.08/1] w-full overflow-hidden rounded-[28px] bg-neutral-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src={heroImg}
                alt="Melancias empilhadas no galpão da JR Frutas, prontas para expedição"
                fill
                priority
                sizes="(min-width: 1280px) 620px, 50vw"
                placeholder="blur"
                className="object-cover object-[55%_45%] transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]" />
            </div>
          </Reveal>
        </div>

        {/* Métricas / autoridade */}
        <Reveal delay={200} className="relative pb-10 sm:pb-14">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/20 bg-white/15 lg:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                data-pending={s.pending ? "" : undefined}
                title={s.pending ? "Dado pendente de confirmação" : undefined}
                className="flex min-h-[104px] items-center gap-3 bg-black px-4 py-5 sm:gap-4 sm:px-7 lg:min-h-[112px]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-white sm:size-11">
                  <Icon name={s.icon} size={20} />
                </span>
                <div>
                  <p className="text-[1.3rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.6rem]">{s.value}</p>
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
