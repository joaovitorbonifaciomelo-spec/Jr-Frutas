"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** true quando o bottom sheet está aberto → escurece um pouco mais */
  dimmed?: boolean;
};

type NetInfo = { saveData?: boolean; effectiveType?: string };
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
  cancelVideoFrameCallback?: (id: number) => void;
};

/**
 * Fundo em vídeo real da operação (loop curto, sem áudio).
 *
 * Ordem: fundo preto (CSS) → interface → poster (<img>) → vídeo.
 *
 * CAUSA DO "VIDRO FUMÊ" APÓS `playing`: o <video> é composto pelo sistema numa
 * camada de mídia separada (iOS/Safari e alguns Android). `backdrop-filter`
 * não consegue amostrar essa camada — passa a amostrar só o fundo preto/overlay
 * — e o cristal vira cinza. O poster (<img>) é uma camada normal, por isso
 * durante o carregamento o vidro aparece correto.
 *
 * SOLUÇÃO: o <video> fica invisível e cada frame é copiado para um <canvas>
 * (camada normal, amostrável). O que o usuário vê — e o que o backdrop lê — é
 * sempre uma imagem: poster antes, canvas depois. Frame A e B ficam iguais.
 *
 * O vídeo NÃO entra com prefers-reduced-motion, Save-Data ou 2G; se falhar, fica o poster.
 */
export function VideoBackground({ dimmed = false }: Props) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    const limited = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    const apply = () => setAllowVideo(!mq.matches && !limited);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // ---- espelho vídeo → canvas ----
  useEffect(() => {
    const video = videoRef.current as VideoWithRVFC | null;
    const canvas = canvasRef.current;
    if (!allowVideo || !video || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      setFailed(true);
      return;
    }

    let frameId = 0;
    let rafId = 0;
    let stopped = false;
    let firstFrame = false;

    const resize = () => {
      // resolução do canvas = viewport (DPR limitado a 1.5 para custo baixo no celular)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const draw = () => {
      if (stopped) return;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (vw && vh && video.readyState >= 2) {
        // object-fit: cover (mesmo enquadramento do poster)
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = cw / scale;
        const sh = ch / scale;
        const sx = (vw - sw) / 2;
        const sy = (vh - sh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
        if (!firstFrame) {
          firstFrame = true;
          setReady(true);
          window.dispatchEvent(new CustomEvent("jr:video-playing"));
        }
      }
      schedule();
    };
    const schedule = () => {
      if (stopped) return;
      if (video.requestVideoFrameCallback) frameId = video.requestVideoFrameCallback(draw);
      else rafId = window.requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") video.pause();
      else void video.play().catch(() => {});
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();

    return () => {
      stopped = true;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frameId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [allowVideo]);

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
        <>
          {/* Fonte de frames — invisível (não pode ser display:none: iOS não reproduz) */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 h-px w-px opacity-0"
            src="/video/links-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onError={() => setFailed(true)}
          />
          {/* Camada visível: canvas com os frames do vídeo (amostrável pelo backdrop-filter) */}
          <canvas
            ref={canvasRef}
            data-video-canvas=""
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 lg:scale-105 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
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
