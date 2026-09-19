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
const label = "mb-1.5 block font-display text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/80";

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
      <div className="container-site py-14 sm:py-16 lg:max-w-[1280px] lg:pt-8 lg:pb-20 2xl:max-w-[1360px]">
        {/* UM bloco horizontal: [ melancia ] [ formulário ] — mesma altura, divisão interna sutil */}
        <Reveal className="overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)]">
          <div className="grid lg:grid-cols-[54fr_46fr]">
            {/* ---------- Área visual (50%) ----------
                Arte aprovada: melancia-cotacao.png (1586×992, original intacto; Next entrega AVIF/WebP).
                Fundo da foto é preto puro → funde com o bloco (bg-black). Enquadramento medido na imagem:
                polpa em x 0,16–0,91 (disco cortado 0,16–0,55, fatia 0,55–0,91).
                Desktop (coluna 54%, ratio ≈1,2): cover pela altura mostra ~73% da largura → object-position 58%
                (janela ≈ 0,16–0,89: disco inteiro, fatia inteira e respingos). Mobile 3:2: ~94% da arte, centrada. */}
            <div className="relative aspect-[3/2] w-full lg:aspect-auto lg:min-h-[520px]">
              <Image
                src={melancia}
                alt="Melancia aberta e fatia com respingos de água sobre fundo preto"
                fill
                quality={85}
                sizes="(min-width: 1024px) 1000px, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_50%] lg:object-[58%_50%]"
              />
              {/* fusão sutil com o formulário (desktop) — só na borda, sem escurecer a fruta */}
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-[linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0.7))] lg:block" />
            </div>

            {/* ---------- Formulário (58%) ---------- */}
            <div className="relative p-6 sm:p-8 lg:border-l lg:border-white/[0.06] lg:px-10 lg:py-8 xl:px-12">
            <Reveal>
              <h2 className="h-section">Solicite sua cotação</h2>
              <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-white/70">Preencha os dados e nossa equipe entrará em contato.</p>
            </Reveal>

            <Reveal delay={100}>
              <form onSubmit={onSubmit} className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:gap-x-4 lg:gap-y-3" noValidate={false}>
                <div>
                  <label htmlFor="q-nome" className={label}>
                    Nome*
                  </label>
                  <input id="q-nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={`${field} h-11`} />
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
                    className={`${field} h-11`}
                  />
                </div>

                <div className="sm:col-span-2 lg:order-5">
                  <label htmlFor="q-produto" className={label}>
                    Produto de interesse*
                  </label>
                  <select id="q-produto" name="produto" required defaultValue="" className={`${field} h-11 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[position:right_16px_center] bg-no-repeat pr-11`}>
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
                  <input id="q-empresa" name="empresa" autoComplete="organization" placeholder="Nome da sua empresa" className={`${field} h-11`} />
                </div>
                <div className={`${more ? "block" : "hidden"} lg:order-4 lg:block`}>
                  <label htmlFor="q-cidade" className={label}>
                    Cidade / Estado
                  </label>
                  <input id="q-cidade" name="cidade" autoComplete="address-level2" placeholder="Ex.: Goiânia - GO" className={`${field} h-11`} />
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
                    className={`${field} min-h-[96px] resize-y py-2.5`}
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

                <div className="sm:col-span-2 lg:order-7">
                  <Button type="submit" size="lg" full className="lg:h-12">
                    Enviar solicitação
                  </Button>
                  <p className="mt-2.5 text-center text-[0.74rem] leading-snug text-white/50">
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
        </Reveal>
      </div>
    </section>
  );
}
