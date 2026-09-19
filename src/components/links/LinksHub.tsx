"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { site, units, unitWhatsappLink } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, Box, ExternalArrow, Globe, Instagram, MapPin, Phone, Share, UserPlus, WhatsApp } from "@/components/ui/Icons";
import { Sheet } from "./Sheet";
import { Toast, useToast } from "./Toast";
import { VideoBackground } from "./VideoBackground";
import { copyText, downloadVCard, track, withUtm } from "./hub-utils";

const WA_MESSAGE = "Olá, vim pelo Instagram da JR Frutas e gostaria de atendimento.";
const SHEET_STATE = "jr-links-sheet";

type SheetId = "atendimento" | "localizacao" | null;

/** Vidro preto/neutro: opacidade alta + saturação reduzida → não pega a cor da cena atrás */
const glass =
  "group relative flex w-full items-center gap-4 rounded-[18px] border border-white/12 bg-[#0a0a0a]/70 px-4 text-left text-white backdrop-blur-2xl backdrop-saturate-50 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.9)] transition-[background-color,border-color,transform,opacity] duration-200 ease-[var(--ease-out-soft)] hover:border-white/25 hover:bg-[#0a0a0a]/80 active:scale-[0.985] active:opacity-90 " +
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:rounded-t-[18px] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]";

