import { quoteWhatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Phone, WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Bloco de conversão final — apenas mobile/tablet (como na referência mobile). */
export function MobileCta() {
  return (
    <section className="bg-black text-white lg:hidden">
      <div className="container-site pb-14">
        <Reveal className="rounded-[var(--radius-card)] border border-white/18 p-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
          <div>
            <h2 className="text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em]">Vamos levar qualidade para o seu negócio?</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">
              Solicite uma cotação agora e fale diretamente com nosso time.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:w-[260px] sm:shrink-0">
            {/* cotação → WhatsApp Goiânia · atendimento por unidade → /links */}
            <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" size="lg" full icon={<WhatsApp size={18} />}>
              Solicitar cotação
            </ButtonLink>
            <ButtonLink href="/links" variant="outline-white" size="lg" full icon={<Phone size={18} />}>
              Falar com a JR Frutas
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
