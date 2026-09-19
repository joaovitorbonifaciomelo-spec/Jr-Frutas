import Link from "next/link";
import Image from "next/image";
import { developerCredit, nav, products, quoteWhatsappLink, site, units } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Facebook, Instagram, WhatsApp } from "@/components/ui/Icons";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* ---------- DESKTOP / TABLET ---------- */}
      <div className="container-site hidden py-16 md:block">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="stacked" height={96} href={null} />
            <p className="mt-6 max-w-[26ch] text-[0.9rem] leading-relaxed text-white/70">
              Qualidade que começa no campo. Confiança que chega ao seu negócio.
            </p>
            <Social className="mt-6" />
          </div>

          <div className="lg:col-span-2">
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

          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-white">Unidades</h3>
            <ul className="space-y-5 text-[0.9rem] text-white/70">
              {units.map((u) => (
                <li key={u.id}>
                  <p className="font-bold text-white">{u.name}</p>
                  <a
                    href={`tel:${u.phone.replace(/\D/g, "")}`}
                    data-pending={u.phonePending ? "" : undefined}
                    className="block transition-colors hover:text-white"
                  >
                    {u.phone}
                  </a>
                  <p data-pending={u.addressPending ? "" : undefined}>{u.address}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-white">Solicite uma cotação</h3>
            <p className="text-[0.9rem] leading-relaxed text-white/70">
              Fale com nosso time e receba sua proposta.
            </p>
            <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" className="mt-6">
              Solicitar cotação
            </ButtonLink>
            <p className="mt-6 text-[0.8rem] text-white/50">Produtos: {products.map((p) => p.name).join(" · ")}</p>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6 text-[0.75rem] text-white/50">
          <p>© {year} {site.name}. Todos os direitos reservados.</p>
          <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">
            Política de Privacidade
          </Link>
        </div>
        <DeveloperCredit className="mt-6 border-t border-white/10 pt-5" />
      </div>

      {/* ---------- MOBILE (muito mais simples) ---------- */}
      <div className="container-site py-10 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <Logo height={34} href={null} />
          <Social />
        </div>
        <nav aria-label="Rodapé" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.8rem] font-bold uppercase tracking-[0.1em]">
          <Link href="#produtos">Produtos</Link>
          <Link href="#quem-somos">Quem somos</Link>
          <Link href="#cotacao">Contato</Link>
        </nav>
        <p className="mt-6 text-[0.8rem] text-white/55">{units.map((u) => u.city).join(" · ")}</p>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.72rem] text-white/50">
          <p>© {year} {site.name}. Todos os direitos reservados.</p>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
        <DeveloperCredit className="mt-6 border-t border-white/10 pt-5" center />
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
      <a href={site.social.facebook.href} aria-label="Facebook" data-pending={site.social.facebook.pending ? "" : undefined} className={item} target="_blank" rel="noopener">
        <Facebook size={17} />
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
