import brazilMap from "@svg-maps/brazil";

type MapLocation = { id: string; name: string; path: string };
const brazil = brazilMap as { label: string; viewBox: string; locations: MapLocation[] };

/**
 * Mapa REAL do Brasil em silhueta — geometria por estado de @svg-maps/brazil
 * (CC-BY-4.0, viewBox 0 0 613 639). Goiás e Distrito Federal em leve realce;
 * o restante do país é só contexto geográfico (a JR não tem cobertura nacional).
 *
 * Marcadores:
 * - Brasília = centro geométrico do DF calculado a partir do path do estado (409.4, 329.7).
 * - Goiânia = Brasília + deslocamento geográfico real (−1,34° lon, −0,90° lat)
 *   convertido pela escala do mapa → (388.5, 344.4), dentro do path de GO.
 */
const PINS = [
  { id: "goiania", city: "Goiânia", label: "Unidade GO", x: 388.5, y: 344.4, side: "left" as const },
  { id: "brasilia", city: "Brasília", label: "Unidade DF", x: 409.4, y: 329.7, side: "right" as const },
];

const HIGHLIGHT = new Set(["go", "df"]);

type Props = { className?: string };

export function BrazilMap({ className = "" }: Props) {
  return (
    <svg
      viewBox="-8 -8 629 655"
      role="img"
      aria-label="Mapa do Brasil com as unidades da JR Frutas em Goiânia (GO) e Brasília (DF)"
      className={className}
    >
      <defs>
        <pattern id="br-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0V14" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" />
        </pattern>
        <clipPath id="br-clip">
          {brazil.locations.map((l) => (
            <path key={l.id} d={l.path} />
          ))}
        </clipPath>
      </defs>

      {/* estados */}
      {brazil.locations.map((l) => {
        const hl = HIGHLIGHT.has(l.id);
        return (
          <path
            key={l.id}
            d={l.path}
            fill={hl ? "#242424" : "#0a0a0a"}
            stroke={hl ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)"}
            strokeWidth={hl ? 1.2 : 0.7}
            strokeLinejoin="round"
          >
            <title>{l.name}</title>
          </path>
        );
      })}
      {/* grid sutil recortado pelo país */}
      <rect x="0" y="0" width="613" height="639" fill="url(#br-grid)" clipPath="url(#br-clip)" opacity="0.7" />

      {/* marcadores */}
      {PINS.map((p) => {
        const dir = p.side === "left" ? -1 : 1;
        const lx = p.x + dir * 28;
        const anchor = p.side === "left" ? "end" : "start";
        return (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r="12" fill="#fff" opacity="0.12">
              <animate attributeName="r" values="8;18;8" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0;0.22" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="#000" strokeWidth="1.5" />
            <line x1={p.x + dir * 7} y1={p.y} x2={lx - dir * 3} y2={p.y} stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <text x={lx} y={p.y - 4} textAnchor={anchor} fill="#fff" fontSize="18" fontWeight="800" fontFamily="var(--font-display)">
              {p.city}
            </text>
            <text x={lx} y={p.y + 13} textAnchor={anchor} fill="rgba(255,255,255,0.65)" fontSize="11" fontWeight="700" letterSpacing="1.2" fontFamily="var(--font-display)">
              {p.label.toUpperCase()}
            </text>
            <title>{`${p.city} — ${p.label}`}</title>
          </g>
        );
      })}
    </svg>
  );
}
