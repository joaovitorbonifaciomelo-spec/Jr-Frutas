"use client";

import { useEffect, useState } from "react";

type Props = {
  /** true quando o bottom sheet está aberto → escurece/desfoca um pouco mais */
  dimmed?: boolean;
};

type NetInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Fundo em vídeo real da operação (loop curto, sem áudio).
 *
 * Ordem de carregamento: fundo preto (CSS) → interface → poster (WebP leve,
 * <img> nativo com fetchpriority high) → vídeo (só após hidratação).
 * O vídeo NÃO entra quando: prefers-reduced-motion, Save-Data ou conexão 2g.
 * Se falhar (onError), o poster assume automaticamente.
 * Overlay leve + gradientes localizados (topo/base) — o vídeo continua visível.
 */
export function VideoBackground({ dimmed = false }: Props) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    const limited = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    const apply = () => setAllowVideo(!mq.matches && !limited);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const showVideo = allowVideo && !failed;

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 bg-black transition-[filter] duration-500 ease-[var(--ease-out-soft)] ${
        dimmed ? "blur-[10px] lg:blur-[14px]" : "lg:blur-[6px]"
      }`}
      aria-hidden
    >
      {/* Poster: <img> nativo para não depender do runtime do next/image na primeira pintura */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/video/links-poster.webp"
        alt=""
        width={720}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center lg:scale-105"
      />
      {showVideo ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 lg:scale-105 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src="/video/links-loop.mp4"
          poster="/video/links-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}

      {/* Overlay leve e uniforme (mantém o vídeo perceptível) */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${dimmed ? "opacity-55" : "opacity-[0.16] lg:opacity-30"}`}
      />
      {/* Gradientes localizados: atrás do logo (topo) e atrás dos cards/rodapé (base) */}
      <div className="absolute inset-x-0 top-0 h-[40%] bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_55%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0)_100%)]" />
    </div>
  );
}
