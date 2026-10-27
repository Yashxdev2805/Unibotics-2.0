"use client";

import React from "react";
import DynamicTileWave from "./DynamicTileWave";

/**
 * AtmosphereLayer
 * Deep Luxury Dark Theme with White Dynamic Tile Wave Background Effect
 * Includes interactive wave matrix, soft radial vignettes, and edge fades.
 */
export default function AtmosphereLayer() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 transform-gpu"
      style={{ background: "#08090C" }}
    >
      {/* 1. White Colored Dynamic Tile Wave Canvas */}
      <DynamicTileWave />

      {/* 2. Soft Ambient Radial Glow at Crown */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1600px] h-[400px] md:h-[550px] -translate-y-36 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 15%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)",
        }}
      />

      {/* 3. Lateral Vignettes (enhances central content readability) */}
      <div
        className="absolute inset-y-0 left-0 w-32 md:w-64 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #08090C 0%, rgba(8, 9, 12, 0.6) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 md:w-64 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #08090C 0%, rgba(8, 9, 12, 0.6) 50%, transparent 100%)",
        }}
      />

      {/* 4. Bottom Fade to Deep Dark Floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #08090C 0%, rgba(8, 9, 12, 0.85) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
