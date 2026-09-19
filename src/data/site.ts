/**
 * Fonte única de conteúdo e dados do site.
 *
 * REGRA: tudo que está marcado com `pending: true` ou com o prefixo PENDING_
 * é PLACEHOLDER — não foi confirmado nos arquivos do projeto e precisa ser
 * substituído pelo dado real antes da publicação. Em `npm run dev` esses
 * itens aparecem com contorno tracejado (ver globals.css → [data-pending]).
 *
 * Dados CONFIRMADOS nos arquivos do Grupo JR:
 * - Produtos: abacaxi, melancia, coco seco, coco verde e melão
 * - Unidade Goiânia: (62) 3522-9333 · Rodovia BR-153, Km 5,5, GP04, Box 06, Fazenda Retiro, CEASA
 * - Unidade Brasília: (61) 3974-6842 · SIA Trecho 10, Guará, Brasília - DF, 71200-100
 * - Instagram: @jr.frutas — https://www.instagram.com/jr.frutas/
 * - Telefones das unidades são fixos e TAMBÉM WhatsApp (confirmado pelo cliente)
 * - NÃO existe WhatsApp/telefone geral: atendimento é por unidade
 * - Atuação B2B: mercados, supermercados, feirantes, restaurantes, quiosques, padarias
 * - Pedido via WhatsApp, cotação com preço do dia, separação no mesmo dia,
 *   entrega própria ou retirada
 */

// ---------------------------------------------------------------------------
// CONFIGURAÇÃO PÚBLICA (via .env) — ver .env.example
// ---------------------------------------------------------------------------
/**
 * URL pública final do site. A JR Frutas AINDA NÃO TEM domínio definido.
 * Único ponto a alterar quando o domínio for comprado: NEXT_PUBLIC_SITE_URL.
 * Enquanto não definido, usa localhost (links internos são sempre relativos).
 * ATENÇÃO: Open Graph absoluto (og:url / og:image) precisa ser revalidado
 * quando o domínio final for configurado.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
/** WhatsApp geral — NÃO EXISTE hoje (atendimento é por unidade). Só entra se configurado no .env. */
const GENERAL_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || null;

export const PENDING_FACEBOOK = "https://facebook.com/"; // PLACEHOLDER

export const site = {
  name: "JR Frutas Atacadista",
  shortName: "JR Frutas",
  tagline: "Qualidade que começa no campo. Confiança que chega até o seu negócio.",
  description:
    "Distribuidora atacadista de abacaxi, melancia, coco seco e coco verde. Frutas selecionadas com rigor, logística própria e atendimento dedicado para mercados, feirantes e restaurantes em Goiânia e Brasília.",
  url: SITE_URL ?? "http://localhost:3000",
  /** true somente quando NEXT_PUBLIC_SITE_URL estiver definido (domínio final) */
  urlConfigured: Boolean(SITE_URL),
  locale: "pt_BR",
  /** E.164 sem "+" ou null. null = sem WhatsApp geral (CTAs caem para atendimento por unidade / #cotacao) */
  whatsapp: GENERAL_WHATSAPP as string | null,
  /** e-mail institucional — não confirmado */
  email: null as string | null,
  social: {
    instagram: { href: "https://www.instagram.com/jr.frutas/", handle: "jr.frutas", pending: false }, // CONFIRMADO
    facebook: { href: PENDING_FACEBOOK, pending: true },
  },
};

/**
 * Link para o WhatsApp geral. Como ele não existe hoje, retorna a âncora da
 * seção de contato do site (fallback interno, sem número inventado).
 */
/**
 * Crédito do desenvolvedor (faixa final do footer).
 * - `instagram`: handle sem "@" — PENDENTE (não inventar). Sem valor, o nome aparece sem link.
 * - `logo`: caminho em /public quando existir (ex.: "/brand/bonifacio.svg") — o footer
 *   troca automaticamente o texto pela logo, sem reconstruir o componente.
 */
export const developerCredit = {
  name: "Bonifácio Marketing Digital",
  instagram: null as string | null, // PENDENTE: handle oficial
  logo: null as string | null,
  logoWidth: 120,
  logoHeight: 28,
};

export const whatsappLink = (message?: string) => {
  if (!site.whatsapp) return "#cotacao";
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};


export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Logística", href: "#logistica" },
  { label: "Produção", href: "#producao" },
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Contato", href: "#cotacao" },
] as const;

export type Unit = {
  id: string;
  city: string;
  state: string;
  name: string;
  /** Telefone fixo em formato humano (NÃO é WhatsApp — sem confirmação) */
  phone: string;
  /** E.164 para links tel:/vCard */
  phoneE164: string;
  phonePending: boolean;
  /** WhatsApp da unidade em E.164 (ex.: "+5562…"). null = não confirmado — não usar wa.me. */
  whatsapp: string | null;
  address: string;
  addressPending: boolean;
  role: string;
  /** Link "Abrir no mapa" (Google Maps). PLACEHOLDER enquanto o endereço não for confirmado. */
  mapsUrl: string;
  mapsPending: boolean;
  /** Coordenadas geográficas para o mapa estilizado */
  lon: number;
  lat: number;
};

