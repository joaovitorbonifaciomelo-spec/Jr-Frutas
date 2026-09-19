"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site, units, whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Close, Menu, Phone, WhatsApp } from "@/components/ui/Icons";

export function Header() {
  const hasWhatsApp = Boolean(site.whatsapp); // sem WhatsApp geral → CTA aponta para o atendimento por unidade (/links)
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = units[0];

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
      <div className="container-site flex h-[72px] items-center justify-between gap-6 lg:h-[76px]">
        <Logo height={40} priority />

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-[0.8rem] font-bold tracking-[0.02em] text-white/85 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${phone.phone.replace(/\D/g, "")}`}
            data-pending={phone.phonePending ? "" : undefined}
            title={phone.phonePending ? "Telefone pendente de confirmação" : undefined}
            className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-white/85 transition-colors hover:text-white"
          >
            <span className="grid size-8 place-items-center rounded-full border border-white/25">
              <Phone size={14} />
            </span>
            {phone.phone}
          </a>
          <ButtonLink href="#cotacao" icon={false} className="h-11 px-5">
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
        <div className="container-site flex h-full flex-col justify-between overflow-y-auto pt-6 pb-8">
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
                    className="flex min-h-14 items-center justify-between py-3 text-[1.35rem] font-extrabold tracking-[-0.01em]"
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
            className={`mt-8 flex flex-col gap-3 transition-[opacity,transform] duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <ButtonLink href="#cotacao" size="lg" full onClick={() => setOpen(false)}>
              Solicitar cotação
            </ButtonLink>
            <ButtonLink
              href={hasWhatsApp ? whatsappLink("Olá! Gostaria de solicitar uma cotação.") : "/links"}
              variant="outline-white"
              size="lg"
              full
              icon={hasWhatsApp ? <WhatsApp size={18} /> : <Phone size={18} />}
              target={hasWhatsApp ? "_blank" : undefined}
              rel={hasWhatsApp ? "noopener" : undefined}
              onClick={() => setOpen(false)}
            >
              {hasWhatsApp ? "Falar no WhatsApp" : "Falar com a JR Frutas"}
            </ButtonLink>
            <p className="mt-2 text-center text-[0.8rem] text-white/55">
              {units.map((u) => u.city).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
