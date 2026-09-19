"use client";

import { useEffect, useState } from "react";

const PROPS = [
  "background",
  "backgroundColor",
  "backgroundImage",
  "backdropFilter",
  "webkitBackdropFilter",
  "filter",
  "opacity",
  "borderColor",
  "boxShadow",
] as const;

type Snap = Record<string, string>;

function snapshot(): Snap {
  const el = document.querySelector<HTMLElement>(".glass-card");
  if (!el) return { erro: "sem .glass-card" };
  const cs = getComputedStyle(el);
  const out: Snap = {};
  for (const p of PROPS) out[p] = (cs as unknown as Record<string, string>)[p] ?? "(n/a)";
  out.className = el.className.split(" ").filter((c) => !c.includes(":")).join(" ");
  out.attrs = Array.from(el.attributes)
    .map((a) => a.name)
    .join(",");
  return out;
}

/**
 * Diagnóstico visual (só com ?debug=1): compara os estilos computados do
 * primeiro .glass-card ANTES (A) e 2s DEPOIS (B) do vídeo começar a tocar.
 * Também lista atributos/classes do elemento e do fundo para detectar
 * qualquer mudança dinâmica ligada a playing/loaded/canplay.
 */
export function HubDebug() {
  const [a, setA] = useState<Snap | null>(null);
  const [b, setB] = useState<Snap | null>(null);
  const [bg, setBg] = useState("");

  useEffect(() => {
    const t = window.setTimeout(() => setA(snapshot()), 50);
    const onPlaying = () => {
      window.setTimeout(() => {
        setB(snapshot());
        const canvas = document.querySelector<HTMLCanvasElement>("[data-video-canvas]");
        const video = document.querySelector<HTMLVideoElement>("video");
        setBg(
          `canvas=${canvas ? `${canvas.width}x${canvas.height} opacity=${getComputedStyle(canvas).opacity}` : "—"} · video=${
            video ? `${video.videoWidth}x${video.videoHeight} paused=${video.paused} t=${video.currentTime.toFixed(1)}` : "—"
          }`,
        );
      }, 2000);
    };
    window.addEventListener("jr:video-playing", onPlaying, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("jr:video-playing", onPlaying);
    };
  }, []);

  const diff = a && b ? Object.keys(a).filter((k) => a[k] !== b[k]) : [];

  return (
    <div className="fixed inset-x-2 top-2 z-[70] max-h-[45dvh] overflow-auto rounded-lg border border-yellow-400/60 bg-black/85 p-2 font-mono text-[10px] leading-snug text-yellow-200">
      <p className="font-bold">DEBUG glass · A = antes de playing · B = 2s depois</p>
      <p className="mt-1">diferenças A→B: {a && b ? (diff.length ? diff.join(", ") : "NENHUMA (estilos idênticos)") : "aguardando B…"}</p>
      {bg ? <p>{bg}</p> : null}
      {(["A", "B"] as const).map((k) => {
        const s = k === "A" ? a : b;
        return s ? (
          <details key={k} className="mt-1">
            <summary>{k}</summary>
            <pre className="whitespace-pre-wrap break-all">{Object.entries(s).map(([p, v]) => `${p}: ${v}`).join("\n")}</pre>
          </details>
        ) : null;
      })}
    </div>
  );
}
