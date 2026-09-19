import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import { site, units } from "@/data/site";
import "./globals.css";

/**
 * Tipografia
 * - DISPLAY (identidade): Marine Rounded, self-hosted em /public/fonts via
 *   next/font/local — só os pesos usados (400 Regular, 700 Bold, 900 Black).
 *   Pesos 600/800 pedidos pelo CSS resolvem para 700/900 pela regra de
 *   matching do navegador (sem bold sintético). Fallback com métricas ajustadas.
 * - BODY (textos longos): Nunito, mantida pela legibilidade em corpo de texto.
 * As famílias entram no Tailwind como --font-display / --font-body (globals.css).
 */
const marine = localFont({
  src: [
    { path: "../../public/fonts/MarineRounded-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/MarineRounded-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/MarineRounded-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-marine",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase vem de NEXT_PUBLIC_SITE_URL (fallback localhost). Revalidar OG absoluto ao definir o domínio.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Abacaxi, Melancia e Coco para o seu negócio`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  keywords: ["atacado de frutas", "abacaxi", "melancia", "coco seco", "coco verde", "Goiânia", "Brasília", "distribuidora de frutas", "hortifruti atacadista"],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/icon.png", type: "image/png" }], apple: "/brand/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  // URL/logo absolutos só quando NEXT_PUBLIC_SITE_URL estiver definido (domínio final ainda não existe)
  ...(site.urlConfigured ? { url: site.url, logo: `${site.url}/brand/logo-jr-frutas-white.png` } : {}),
  description: site.description,
  areaServed: ["Goiás", "Distrito Federal"],
  location: units.map((u) => ({
    "@type": "Place",
    name: u.name,
    address: { "@type": "PostalAddress", addressLocality: u.city, addressRegion: u.state, addressCountry: "BR" },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${marine.variable} ${nunito.variable}`} data-env={process.env.NODE_ENV}>
      <head>
        {/* Marca que há JS antes do primeiro paint (habilita o reveal sem esconder conteúdo sem JS) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.setAttribute('data-js','')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