export const units: Unit[] = [
  {
    id: "goiania",
    city: "Goiânia",
    state: "GO",
    name: "Unidade Goiânia",
    phone: "(62) 3522-9333", // CONFIRMADO
    phoneE164: "+556235229333",
    phonePending: false,
    whatsapp: "+556235229333", // CONFIRMADO pelo cliente: mesmo número do fixo
    address: "Rodovia BR-153, Km 5,5, GP04, Box 06, Fazenda Retiro, CEASA", // CONFIRMADO
    addressPending: false,
    role: "Operação, seleção e expedição para Goiás e região.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rodovia%20BR-153%2C%20Km%205%2C5%2C%20GP04%2C%20Box%2006%2C%20Fazenda%20Retiro%2C%20CEASA%20-%20Goi%C3%A2nia%20-%20GO", // busca pelo endereço completo (sem Place ID oficial)
    mapsPending: false,
    lon: -49.27,
    lat: -16.68,
  },
  {
    id: "brasilia",
    city: "Brasília",
    state: "DF",
    name: "Unidade Brasília",
    phone: "(61) 3974-6842", // CONFIRMADO
    phoneE164: "+556139746842",
    phonePending: false,
    whatsapp: "+556139746842", // CONFIRMADO pelo cliente: mesmo número do fixo
    address: "SIA Trecho 10, Guará, Brasília - DF, 71200-100", // CONFIRMADO
    addressPending: false,
    role: "Distribuição e atendimento ao Distrito Federal e entorno.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=SIA%20Trecho%2010%2C%20Guar%C3%A1%2C%20Bras%C3%ADlia%20-%20DF%2C%2071200-100", // busca pelo endereço completo (sem Place ID oficial)
    mapsPending: false,
    lon: -47.93,
    lat: -15.78,
  },
];

export type IconName =
  | "award"
  | "users"
  | "truck"
  | "pin"
  | "check"
  | "box"
  | "field"
  | "select";

export type Stat = {
  value: string;
  label: string;
  /** "seal" usa o símbolo oficial da marca (bloco de produção própria) */
  icon: IconName | "seal";
  /** bloco em destaque (ocupa mais espaço na faixa) */
  featured?: boolean;
};

/**
 * Faixa de autoridade abaixo do hero — SOMENTE informação confirmada.
 * (Sem "anos de mercado" / "clientes atendidos": não há número real no projeto.)
 * "Produção própria" recupera a prova institucional do site antigo.
 */
export const stats: Stat[] = [
  {
    value: "Produção própria",
    label: "Frutas frescas e selecionadas, com controle de qualidade desde a origem.",
    icon: "seal",
    featured: true,
  },
  { value: "Entregas", label: "rápidas e programadas", icon: "truck" },
  { value: "2", label: "unidades estratégicas", icon: "pin" },
];

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: "abacaxi" | "melancia" | "cocoSeco" | "cocoVerde" | "melao";
  alt: string;
};

export const products: Product[] = [
  {
    slug: "abacaxi",
    name: "Abacaxi",
    short: "Selecionado no ponto certo de maturação e com alto padrão de qualidade.",
    description:
      "Coroa verde e firme, casca uniforme e aroma doce na base. Selecionamos o abacaxi para chegar na fase certa de venda.",
    image: "abacaxi",
    alt: "Abacaxi cortado ao meio mostrando a polpa amarela, sobre abacaxis inteiros",
  },
  {
    slug: "melancia",
    name: "Melancia",
    short: "Frescor, sabor e doçura na medida certa para atender seus clientes.",
    description:
      "Pesada para o tamanho, casca firme e som certo na batida. Melancia que vende, não que encalha.",
    image: "melancia",
    alt: "Fatia de melancia vermelha e suculenta segurada à mão",
  },
  {
    slug: "coco-seco",
    name: "Coco Seco",
    short: "Qualidade, rendimento e segurança para o seu abastecimento.",
    description:
      "Durabilidade alta e demanda constante em padaria, restaurante e mercado. O item de base que nunca sai da lista.",
    image: "cocoSeco",
    alt: "Cocos secos empilhados, com um coco aberto mostrando a polpa branca",
  },
  {
    slug: "coco-verde",
    name: "Coco Verde",
    short: "Produto fresco, hidratante e ideal para diferentes negócios.",
    description:
      "Água no ponto e frescor máximo. Giro rápido em praia, quiosque, mercado e feira — volume garantido no calor.",
    image: "cocoVerde",
    alt: "Coco verde fresco segurado à mão em frente ao estoque",
  },
  {
    slug: "melao",
    name: "Melão",
    short: "Selecionado com qualidade para atender diferentes tipos de negócio.",
    description:
      "Casca, cor de fundo e aroma na base indicam o ponto certo. Entregamos melão pronto para vender, não para amadurecer na prateleira.",
    image: "melao",
    alt: "Melão amarelo inteiro sendo cortado sobre caixa de madeira",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** Texto expandido (accordion mobile) */
  detail: string;
  /** ícone da etapa (família Lucide em Process.tsx) */
  icon: "field" | "select" | "truck" | "box";
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Produção",
    description: "Parcerias com produtores confiáveis e manejo responsável.",
    detail:
      "Trabalhamos com produtores parceiros selecionados, acompanhando o manejo e o ponto de colheita para garantir fruta com padrão desde a origem.",
    icon: "field",
  },
  {
    number: "02",
    title: "Seleção",
    description: "Rigor na escolha para garantir qualidade, calibre e padronização.",
    detail:
      "Cada lote é conferido no recebimento: calibre, casca, peso e maturação. O que não passa na seleção não segue para o seu negócio.",
    icon: "select",
  },
  {
    number: "03",
    title: "Logística",
    description: "Estrutura própria e frota preparada para entregas seguras e ágeis.",
    detail:
      "Frota preparada, carregamento cuidadoso e rotas planejadas para a fruta chegar com frescor e no prazo combinado, em Goiânia, Brasília e região.",
    icon: "truck",
  },
  {
    number: "04",
    title: "Abastecimento",
    description: "Regularidade e compromisso para manter seu negócio sempre abastecido.",
    detail:
      "Regularidade de entrega e volume constante para o seu negócio nunca perder venda por falta de produto.",
    icon: "box",
  },
];

