"use client";

import { useEffect, useState } from "react";

type NetInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Vídeo de fundo do hero — operação real da JR (carregamento → estrutura →
 * seleção → descarga). Full-bleed, atrás do conteúdo.
 * - Poster renderizado no servidor (<img>) → nunca há tela preta.
 * - Vídeo entra após hidratação; fonte por viewport:
 *   ≥768px: 1280×720 (~1,7 MB) · ≤767px: vertical 720×1280 (~1,6 MB); H.264 yuv420p, sem áudio, faststart.
 * - Enquadramento mobile: object-position 58% 40% — assunto principal dos 4 clipes
 *   (caminhão/equipe, gaiolas, abacaxi, descarga) fica entre 25–50% da altura, à direita do centro.
 * - prefers-reduced-motion, Save-Data ou 2G → só o poster. Se falhar, o poster permanece.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    const limited = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    if (reduced || limited) return;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setSrc(wide ? "/video/hero-wide.mp4" : "/video/hero-mobile.mp4");
  }, []);

  return (
    <div className={`overflow-hidden bg-black ${className}`} aria-hidden>
      <picture>
        <source media="(max-width: 767px)" srcSet="/video/hero-mobile-poster.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/video/hero-wide-poster.webp"
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[58%_40%] md:object-center"
        />
      </picture>
      {src ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-[58%_40%] transition-opacity duration-700 md:object-center ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          poster={src.includes("mobile") ? "/video/hero-mobile-poster.webp" : "/video/hero-wide-poster.webp"}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setReady(true)}
          onError={() => setSrc(null)}
        />
      ) : null}
      {/* overlay: escurece a esquerda (texto) e a base (faixa de indicadores); vídeo segue presente à direita */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.6)_45%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.85)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0))]" />
    </div>
  );
}
