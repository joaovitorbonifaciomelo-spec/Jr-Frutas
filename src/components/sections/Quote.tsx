"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import melancia from "@/assets/images/melancia-cotacao.png";
import { productOptions, QUOTE_MESSAGE, quoteWhatsappLink } from "@/data/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const field =
  "w-full rounded-[var(--radius-btn)] border border-white/22 bg-white/[0.04] px-4 text-[0.92rem] text-white placeholder:text-white/40 transition-[border-color,background-color] duration-300 focus:border-white focus:bg-white/[0.07] focus:outline-none";
const label = "mb-1.5 block font-display text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/80 lg:mb-1 lg:text-[0.66rem]";

export function Quote() {
  const [more, setMore] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const lines = [
      QUOTE_MESSAGE,
      "",
      `*Nome:* ${get("nome")}`,
      `*WhatsApp:* ${get("whatsapp")}`,
      get("empresa") && `*Empresa:* ${get("empresa")}`,
      get("cidade") && `*Cidade/Estado:* ${get("cidade")}`,
      `*Produto de interesse:* ${get("produto")}`,
      get("mensagem") && `*Mensagem:* ${get("mensagem")}`,
    ].filter(Boolean);
    // cotação → WhatsApp da Unidade Goiânia com a solicitação preenchida
    window.open(quoteWhatsappLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  }

  return (
    <section id="cotacao" className="relative bg-black text-white">
      <div className="container-site py-14 sm:py-16 lg:max-w-[1280px] lg:pt-2 lg:pb-20 2xl:max-w-[1360px]">
        {/* 2 colunas: [ imagem inteira, sem crop/fade ] [ formulário ]. Fundo preto atrás da arte
            dá o respiro; a imagem começa colada na borda esquerda da área útil. */}
        <Reveal className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-black shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)] lg:border-white/[0.025] lg:shadow-none">
          <div className="grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-stretch">
            {/* ---------- Arte (melancia-cotacao.png, 1586×992 — original intacto) ----------
                object-contain + left center: 100% da composição visível (fruta + respingos), proporção
                original, sem máscara, sem overlay, sem escurecimento. */}
            <div className="relative aspect-[1586/992] w-full min-w-0 bg-black lg:aspect-auto lg:min-h-[520px]">
              <Image
                src={melancia}
                alt="Melancia aberta e fatia com respingos de água sobre fundo preto"
                fill
                quality={85}
                sizes="(min-width: 1024px) 700px, 100vw"
                placeholder="blur"
                className="object-contain object-[left_center]"
              />
            </div>

            {/* ---------- Formulário (direita) ---------- */}
            <div className="relative min-w-0">
            <div className="relative p-6 sm:p-8 lg:py-8 lg:pr-8 lg:pl-6 xl:pr-10">
            <Reveal>
              <h2 className="h-section lg:text-[2rem]">Solicite sua cotação</h2>
              <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-white/70 lg:mt-1 lg:text-[0.9rem]">Preencha os dados e nossa equipe entrará em contato.</p>
            </Reveal>

            <Reveal delay={100}>
              <form onSubmit={onSubmit} className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:mt-4 lg:gap-x-3 lg:gap-y-2.5" noValidate={false}>
                <div>
                  <label htmlFor="q-nome" className={label}>
                    Nome*
                  </label>
                  <input id="q-nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={`${field} h-11 lg:h-10`} />
                </div>
                <div>
                  <label htmlFor="q-whatsapp" className={label}>
                    WhatsApp*
                  </label>
                  <input
                    id="q-whatsapp"
                    name="whatsapp"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    className={`${field} h-11 lg:h-10`}
                  />
                </div>

                <div className="sm:col-span-2 lg:order-5">
                  <label htmlFor="q-produto" className={label}>
                    Produto de interesse*
                  </label>
                  <select id="q-produto" name="produto" required defaultValue="" className={`${field} h-11 lg:h-10 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[position:right_16px_center] bg-no-repeat pr-11`}>
                    <option value="" disabled>
                      Selecione o produto
                    </option>
                    {productOptions.map((p) => (
                      <option key={p} value={p} className="text-black">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campos adicionais: sempre visíveis no desktop, sob demanda no mobile */}
                <div className={`${more ? "block" : "hidden"} lg:order-3 lg:block`}>
                  <label htmlFor="q-empresa" className={label}>
                    Empresa
                  </label>
                  <input id="q-empresa" name="empresa" autoComplete="organization" placeholder="Nome da sua empresa" className={`${field} h-11 lg:h-10`} />
                </div>
                <div className={`${more ? "block" : "hidden"} lg:order-4 lg:block`}>
                  <label htmlFor="q-cidade" className={label}>
                    Cidade / Estado
                  </label>
                  <input id="q-cidade" name="cidade" autoComplete="address-level2" placeholder="Ex.: Goiânia - GO" className={`${field} h-11 lg:h-10`} />
                </div>
                <div className={`${more ? "block" : "hidden"} sm:col-span-2 lg:order-6 lg:block`}>
                  <label htmlFor="q-mensagem" className={label}>
                    Mensagem
                  </label>
                  <textarea
                    id="q-mensagem"
                    name="mensagem"
                    rows={3}
                    placeholder="Fale mais sobre sua necessidade (quantidades, frequência, região)"
                    className={`${field} min-h-[96px] resize-y py-2.5 lg:min-h-[64px]`}
                  />
                </div>

                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMore((v) => !v)}
                    aria-expanded={more}
                    className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white/75 underline-offset-4 hover:underline"
                  >
                    {more ? "− Menos detalhes" : "+ Adicionar empresa, cidade e mensagem"}
                  </button>
                </div>

                <div className="sm:col-span-2 lg:order-7 lg:-mt-0.5">
                  <Button type="submit" size="lg" full className="lg:h-11 lg:w-auto lg:px-10">
                    Enviar solicitação
                  </Button>
                  <p className="mt-2.5 text-center text-[0.74rem] leading-snug text-white/50 lg:mt-1.5 lg:text-left">
                    {sent
                      ? "Sua solicitação foi aberta no WhatsApp. Se a janela não abriu, use o botão abaixo."
                      : "Ao enviar, sua solicitação é encaminhada para o WhatsApp da nossa equipe (Unidade Goiânia)."}
                  </p>
                </div>

                <div className="sm:col-span-2 lg:hidden">
                  <ButtonLink href={quoteWhatsappLink()} variant="outline-white" size="lg" full icon={<WhatsApp size={18} />} target="_blank" rel="noopener">
                    Pedir cotação no WhatsApp
                  </ButtonLink>
                </div>
              </form>
            </Reveal>
            </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