export const operationHighlights = [
  "Parceria com produtores selecionados",
  "Rigor no processo de seleção",
  "Estrutura própria para armazenagem",
  "Frota preparada e carregamento cuidadoso",
  "Entregas programadas e seguras",
];

export type ClientLogo = {
  name: string;
  /** Caminho do logo em /public/clients. Sem arquivo real = placeholder. */
  src?: string;
  pending?: boolean;
};

/**
 * PLACEHOLDER: nenhum logo real de cliente foi encontrado nos arquivos.
 * Substituir por logos reais (PNG/SVG monocromático branco) em /public/clients.
 */
export const clients: ClientLogo[] = [
  { name: "Cliente 1", pending: true },
  { name: "Cliente 2", pending: true },
  { name: "Cliente 3", pending: true },
  { name: "Cliente 4", pending: true },
  { name: "Cliente 5", pending: true },
  { name: "Cliente 6", pending: true },
];

export const aboutHighlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "award", title: "Experiência", text: "no atacado de frutas" },
  { icon: "users", title: "Atendimento", text: "dedicado e direto" },
  { icon: "check", title: "Foco total", text: "na satisfação do cliente" },
];

export const faq = [
  {
    q: "Quais frutas estão disponíveis para distribuição?",
    a: "Trabalhamos com abacaxi, melancia, coco seco, coco verde e melão. Consulte a disponibilidade da semana pelo WhatsApp.",
  },
  {
    q: "Como funciona a logística de entregas?",
    a: "Pedido confirmado entra na separação e o carregamento é feito com cuidado, unidade por unidade. A entrega é realizada com frota preparada, no prazo combinado, ou você pode optar pela retirada na unidade.",
  },
  {
    q: "Quais regiões são atendidas?",
    a: "Atendemos a partir das nossas unidades em Goiânia (GO) e Brasília (DF), com cobertura em Goiás, Distrito Federal e entorno. Para outras regiões, fale com nossa equipe e avaliamos a melhor rota.",
  },
  {
    q: "Como solicito uma cotação de produtos?",
    a: "Fale com nossa equipe pelo WhatsApp, envie os produtos e quantidades que precisa e retornamos com a cotação do dia.",
  },
] as const;

export const productOptions = [
  "Abacaxi",
  "Melancia",
  "Coco Seco",
  "Coco Verde",
  "Melão",
  "Mais de um produto",
] as const;

/** WhatsApp de uma unidade (só quando confirmado em `units[].whatsapp`). */
export const unitWhatsappLink = (u: { whatsapp: string | null }, message?: string) => {
  if (!u.whatsapp) return null;
  const base = `https://wa.me/${u.whatsapp.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Mensagem padrão para falar com uma unidade (header, menu mobile, hub). */
export const unitMessage = (city: string) => `Olá! Vim pelo site da JR Frutas e gostaria de falar com a unidade de ${city}.`;

/** Mensagem padrão de cotação. */
export const QUOTE_MESSAGE = "Olá! Vim pelo site da JR Frutas e gostaria de solicitar uma cotação.";

/**
 * CTA de cotação ("Solicite uma cotação" e equivalentes): abre DIRETO o
 * WhatsApp da Unidade Goiânia (decisão do cliente). Aceita mensagem custom
 * (ex.: formulário) — sem número, cai para a seção de contato.
 */
export const quoteWhatsappLink = (message: string = QUOTE_MESSAGE) => {
  const goiania = units.find((u) => u.id === "goiania");
  return (goiania && unitWhatsappLink(goiania, message)) ?? "#cotacao";
};
