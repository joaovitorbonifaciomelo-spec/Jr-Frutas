import { units } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { BrazilMap } from "@/components/ui/BrazilMap";
import { MapPin } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Logistics() {
  return (
    <section id="logistica" className="bg-white text-black">
      <div className="container-site py-14 sm:py-20 lg:py-24">
        {/* ---------- DESKTOP ---------- */}
        <div className="hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
            <Reveal delay={150} className="mt-8 flex flex-wrap gap-4">
              {units.map((u) => (
                <UnitPill key={u.id} unit={u} />
              ))}
            </Reveal>
            <Reveal delay={220} className="mt-8">
              <ButtonLink href="#faq" variant="outline-black">
                Área de atuação
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={120} className="mx-auto w-full max-w-[520px]">
            <BrazilMap view="region" tone="dark" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" />
          </Reveal>
        </div>

        {/* ---------- MOBILE / TABLET ---------- */}
        <div className="lg:hidden">
          <Reveal>
            <h2 className="h-section">Onde atendemos</h2>
            <p className="mt-3 max-w-[40ch] text-[0.98rem] leading-relaxed text-black/65">
              Operações estratégicas em Goiânia e Brasília, com cobertura em Goiás, Distrito Federal e entorno.
            </p>
          </Reveal>
          <div className="mt-8 grid items-center gap-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
            <Reveal delay={80} className="mx-auto w-[min(100%,300px)] sm:w-full">
              <BrazilMap view="full" tone="dark" className="h-auto w-full" />
            </Reveal>
            <Reveal delay={140} className="flex flex-col gap-4">
              {units.map((u) => (
                <UnitCard key={u.id} unit={u} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function UnitPill({ unit }: { unit: (typeof units)[number] }) {
  return (
    <a
      href={`tel:${unit.phone.replace(/\D/g, "")}`}
      className="group inline-flex items-center gap-4 rounded-[var(--radius-pill)] bg-black px-5 py-3.5 text-white transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5"
    >
      <span className="grid size-11 place-items-center rounded-full bg-white text-black">
        <MapPin size={20} />
      </span>
      <span>
        <span className="block text-[0.82rem] font-extrabold">{unit.name}</span>
        <span
          className="block text-[0.82rem] text-white/75"
          data-pending={unit.phonePending ? "" : undefined}
          title={unit.phonePending ? "Telefone pendente de confirmação" : undefined}
        >
          {unit.phone}
        </span>
      </span>
    </a>
  );
}

function UnitCard({ unit }: { unit: (typeof units)[number] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-black/10 bg-white p-5 shadow-[var(--shadow-card)]">
      <p className="eyebrow text-black/50">{unit.state === "GO" ? "Goiás" : "Distrito Federal"}</p>
      <div className="mt-2 flex items-start gap-3">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-black text-white">
          <MapPin size={17} />
        </span>
        <div>
          <h3 className="text-[1.1rem] font-extrabold leading-tight">{unit.name}</h3>
          <p className="mt-1 text-[0.9rem] leading-relaxed text-black/65">{unit.role}</p>
          <a
            href={`tel:${unit.phone.replace(/\D/g, "")}`}
            className="mt-2 inline-block text-[0.9rem] font-bold underline-offset-4 hover:underline"
            data-pending={unit.phonePending ? "" : undefined}
            title={unit.phonePending ? "Telefone pendente de confirmação" : undefined}
          >
            {unit.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
