"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * DynamicTileWave
 * Ultra-high-performance HTML5 Canvas rendering a 3D undulating white-tiled wave matrix
 * with interactive cursor deflection, responsive DPR scaling, and progressive idle startup.
 */
export default function DynamicTileWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let tileSize = 44;
    const gap = 3;

    // Mouse tracking for interactive wave ripple deflection
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 220,
      radiusSq: 220 * 220,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Responsive Canvas Resizing with capped DPR for 60fps performance
    let resizeTimer: number | null = null;
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      // Adaptive tile sizing: slightly larger on mobile viewports for CPU efficiency
      tileSize = width < 640 ? 52 : 44;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const debouncedResize = () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(handleResize);
    };

    handleResize();
    window.addEventListener("resize", debouncedResize, { passive: true });

    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TWO_PI = Math.PI * 2;

    const render = () => {
      if (!isRunning) return;

      if (!prefersReducedMotion) {
        time += 0.024;
      }

      // Smooth mouse interpolation with sleep threshold
      if (mouse.active) {
        const dx = mouse.targetX - mouse.x;
        const dy = mouse.targetY - mouse.y;
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          mouse.x += dx * 0.08;
          mouse.y += dy * 0.08;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / tileSize) + 2;
      const rows = Math.ceil(height / tileSize) + 2;
      const startX = -tileSize;
      const startY = -tileSize;
      const halfWidth = width * 0.5;
      const halfHeight = height * 0.5;
      const baseTileDim = tileSize - gap;

      for (let r = 0; r < rows; r++) {
        const y = startY + r * tileSize;
        const centerY = y + tileSize * 0.5;
        const cdy = centerY - halfHeight;
        const cdySq = cdy * cdy;

        for (let c = 0; c < cols; c++) {
          const x = startX + c * tileSize;
          const centerX = x + tileSize * 0.5;
          const cdx = centerX - halfWidth;

          // Harmonic multi-frequency waves
          const w1 = Math.sin(centerX * 0.008 + centerY * 0.006 - time * 1.4);
          const w2 = Math.cos(centerX * 0.005 - centerY * 0.007 + time * 0.9);
          const distFromCenter = Math.sqrt(cdx * cdx + cdySq);
          const w3 = Math.sin(distFromCenter * 0.006 - time * 1.8) * 0.5;

          let waveHeight = (w1 + w2 + w3) * 0.4; // equivalent to / 2.5

          // Fast mouse wave ripple (skips Math.sqrt for 95% of non-hovered tiles)
          if (mouse.active) {
            const mdx = centerX - mouse.x;
            const mdy = centerY - mouse.y;
            const distSq = mdx * mdx + mdy * mdy;
            if (distSq < mouse.radiusSq) {
              const distToMouse = Math.sqrt(distSq);
              const mouseFactor = 1 - distToMouse / mouse.radius;
              const ripple = Math.sin(distToMouse * 0.04 - time * 4.0) * mouseFactor;
              waveHeight += ripple * 0.85;
            }
          }

          const normElev = Math.max(0, Math.min(1, (waveHeight + 1) * 0.5));
          const borderAlpha = 0.03 + normElev * 0.28;
          const scale = 0.88 + normElev * 0.14;

          const actualSize = baseTileDim * scale;
          const offset = (tileSize - actualSize) * 0.5;
          const tileX = x + offset;
          const tileY = y + offset;

          ctx.strokeStyle = `rgba(255, 255, 255, ${borderAlpha})`;
          ctx.strokeRect(tileX, tileY, actualSize, actualSize);

          if (normElev > 0.72) {
            const pointAlpha = (normElev - 0.72) / 0.28;
            ctx.fillStyle = `rgba(255, 255, 255, ${pointAlpha * 0.85})`;
            ctx.fillRect(centerX - 1, centerY - 1, 2, 2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Performance: Pause animation when tab is inactive / hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Defer start until browser is idle to ensure critical hero content paints first
    const startRender = () => {
      isRunning = true;
      setIsReady(true);
      animationFrameId = requestAnimationFrame(render);
    };

    let idleCallbackId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleCallbackId = (
        window as unknown as {
          requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number;
        }
      ).requestIdleCallback(startRender, { timeout: 120 });
    } else {
      timeoutId = setTimeout(startRender, 60);
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        (
          window as unknown as { cancelIdleCallback: (id: number) => void }
        ).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (resizeTimer !== null) {
        cancelAnimationFrame(resizeTimer);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transform-gpu transition-opacity duration-700 ease-out"
      style={{
        opacity: isReady ? 0.9 : 0,
      }}
    />
  );
}
