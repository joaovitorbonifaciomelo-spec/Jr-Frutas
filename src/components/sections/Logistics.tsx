import { quoteWhatsappLink, unitMessage, units, unitWhatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { BrazilMap } from "@/components/ui/BrazilMap";
import { MapPin, WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Logistics() {
  return (
    <section id="logistica" className="bg-white text-black">
      <div className="container-site py-14 sm:py-20 lg:py-24">
        {/* Desktop: texto/unidades/CTA | mapa · Mobile: headline → texto → unidades → mapa → CTA */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div className="contents lg:block">
            <div>
              <Reveal>
                <h2 className="h-section max-w-[16ch]">Logística inteligente. Cobertura que gera resultado.</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-black/65">
                  Atendemos Goiás, Distrito Federal e entorno com eficiência, a partir de operações estratégicas em Goiânia e
                  Brasília.
                </p>
              </Reveal>
              {/* Cards das unidades → WhatsApp da unidade */}
              <Reveal delay={150} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                {units.map((u) => (
                  <UnitPill key={u.id} unit={u} />
                ))}
              </Reveal>
            </div>

            {/* Mapa (no mobile fica entre as unidades e o CTA) */}
            <Reveal delay={120} className="mx-auto w-full max-w-[560px] lg:hidden">
              <BrazilMap className="h-auto w-full" />
            </Reveal>

            <Reveal delay={220} className="lg:mt-8">
              {/* CTA de cotação → WhatsApp Goiânia (regra comercial do site) */}
              <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" variant="black" className="w-full sm:w-auto">
                Solicite uma cotação
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={120} className="mx-auto hidden w-full max-w-[560px] lg:block">
            <BrazilMap className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UnitPill({ unit }: { unit: (typeof units)[number] }) {
  const href = unitWhatsappLink(unit, unitMessage(unit.city)) ?? `tel:${unit.phoneE164}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`WhatsApp ${unit.name}: ${unit.phone}`}
      className="group inline-flex min-h-14 items-center gap-4 rounded-[var(--radius-pill)] bg-black px-5 py-3.5 text-white transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-black">
        <MapPin size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[0.82rem] font-extrabold">{unit.name}</span>
        <span className="block text-[0.82rem] text-white/75">{unit.phone}</span>
      </span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/30 text-white/80 transition-[background-color,color] duration-300 group-hover:bg-white group-hover:text-black">
        <WhatsApp size={15} />
      </span>
    </a>
  );
}
