import { units } from "@/data/site";

/**
 * Mapa estilizado do Brasil (silhueta simplificada) com o Centro-Oeste em
 * destaque e pins nas unidades. Coordenadas geográficas → viewBox 0..100.
 */
const project = ([lon, lat]: [number, number]): [number, number] => [
  ((lon + 74) / 40) * 100,
  ((5.5 - lat) / 39.5) * 100,
];

const brazil: [number, number][] = [
  [-51.6, 4.3], [-50.2, 2.0], [-50.6, 0.3], [-48.6, -0.6], [-46.6, -1.0], [-44.4, -2.4],
  [-42.2, -2.7], [-40.2, -2.9], [-38.2, -3.6], [-36.3, -5.0], [-35.1, -5.7], [-34.8, -7.4],
  [-35.0, -9.3], [-36.4, -10.6], [-37.6, -11.6], [-38.6, -13.0], [-39.0, -15.0], [-39.2, -17.4],
  [-39.7, -18.8], [-40.1, -20.2], [-41.0, -21.6], [-42.1, -22.9], [-44.0, -23.1], [-45.6, -23.9],
  [-47.1, -24.8], [-48.5, -26.0], [-48.6, -27.7], [-49.7, -29.3], [-51.0, -31.1], [-52.5, -32.9],
  [-53.4, -33.7], [-53.6, -32.7], [-55.6, -31.0], [-57.6, -30.2], [-56.9, -29.2], [-56.0, -28.5],
  [-55.1, -27.8], [-53.8, -27.1], [-53.7, -26.2], [-54.6, -25.5], [-54.3, -24.0], [-55.6, -24.0],
  [-55.7, -22.5], [-57.8, -22.1], [-57.7, -19.0], [-58.2, -16.3], [-60.2, -15.1], [-60.5, -13.8],
  [-61.5, -13.5], [-63.2, -12.5], [-65.3, -10.9], [-65.4, -9.7], [-67.4, -10.4], [-69.6, -11.0],
  [-70.6, -9.5], [-72.4, -8.9], [-73.8, -7.3], [-72.9, -5.2], [-70.0, -4.3], [-69.9, -2.6],
  [-69.4, -1.1], [-70.0, 0.3], [-68.2, 1.7], [-66.9, 1.2], [-65.5, 1.0], [-64.0, 2.5],
  [-63.4, 3.9], [-61.0, 4.5], [-60.6, 5.2], [-60.0, 4.6], [-59.6, 3.4], [-59.8, 1.9],
  [-58.2, 1.5], [-56.2, 2.0], [-54.6, 2.3], [-53.0, 2.4], [-52.2, 3.2],
];

const centroOeste: [number, number][] = [
  [-61.6, -9.0], [-58.2, -7.9], [-54.2, -8.6], [-52.2, -9.6], [-50.2, -10.2], [-50.2, -12.7],
  [-48.2, -13.0], [-46.2, -13.0], [-46.0, -14.6], [-47.0, -16.1], [-47.3, -18.3], [-48.6, -18.5],
  [-50.0, -19.4], [-51.0, -20.6], [-51.6, -21.6], [-52.1, -22.6], [-53.1, -23.8], [-54.3, -24.0],
  [-55.6, -24.0], [-55.7, -22.5], [-57.8, -22.1], [-57.7, -19.0], [-58.2, -16.3], [-60.2, -15.1],
  [-60.5, -13.8], [-60.5, -13.0], [-61.5, -11.0],
];

const toPath = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${project(p).map((n) => n.toFixed(2)).join(" ")}`).join(" ") + " Z";

const BRAZIL_PATH = toPath(brazil);
const CO_PATH = toPath(centroOeste);

type Props = {
  /** "full" = Brasil inteiro; "region" = zoom no Centro-Oeste (desktop, como na referência) */
  view?: "full" | "region";
  tone?: "dark" | "light";
  className?: string;
};

export function BrazilMap({ view = "full", tone = "dark", className = "" }: Props) {
  const fill = tone === "dark" ? "#0a0a0a" : "#f1f1f1";
  const stroke = tone === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.18)";
  const region = tone === "dark" ? "#1f1f1f" : "#e2e2e2";
  const pinFill = tone === "dark" ? "#ffffff" : "#000000";
  const pinDot = tone === "dark" ? "#000000" : "#ffffff";
  const viewBox = view === "region" ? "28 31 50 46" : "-2 -2 104 104";
  const gridId = `map-grid-${view}`; // dois mapas na página (desktop/mobile) → ids únicos

  return (
    <svg viewBox={viewBox} role="img" aria-label="Mapa do Brasil com as unidades da JR Frutas em Goiânia e Brasília" className={className}>
      <defs>
        <pattern id={gridId} width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M3 0H0V3" fill="none" stroke={stroke} strokeWidth="0.12" opacity="0.5" />
        </pattern>
      </defs>
      {view === "region" ? (
        <>
          {/* Zoom no Centro-Oeste: região em preto sólido (como na referência), Brasil só como contorno de contexto */}
          <path d={BRAZIL_PATH} fill="none" stroke={stroke} strokeWidth="0.25" strokeDasharray="0.8 0.8" strokeLinejoin="round" />
          <path d={CO_PATH} fill={fill} stroke={stroke} strokeWidth="0.35" strokeLinejoin="round" />
          <path d={CO_PATH} fill={`url(#${gridId})`} opacity="0.7" />
        </>
      ) : (
        <>
          <path d={BRAZIL_PATH} fill={fill} stroke={stroke} strokeWidth="0.35" strokeLinejoin="round" />
          <path d={BRAZIL_PATH} fill={`url(#${gridId})`} opacity="0.6" />
          <path d={CO_PATH} fill={region} stroke={stroke} strokeWidth="0.3" strokeLinejoin="round" />
        </>
      )}
      {units.map((u) => {
        const [x, y] = project([u.lon, u.lat]);
        const s = view === "region" ? 0.8 : 1.1;
        return (
          <g key={u.id} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s})`}>
            <circle r="4.2" fill={pinFill} opacity="0.12">
              <animate attributeName="r" values="2.8;5.2;2.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <path
              d="M0 1.6c-1.9-2.2-2.9-3.6-2.9-5A2.9 2.9 0 0 1 2.9-3.4c0 1.4-1 2.8-2.9 5Z"
              fill={pinFill}
              transform="translate(0 -1.2)"
            />
            <circle cx="0" cy="-4.6" r="1" fill={pinDot} />
            <title>{u.name}</title>
          </g>
        );
      })}
    </svg>
  );
}
