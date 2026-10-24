import React from "react";

export default function AtmosphereLayer() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-black transform-gpu"
    >
      {/* 1. Procedural Starfield (Pure SVG soft white dots on pure black) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9A3FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Distributed constellation points */}
        <circle cx="8%" cy="12%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="15%" cy="28%" r="1.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="22%" cy="8%" r="1" fill="#C9A3FF" opacity="0.5" />
        <circle cx="29%" cy="22%" r="1.2" fill="#FFFFFF" opacity="0.7" />
        <circle cx="37%" cy="15%" r="1" fill="#FFFFFF" opacity="0.4" />
        <circle cx="44%" cy="32%" r="1.8" fill="url(#starGlow)" opacity="0.9" />
        <circle cx="52%" cy="9%" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="59%" cy="24%" r="1.5" fill="#FFFFFF" opacity="0.75" />
        <circle cx="68%" cy="14%" r="1.2" fill="#C9A3FF" opacity="0.5" />
        <circle cx="76%" cy="29%" r="1.5" fill="url(#starGlow)" opacity="0.85" />
        <circle cx="84%" cy="11%" r="1" fill="#FFFFFF" opacity="0.55" />
        <circle cx="92%" cy="26%" r="1.4" fill="#FFFFFF" opacity="0.7" />
        <circle cx="96%" cy="16%" r="1" fill="#FFFFFF" opacity="0.4" />

        {/* Lower sky stars */}
        <circle cx="5%" cy="45%" r="1.2" fill="#FFFFFF" opacity="0.5" />
        <circle cx="18%" cy="58%" r="1" fill="#C9A3FF" opacity="0.6" />
        <circle cx="32%" cy="52%" r="1.4" fill="#FFFFFF" opacity="0.7" />
        <circle cx="48%" cy="62%" r="1" fill="#FFFFFF" opacity="0.4" />
        <circle cx="63%" cy="48%" r="1.6" fill="url(#starGlow)" opacity="0.8" />
        <circle cx="79%" cy="56%" r="1" fill="#FFFFFF" opacity="0.5" />
        <circle cx="91%" cy="65%" r="1.2" fill="#FFFFFF" opacity="0.65" />
        <circle cx="12%" cy="82%" r="1" fill="#FFFFFF" opacity="0.4" />
        <circle cx="38%" cy="78%" r="1.3" fill="#FFFFFF" opacity="0.6" />
        <circle cx="71%" cy="84%" r="1.2" fill="#C9A3FF" opacity="0.5" />
        <circle cx="88%" cy="88%" r="1" fill="#FFFFFF" opacity="0.45" />
      </svg>

      {/* 2. Glowing Violet Planetary Rim Arching Across Top (Static zero-overhead gradient) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1600px] h-[360px] md:h-[460px] -translate-y-16 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-full rounded-[100%] opacity-85"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 12%, rgba(160, 32, 255, 0.38) 0%, rgba(147, 18, 255, 0.18) 35%, rgba(122, 28, 248, 0.06) 60%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[200px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 30% at 50% 0%, rgba(217, 70, 239, 0.4) 0%, rgba(147, 18, 255, 0.25) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* 3. Subtle ambient bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