export function LinksHub() {
  const [sheet, setSheet] = useState<SheetId>(null);
  const [hrefs, setHrefs] = useState({ site: "/", produtos: "/#produtos" });
  const { toast, show, hide } = useToast();

  // abertura do hub + UTMs preservadas para o site principal
  useEffect(() => {
    track("hub_open");
    setHrefs({ site: withUtm("/"), produtos: withUtm("/#produtos") });
  }, []);

  // ---- bottom sheets ↔ histórico (botão voltar do Android fecha o sheet antes de sair) ----
  const openSheet = useCallback((id: Exclude<SheetId, null>) => {
    track(id === "atendimento" ? "hub_atendimento_unidades" : "hub_localizacao");
    setSheet(id);
    try {
      window.history.pushState({ [SHEET_STATE]: id }, "");
    } catch {
      /* ignore */
    }
  }, []);
  const closeSheet = useCallback(() => {
    if (window.history.state?.[SHEET_STATE]) window.history.back();
    else setSheet(null);
  }, []);
  useEffect(() => {
    const onPop = () => setSheet(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ---- compartilhar / salvar contato ----
  const onShare = async () => {
    track("hub_share");
    const url = window.location.href.split("#")[0];
    const data = { title: site.name, text: "Fale com a JR Frutas Atacadista", url };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data);
        return;
      }
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
    }
    show((await copyText(url)) ? "Link copiado." : "Não foi possível copiar o link.");
  };
  const onSaveContact = () => {
    track("hub_save_contact");
    try {
      downloadVCard();
      show("Contato pronto para salvar.");
    } catch {
      show("Não foi possível gerar o contato.");
    }
  };

  const ig = site.social.instagram;

  return (
    <>
      <VideoBackground dimmed={sheet !== null} />

      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col justify-between px-5 pt-[max(36px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] sm:px-6 sm:pt-12">
        {/* 1–2. Logo oficial + assinatura curta */}
        <header className="flex flex-col items-center text-center">
          <Logo variant="stacked" height={104} href={null} priority className="drop-shadow-[0_10px_28px_rgba(0,0,0,0.7)]" />
          <p className="eyebrow mt-4 text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">Qualidade que começa no campo.</p>
        </header>

        {/* 3–6. Ações */}
        <nav aria-label="Acessos rápidos" className="my-7 flex flex-col gap-3 sm:my-9">
          <button
            type="button"
            onClick={() => openSheet("atendimento")}
            aria-haspopup="dialog"
            className="group relative flex h-[68px] w-full items-center gap-4 rounded-[18px] border border-white bg-white px-4 text-left text-black shadow-[0_18px_40px_-16px_rgba(0,0,0,0.95)] transition-[transform,opacity] duration-200 ease-[var(--ease-out-soft)] hover:bg-neutral-100 active:scale-[0.985] active:opacity-90"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-white">
              <Phone size={21} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[1.08rem] font-extrabold leading-tight tracking-[-0.01em]">Falar com a JR Frutas</span>
              <span className="block text-[0.82rem] text-black/60">Escolha sua unidade</span>
            </span>
            <ArrowRight size={20} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1" />
          </button>

          <Shortcut icon={<Box size={21} />} title="Produtos" copy="Conheça nossas frutas" href={hrefs.produtos} onClick={() => track("hub_produtos")} />
          <Shortcut icon={<MapPin size={21} />} title="Localização" copy="Veja nossas unidades" onClick={() => openSheet("localizacao")} ariaHasPopup />
          <Shortcut icon={<Globe size={21} />} title="Nosso site" copy="Conheça a JR Frutas" href={hrefs.site} onClick={() => track("hub_site")} />
        </nav>

        {/* 7. Instagram discreto + ações terciárias */}
        <footer className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <a
              href={ig.href}
              target="_blank"
              rel="noopener"
              onClick={() => track("hub_instagram")}
              data-pending={ig.pending ? "" : undefined}
              className="flex h-11 items-center gap-2 rounded-full border border-white/20 bg-[#0a0a0a]/60 px-4 text-[0.82rem] font-bold text-white backdrop-blur-xl transition-[background-color,color] duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
            >
              <Instagram size={17} />
              {ig.handle ? `@${ig.handle}` : "Instagram"}
            </a>
            <IconButton label="Compartilhar" onClick={() => void onShare()}>
              <Share size={17} />
            </IconButton>
            <IconButton label="Salvar contato" onClick={onSaveContact}>
              <UserPlus size={17} />
            </IconButton>
          </div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45">
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>

      {/* Atendimento — "Com qual unidade você quer falar?" */}
      <Sheet open={sheet === "atendimento"} onClose={closeSheet} title="Falar com a JR Frutas" description="Com qual unidade você quer falar?">
        <ul className="flex flex-col gap-3">
          {units.map((u) => {
            const wa = unitWhatsappLink(u, WA_MESSAGE); // null enquanto o WhatsApp da unidade não for confirmado
            return (
              <li key={u.id} className="rounded-[14px] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[1.02rem] font-extrabold leading-tight">{u.name}</p>
                <p className="mt-1 text-[0.88rem] text-white/70">{u.phone}</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`tel:${u.phoneE164}`}
                    onClick={() => track(u.id === "goiania" ? "hub_ligar_goiania" : "hub_ligar_brasilia")}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-white px-3 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-neutral-200 active:bg-neutral-200"
                  >
                    <Phone size={15} /> Ligar
                  </a>
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener"
                      onClick={() => track(u.id === "goiania" ? "hub_whatsapp_goiania" : "hub_whatsapp_brasilia")}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-3 text-[0.72rem] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-white hover:text-black active:bg-white active:text-black"
                    >
                      <WhatsApp size={15} /> WhatsApp
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Sheet>

      {/* Localização — "Onde ficam as unidades?" */}
      <Sheet open={sheet === "localizacao"} onClose={closeSheet} title="Nossas unidades" description="Goiânia e Brasília.">
        <ul className="flex flex-col gap-3">
          {units.map((u) => (
            <li key={u.id} className="rounded-[14px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[1.02rem] font-extrabold leading-tight">{u.name}</p>
              <p className="mt-1 text-[0.88rem] leading-snug text-white/70" data-pending={u.addressPending ? "" : undefined}>
                {u.address}
              </p>
              <a
                href={`tel:${u.phoneE164}`}
                className="mt-1 inline-block text-[0.88rem] font-bold text-white/85 underline-offset-4 hover:underline"
                data-pending={u.phonePending ? "" : undefined}
              >
                {u.phone}
              </a>
              <div className="mt-3 flex gap-2">
                <a
                  href={u.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("hub_maps", { unidade: u.id })}
                  data-pending={u.mapsPending ? "" : undefined}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-white px-3 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-neutral-200 active:bg-neutral-200"
                >
                  Google Maps <ExternalArrow />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    track("hub_copy_address", { unidade: u.id });
                    void copyText(`${u.name} — ${u.address}`).then((ok) => show(ok ? "Endereço copiado." : "Não foi possível copiar."));
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-[10px] border border-white/25 px-3 text-[0.72rem] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-white hover:text-black active:bg-white active:text-black"
                >
                  Copiar endereço
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Sheet>

      <Toast toast={toast} onHide={hide} />
    </>
  );
}

function Shortcut({
  icon,
  title,
  copy,
  href,
  onClick,
  ariaHasPopup,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
  href?: string;
  onClick?: () => void;
  ariaHasPopup?: boolean;
}) {
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.04] text-white">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.02rem] font-extrabold leading-tight tracking-[-0.01em]">{title}</span>
        <span className="block text-[0.82rem] text-white/65">{copy}</span>
      </span>
      <ArrowRight size={20} className="shrink-0 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1" />
    </>
  );
  return href ? (
    <a href={href} onClick={onClick} className={`${glass} h-[64px]`}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-haspopup={ariaHasPopup ? "dialog" : undefined} className={`${glass} h-[64px]`}>
      {inner}
    </button>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full border border-white/20 bg-[#0a0a0a]/60 text-white backdrop-blur-xl transition-[background-color,color] duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
    >
      {children}
    </button>
  );
}
