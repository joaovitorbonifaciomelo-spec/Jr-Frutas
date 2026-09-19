import type { Metadata } from "next";
import { site } from "@/data/site";
import { LinksHub } from "@/components/links/LinksHub";

const ogTitle = `${site.shortName} — WhatsApp, produtos e unidades`;
const ogDescription = "Atacado de abacaxi, melancia e coco em Goiânia e Brasília. Fale com a JR Frutas.";

export const metadata: Metadata = {
  title: { absolute: `${site.shortName} · Links` },
  description: ogDescription,
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: ogTitle,
    description: ogDescription,
    url: "/links",
    images: [{ url: "/og-links.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: ["/og-links.jpg"] },
};

/**
 * /links — hub de direcionamento para a bio do Instagram.
 * HUB = direciona · SITE = explica · WHATSAPP = atende.
 * Fullscreen, vídeo real da operação ao fundo, interface translúcida por cima.
 * Não usa Header/Footer nem seções do site principal.
 */
export default function LinksPage() {
  return (
    <main id="conteudo" className="relative isolate min-h-[100dvh] bg-black text-white">
      <LinksHub />
    </main>
  );
}
