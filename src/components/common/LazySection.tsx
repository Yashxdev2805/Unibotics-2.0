"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection
 * Progressively renders below-the-fold content when nearing the viewport.
 * Enhances user experience by prioritizing critical above-the-fold content first,
 * reducing initial DOM size, CPU parsing time, and network contention.
 */
export default function LazySection({
  children,
  fallback,
  minHeight = "400px",
  rootMargin = "350px 0px",
  className = "",
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`deferred-section transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
      style={{
        minHeight: isVisible ? undefined : minHeight,
      }}
    >
      {isVisible ? children : fallback || null}
    </div>
  );
}
