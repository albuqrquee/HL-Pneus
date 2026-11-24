import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ExternalLink, Minus, Plus } from 'lucide-react';
import { BRANCH_UNITS, type BranchUnit } from '../data/workshop';

const ZOOM_LEVELS = [1, 1.24, 1.48] as const;

interface LocationMapProps {
  unit?: BranchUnit;
}

export function LocationMap({ unit = BRANCH_UNITS[0] }: LocationMapProps) {
  const [zoomIndex, setZoomIndex] = useState<number>(0);
  const [pinFocused, setPinFocused] = useState<boolean>(false);

  const scale = ZOOM_LEVELS[zoomIndex];

  const handleZoomIn = () => {
    setZoomIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  };

  const handleZoomOut = () => {
    setZoomIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setZoomIndex(0);
    setPinFocused(true);
    window.setTimeout(() => setPinFocused(false), 1600);
  };

  const corridorTextWidth = Math.max(96, unit.corridorLabel.length * 7 + 14);

  return (
    <div
      className="relative surface-panel border border-hairline overflow-hidden"
      aria-label={`Mapa estilizado da localização da HL Pneus unidade ${unit.name}: ${unit.fullAddress}`}
    >
      {/* Top Minimalist Header Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-hairline bg-[hsl(var(--bg-canvas)/0.85)]">
        <div className="flex items-center gap-2 min-w-0">
          <span
            aria-hidden="true"
            className="w-2 h-2 bg-pepperoni shrink-0"
          />
          <span className="font-display text-xs uppercase tracking-[0.14em] text-ice truncate">
            {unit.street} · {unit.district}
          </span>
        </div>

        <a
          href={unit.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-steel hover:text-pepperoni transition-colors whitespace-nowrap shrink-0"
        >
          <span>Traçar rota</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>

      {/* Stylized Dark Minimalist Cartographic Canvas */}
      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-[hsl(var(--bg-canvas))]">
        <motion.div
          key={unit.id}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1, scale }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full origin-center relative"
        >
          <svg
            viewBox="0 0 600 320"
            className="w-full h-full block select-none"
            role="img"
            aria-label={`Representação cartográfica minimalista da unidade ${unit.name}: ${unit.fullAddress}`}
          >
            <defs>
              <pattern
                id="hl-map-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="hsl(215 14% 16%)"
                  strokeWidth="0.7"
                />
              </pattern>
              <radialGradient id="hl-pin-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(351 81% 49%)" stopOpacity="0.34" />
                <stop offset="65%" stopColor="hsl(351 81% 49%)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="hsl(351 81% 49%)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Architectural Grid */}
            <rect width="600" height="320" fill="hsl(220 15% 5%)" />
            <rect width="600" height="320" fill="url(#hl-map-grid)" opacity="0.65" />

            {/* Subtle Urban Blocks */}
            <g fill="hsl(220 13% 8%)" stroke="hsl(215 14% 14%)" strokeWidth="1">
              <rect x="34" y="28" width="96" height="58" />
              <rect x="150" y="24" width="112" height="52" />
              <rect x="316" y="22" width="108" height="46" />
              <rect x="444" y="28" width="120" height="62" />
              <rect x="42" y="128" width="84" height="64" />
              <rect x="164" y="138" width="98" height="68" />
              <rect x="340" y="156" width="94" height="58" />
              <rect x="458" y="142" width="104" height="72" />
              <rect x="48" y="226" width="118" height="64" />
              <rect x="192" y="232" width="108" height="58" />
              <rect x="330" y="236" width="112" height="54" />
              <rect x="466" y="234" width="96" height="56" />
            </g>

            {/* Secondary Connecting Streets */}
            <g
              fill="none"
              stroke="hsl(215 14% 18%)"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <path d="M 0 110 L 600 102" />
              <path d="M 0 214 L 600 222" />
              <path d="M 140 0 L 136 320" />
              <path d="M 282 0 L 296 320" />
              <path d="M 434 0 L 450 320" />
            </g>

            {/* Primary Corridor for Selected Unit */}
            <g transform={`rotate(${unit.mapAngleDeg + 22}, 302, 141)`}>
              <path
                d="M -20 278 C 125 210, 235 162, 345 126 C 445 93, 525 70, 620 44"
                fill="none"
                stroke="hsl(215 15% 24%)"
                strokeWidth="12"
              />
              <path
                d="M -20 278 C 125 210, 235 162, 345 126 C 445 93, 525 70, 620 44"
                fill="none"
                stroke="hsl(351 81% 49% / 0.5)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              <g transform="translate(88, 214) rotate(-22)">
                <rect
                  x="-6"
                  y="-11"
                  width={corridorTextWidth}
                  height="16"
                  fill="hsl(220 15% 5% / 0.92)"
                />
                <text
                  x="0"
                  y="0"
                  fill="hsl(215 16% 74%)"
                  fontSize="9.5"
                  fontWeight="600"
                  letterSpacing="1.5"
                  fontFamily="Oswald, sans-serif"
                >
                  {unit.corridorLabel}
                </text>
              </g>
            </g>

            {/* District / City Label */}
            <text
              x="564"
              y="272"
              textAnchor="end"
              fill="hsl(215 13% 50%)"
              fontSize="10"
              fontWeight="600"
              letterSpacing="1.8"
              fontFamily="Oswald, sans-serif"
            >
              {unit.cityState.toUpperCase()}
            </text>

            {/* Precision Target Glow & Reticle */}
            <g transform="translate(302, 141)">
              <circle cx="0" cy="0" r="56" fill="url(#hl-pin-glow)" />
              <circle
                cx="0"
                cy="0"
                r={pinFocused ? '30' : '24'}
                fill="none"
                stroke="hsl(351 81% 49% / 0.5)"
                strokeWidth="1"
              />
              <line
                x1="-34"
                y1="0"
                x2="-14"
                y2="0"
                stroke="hsl(351 81% 49% / 0.65)"
                strokeWidth="1"
              />
              <line
                x1="14"
                y1="0"
                x2="34"
                y2="0"
                stroke="hsl(351 81% 49% / 0.65)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="-34"
                x2="0"
                y2="-14"
                stroke="hsl(351 81% 49% / 0.65)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="14"
                x2="0"
                y2="34"
                stroke="hsl(351 81% 49% / 0.65)"
                strokeWidth="1"
              />

              <circle
                cx="0"
                cy="0"
                r="10"
                fill="hsl(351 81% 49%)"
                stroke="hsl(210 40% 98%)"
                strokeWidth="2.5"
              />
              <circle cx="0" cy="0" r="3" fill="hsl(210 40% 98%)" />
            </g>
          </svg>
        </motion.div>

        {/* Floating Minimalist Location Callout */}
        <div className="pointer-events-none absolute top-3 left-3 bg-[hsl(var(--bg-canvas)/0.92)] border border-hairline px-3 py-2 backdrop-blur-sm max-w-[78%]">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-ice">
            HL Pneus · {unit.name}
          </p>
          <p className="text-[11px] text-steel truncate">
            {unit.reference ? `${unit.reference} · ${unit.cityState}` : unit.cityState}
          </p>
        </div>

        {/* Precision Corner Calibration Tick */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-pepperoni/80"
        />

        {/* Minimalist Zoom & Recenter Controls */}
        <div
          className="absolute bottom-3 right-3 flex items-center border border-hairline bg-[hsl(var(--bg-canvas)/0.92)] backdrop-blur-sm divide-x divide-hairline"
          role="group"
          aria-label="Controles de visualização do mapa"
        >
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomIndex === 0}
            aria-label="Reduzir zoom do mapa"
            className="w-10 h-10 flex items-center justify-center text-steel hover:text-ice disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Centralizar marcador da unidade"
            className="w-10 h-10 flex items-center justify-center text-steel hover:text-pepperoni transition-colors cursor-pointer"
          >
            <Crosshair className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            aria-label="Ampliar zoom do mapa"
            className="w-10 h-10 flex items-center justify-center text-steel hover:text-ice disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
