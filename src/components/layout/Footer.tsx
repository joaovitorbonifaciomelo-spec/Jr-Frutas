import Link from "next/link";
import Image from "next/image";
import { developerCredit, nav, products, quoteWhatsappLink, site, unitMessage, units, unitWhatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Instagram, WhatsApp } from "@/components/ui/Icons";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Conteúdo institucional completo em todos os tamanhos — no mobile só muda o layout (1 coluna, divisores) */}
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
          <div className="footer-section md:flex md:flex-col md:items-start lg:col-span-4">
            <Logo variant="stacked" height={96} href={null} />
            <p className="eyebrow mt-6 text-white/85">Cultivando Qualidade.</p>
            <Social className="mt-6 justify-center md:justify-start" />
          </div>

          <div className="footer-section md:flex md:flex-col md:items-start lg:col-span-2">
            <h3 className="eyebrow mb-5 text-white">Navegação</h3>
            <ul className="space-y-2.5 text-[0.9rem] text-white/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section md:flex md:flex-col md:items-start lg:col-span-3">
            <h3 className="eyebrow mb-5 text-white">Unidades</h3>
            <ul className="space-y-6 text-[0.9rem] text-white/70">
              {units.map((u) => (
                <li key={u.id} className="flex flex-col items-center md:items-start">
                  <p className="font-display font-bold text-white">{u.name}</p>
                  <a
                    href={unitWhatsappLink(u, unitMessage(u.city)) ?? `tel:${u.phoneE164}`}
                    target="_blank"
                    rel="noopener"
                    aria-label={`WhatsApp ${u.name}: ${u.phone}`}
                    className="mt-1 inline-flex items-center justify-center gap-2 font-bold text-white transition-colors hover:text-white/80 md:justify-start"
                  >
                    <WhatsApp size={14} /> {u.phone}
                  </a>
                  <p className="mt-1.5 max-w-[26ch] leading-relaxed md:max-w-none">
                    {u.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section md:flex md:flex-col md:items-start lg:col-span-3">
            <h3 className="eyebrow mb-5 text-white">Solicite uma cotação</h3>
            <p className="max-w-[32ch] text-[0.9rem] leading-relaxed text-white/70">
              Fale com nosso time e receba sua proposta.
            </p>
            <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" className="mt-6 w-full sm:w-auto">
              Solicitar cotação
            </ButtonLink>
            <p className="mt-6 max-w-[34ch] text-[0.8rem] text-white/50 md:max-w-none">Produtos: {products.map((p) => p.name).join(" · ")}</p>
          </div>
        </div>

        <div className="footer-section footer-section--last mt-0 !flex !flex-col items-center gap-4 border-t border-white/10 !pt-6 text-center text-[0.75rem] text-white/50 md:mt-14 md:!flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-3 md:!pt-6 md:text-left">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
            <span className="mx-2 text-white/25">·</span>
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">
              Política de Privacidade
            </Link>
          </p>
          <DeveloperCredit />
        </div>
      </div>

    </footer>
  );
}

function Social({ className = "" }: { className?: string }) {
  const item =
    "grid size-10 place-items-center rounded-full border border-white/25 text-white transition-[background-color,color] duration-300 hover:bg-white hover:text-black";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <a href={site.social.instagram.href} aria-label="Instagram" data-pending={site.social.instagram.pending ? "" : undefined} className={item} target="_blank" rel="noopener">
        <Instagram size={17} />
      </a>
      <a href={quoteWhatsappLink()} aria-label="WhatsApp" className={item} target="_blank" rel="noopener">
        <WhatsApp size={17} />
      </a>
    </div>
  );
}

/**
 * Crédito do desenvolvedor — discreto, mas perceptível. Dados em `developerCredit`
 * (site.ts): com `logo` definido renderiza a logo; com `instagram` vira link.
 */
function DeveloperCredit({ className = "", center = false }: { className?: string; center?: boolean }) {
  const { name, instagram, logo, logoWidth, logoHeight } = developerCredit;
  const href = instagram ? `https://www.instagram.com/${instagram}/` : null;
  const content = logo ? (
    <Image src={logo} alt={name} width={logoWidth} height={logoHeight} className="h-6 w-auto opacity-80 transition-opacity hover:opacity-100" />
  ) : (
    <span className="font-display text-[0.78rem] font-bold tracking-[0.02em] text-white/80">{name}</span>
  );
  return (
    <div className={`flex items-center gap-3 text-[0.72rem] text-white/45 ${center ? "flex-col justify-center text-center" : "justify-between"} ${className}`}>
      <span className="inline-flex items-center gap-2">
        <span>Desenvolvido por</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            {content}
          </a>
        ) : (
          content
        )}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
          <Instagram size={13} /> @{instagram}
        </a>
      ) : null}
    </div>
  );
}
