import { Boxes, ClipboardCheck, Tractor, Truck, type LucideIcon } from "lucide-react";
import { processSteps, type ProcessStep } from "@/data/site";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight } from "@/components/ui/Icons";

/** Ícones das etapas: família única (Lucide), lineares, stroke 1.5, monocromáticos */
const stepIcons: Record<ProcessStep["icon"], LucideIcon> = {
  field: Tractor,
  select: ClipboardCheck,
  truck: Truck,
  box: Boxes,
};
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="processo" className="bg-black text-white">
      <div className="container-site py-14 sm:py-16 lg:py-20">
        {/* ---------- DESKTOP: faixa horizontal com setas ---------- */}
        <div className="hidden lg:block">
          <Reveal>
            <h2 className="h-section text-center">Nosso processo. Do campo ao seu negócio.</h2>
          </Reveal>
          <ol className="mt-12 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-x-4 lg:gap-x-8">
            {processSteps.map((s, i) => (
              <Step key={s.number} step={s} index={i} last={i === processSteps.length - 1} />
            ))}
          </ol>
        </div>

        {/* ---------- MOBILE: accordion vertical ---------- */}
        <div className="lg:hidden">
          <Reveal>
            <h2 className="h-section">Como funciona</h2>
          </Reveal>
          <Reveal delay={80} className="mt-6">
            <Accordion
              tone="dark"
              defaultOpen={0}
              items={processSteps.map((s) => ({
                leading: (
                  <span className="grid size-10 place-items-center rounded-full border border-white/30">
                    <StepIcon icon={s.icon} size={18} />
                  </span>
                ),
                title: `${Number(s.number)}. ${s.title}`,
                subtitle: s.description,
                content: s.detail,
              }))}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({ step, index, last }: { step: (typeof processSteps)[number]; index: number; last: boolean }) {
  return (
    <>
      <Reveal as="li" delay={index * 90} className="flex flex-col items-center text-center">
        <span className="font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-white/90">{step.number}</span>
        <span className="eyebrow mt-2 text-white">{step.title}</span>
        <span className="mt-4 grid size-16 place-items-center rounded-full border border-white/25 text-white transition-[border-color,background-color] duration-300 hover:border-white/60">
          <StepIcon icon={step.icon} size={28} />
        </span>
        <p className="mt-4 max-w-[22ch] text-[0.84rem] leading-relaxed text-white/65">{step.description}</p>
      </Reveal>
      {!last ? (
        <li aria-hidden className="mt-[92px] flex justify-center text-white/60">
          <ArrowRight size={40} strokeWidth={1.2} />
        </li>
      ) : null}
    </>
  );
}

function StepIcon({ icon, size }: { icon: ProcessStep["icon"]; size: number }) {
  const Cmp = stepIcons[icon];
  return <Cmp size={size} strokeWidth={1.5} absoluteStrokeWidth aria-hidden />;
}
