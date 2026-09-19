"use client";

import { useEffect, useState } from "react";

type NetInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Vídeo do hero — operação real da JR (carregamento → estrutura → seleção).
 * - Poster renderizado no servidor (<img>) → nunca há tela preta.
 * - Vídeo entra após hidratação; fonte mobile (640², ~670 KB) ou desktop
 *   (960², ~1,4 MB) escolhida por viewport; H.264 yuv420p, sem áudio, faststart.
 * - prefers-reduced-motion, Save-Data ou 2G → só o poster.
 * - Se o vídeo falhar, o poster permanece.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    const limited = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    if (reduced || limited) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setSrc(desktop ? "/video/hero-desktop.mp4" : "/video/hero-mobile.mp4");
  }, []);

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/video/hero-poster.webp"
        alt="Equipe da JR Frutas carregando caminhão com frutas no galpão"
        width={960}
        height={960}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {src ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          poster="/video/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          onPlaying={() => setReady(true)}
          onError={() => setSrc(null)}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_40%)]" />
    </div>
  );
}
