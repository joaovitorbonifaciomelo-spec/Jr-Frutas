"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, quoteWhatsappLink, unitMessage, units, unitWhatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, Close, Menu, WhatsApp } from "@/components/ui/Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-black transition-[border-color] duration-300 ${
        scrolled ? "border-b border-white/10" : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo height={40} priority />

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-5 2xl:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative font-display whitespace-nowrap text-[0.78rem] font-bold tracking-[0.02em] text-white/85 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contatos das duas unidades (WhatsApp) + CTA de cotação (WhatsApp Goiânia) */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <ul className="hidden items-center gap-3 xl:flex 2xl:gap-4">
            {units.map((u) => (
              <li key={u.id}>
                <UnitWhatsApp unit={u} compact />
              </li>
            ))}
          </ul>
          <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" icon={false} className="h-11 px-4 2xl:px-5">
            Solicite uma cotação
          </ButtonLink>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
          className="grid size-12 place-items-center rounded-lg text-white lg:hidden"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-site flex h-full flex-col justify-between overflow-y-auto pt-4 pb-8">
          <nav aria-label="Menu mobile">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {nav.map((item, i) => (
                <li
                  key={item.href}
                  className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-13 items-center justify-between py-2.5 font-display text-[1.25rem] font-extrabold tracking-[-0.01em]"
                  >
                    {item.label}
                    <span aria-hidden className="text-white/40">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`mt-6 flex flex-col gap-3 transition-[opacity,transform] duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            {/* Unidades: nome + telefone + ação WhatsApp */}
            <p className="eyebrow text-white/55">Unidades</p>
            <ul className="flex flex-col gap-2">
              {units.map((u) => (
                <li key={u.id}>
                  <UnitWhatsApp unit={u} onClick={() => setOpen(false)} />
                </li>
              ))}
            </ul>
            <ButtonLink href={quoteWhatsappLink()} target="_blank" rel="noopener" size="lg" full className="mt-2" onClick={() => setOpen(false)}>
              Solicitar cotação
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Contato de unidade — bloco inteiro clicável, abre o WhatsApp da unidade
 * com mensagem pré-preenchida. Preto/branco (sem verde).
 */
function UnitWhatsApp({ unit, compact, onClick }: { unit: (typeof units)[number]; compact?: boolean; onClick?: () => void }) {
  const href = unitWhatsappLink(unit, unitMessage(unit.city)) ?? `tel:${unit.phoneE164}`;
  return compact ? (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`WhatsApp ${unit.name}: ${unit.phone}`}
      className="group inline-flex items-center gap-2 whitespace-nowrap rounded-lg text-white/85 transition-colors hover:text-white"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/25 transition-[background-color,color] duration-300 group-hover:bg-white group-hover:text-black">
        <WhatsApp size={15} />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white/55">{unit.name}</span>
        <span className="block font-display text-[0.8rem] font-bold">{unit.phone}</span>
      </span>
    </a>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      className="flex min-h-14 items-center gap-3 rounded-[var(--radius-pill)] border border-white/18 px-4 py-3 text-white transition-colors hover:border-white/40"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-black">
        <WhatsApp size={18} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block font-display text-[0.92rem] font-extrabold">{unit.name}</span>
        <span className="block text-[0.82rem] text-white/70">{unit.phone} · WhatsApp</span>
      </span>
      <ArrowRight size={18} className="shrink-0 text-white/60" />
    </a>
  );
}
