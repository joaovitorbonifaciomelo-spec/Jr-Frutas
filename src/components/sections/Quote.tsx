"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import melancia from "@/assets/images/melancia-fatia.webp";
import { productOptions, QUOTE_MESSAGE, quoteWhatsappLink } from "@/data/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const field =
  "w-full rounded-[var(--radius-btn)] border border-white/22 bg-white/[0.04] px-4 text-[0.92rem] text-white placeholder:text-white/40 transition-[border-color,background-color] duration-300 focus:border-white focus:bg-white/[0.07] focus:outline-none";
const label = "mb-2 block font-display text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/80";

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
      <div className="container-site py-14 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-12">
          {/* ---------- Peça visual (esquerda) ----------
              Container editorial preparado para receber a arte principal de produto
              (melancia cortada, respingos, fundo escuro). Para trocar por um PNG
              recortado: use object-contain + padding no <Image> e mantenha o glow. */}
          <Reveal className="relative">
            <figure className="relative h-full min-h-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] sm:min-h-[460px] lg:min-h-[640px]">
              {/* glow de fundo para separar a arte do preto absoluto */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_45%_45%,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)]" />
              <Image
                src={melancia}
                alt="Fatia de melancia vermelha, fresca e suculenta"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                placeholder="blur"
                className="object-cover object-[52%_58%] transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] hover:scale-[1.03]"
              />
              {/* vinheta + base escura: profundidade e leitura da legenda */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.7)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)]" />
              {/* reflexo sutil no topo (acabamento de peça) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="eyebrow text-white/60">Melancia selecionada</p>
                <p className="mt-2 max-w-[16ch] font-display text-[1.6rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[2rem]">
                  Doce por dentro, no ponto de vender.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* ---------- Formulário (direita) ---------- */}
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
            <Reveal>
              <h2 className="h-section">Solicite sua cotação</h2>
              <p className="mt-3 max-w-[40ch] text-[0.98rem] leading-relaxed text-white/70">Preencha os dados e nossa equipe entrará em contato.</p>
            </Reveal>

            <Reveal delay={100}>
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate={false}>
                <div>
                  <label htmlFor="q-nome" className={label}>
                    Nome*
                  </label>
                  <input id="q-nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={`${field} h-13`} />
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
                    className={`${field} h-13`}
                  />
                </div>

                <div className="sm:col-span-2 lg:order-5">
                  <label htmlFor="q-produto" className={label}>
                    Produto de interesse*
                  </label>
                  <select id="q-produto" name="produto" required defaultValue="" className={`${field} h-13 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[position:right_16px_center] bg-no-repeat pr-11`}>
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
                  <input id="q-empresa" name="empresa" autoComplete="organization" placeholder="Nome da sua empresa" className={`${field} h-13`} />
                </div>
                <div className={`${more ? "block" : "hidden"} lg:order-4 lg:block`}>
                  <label htmlFor="q-cidade" className={label}>
                    Cidade / Estado
                  </label>
                  <input id="q-cidade" name="cidade" autoComplete="address-level2" placeholder="Ex.: Goiânia - GO" className={`${field} h-13`} />
                </div>
                <div className={`${more ? "block" : "hidden"} sm:col-span-2 lg:order-6 lg:block`}>
                  <label htmlFor="q-mensagem" className={label}>
                    Mensagem
                  </label>
                  <textarea
                    id="q-mensagem"
                    name="mensagem"
                    rows={5}
                    placeholder="Fale mais sobre sua necessidade (quantidades, frequência, região)"
                    className={`${field} min-h-[140px] resize-y py-3.5`}
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
                  <Button type="submit" size="lg" full>
                    Enviar solicitação
                  </Button>
                  <p className="mt-3 text-center text-[0.78rem] text-white/50">
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
    </section>
  );
}
