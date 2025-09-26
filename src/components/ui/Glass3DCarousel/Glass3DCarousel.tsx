"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { sampleCards } from "@/data/sampleCards";


// ===== Types =====
export interface Card {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  badge?: string;
}

export interface Glass3DCarouselProps {
  cards?: Card[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  rotationIntensity?: number; // degrees for side cards
  visibleRange?: number; // how many cards left/right to keep rendered
  onItemSelect?: (index: number, card: Card) => void;
}

// ===== Utility: clamp =====
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// ===== Component =====
export const Glass3DCarousel: React.FC<Glass3DCarouselProps> = ({
  cards = sampleCards,
  autoPlay = false,
  autoPlayInterval = 4000,
  showControls = true,
  rotationIntensity = 22,
  visibleRange = 3,
  onItemSelect,
}) => {
  // state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(Boolean(autoPlay));

  // refs for interaction + performance
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerStartRef = useRef<number | null>(null);
  const pointerDeltaRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  // keep length stable
  const len = cards.length;

  // ===== autoplay with pause-on-interaction =====
  useEffect(() => {
    if (!isPlaying) return;
    const tick = () => {
      setCurrentIndex((prev) => (prev + 1) % len);
    };

    autoplayTimerRef.current = window.setInterval(tick, autoPlayInterval);

    return () => {
      if (autoplayTimerRef.current) window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    };
  }, [isPlaying, autoPlayInterval, len]);

  // ===== navigation helpers =====
  const goTo = useCallback(
    (index: number) => setCurrentIndex(() => ((index % len) + len) % len),
    [len]
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // ===== pointer handlers (use pointer events for all inputs) =====
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // pointermove effect using RAF to avoid layout thrashing
    const onPointerMove = (ev: PointerEvent) => {
      if (!isPointerDownRef.current || pointerStartRef.current == null) return;
      pointerDeltaRef.current = ev.clientX - pointerStartRef.current;
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;

      const dist = pointerDeltaRef.current;
      const threshold = 60; // sensible for desktop & mobile
      if (dist > threshold) prev();
      else if (dist < -threshold) next();

      pointerDeltaRef.current = 0;
      pointerStartRef.current = null;

      // re-enable autoplay after short delay
      if (autoPlay) {
        setTimeout(() => setIsPlaying(true), 800);
      }
    };

    const onPointerDown = (ev: PointerEvent) => {
      // stop autoplay on user interaction
      if (isPlaying) setIsPlaying(false);
      isPointerDownRef.current = true;
      pointerStartRef.current = ev.clientX;
      pointerDeltaRef.current = 0;

      // capture pointer so move/up are delivered
      try { (ev.target as Element).setPointerCapture(ev.pointerId); } catch (e) {}
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isPlaying, prev, next, autoPlay]);

  // ===== smooth interactive visual update via RAF =====
  useEffect(() => {
    const tick = () => {
      // here we could update a shared CSS variable for subtle tilt based on pointerDeltaRef
      // This example sets a transform on the container for small parallax while dragging
      const container = containerRef.current;
      if (container) {
        const dd = pointerDeltaRef.current;
        // dampen and clamp
        const x = clamp(dd * 0.15, -40, 40);
        container.style.setProperty("--drag-x", `${x}px`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  // ===== memoized visible cards to avoid heavy rendering =====
  const visibleIndexes = useMemo(() => {
    const res: number[] = [];
    for (let i = -visibleRange; i <= visibleRange; i++) {
      res.push(((currentIndex + i) % len + len) % len);
    }
    return Array.from(new Set(res));
  }, [currentIndex, len, visibleRange]);

  // get transform style per card
  const getStyle = useCallback(
    (index: number) => {
      // compute distance in circular sense
      let diff = index - currentIndex;
      // normalize to [-len/2, len/2]
      if (diff > len / 2) diff -= len;
      if (diff < -len / 2) diff += len;
      const abs = Math.abs(diff);

      // base values
      const baseTranslateX = 260; // px between center and side (desktop)
      const translateX = diff * baseTranslateX;
      const translateZ = -Math.min(abs * 120, 360);
      const rotateY = -diff * rotationIntensity;
      const scale = clamp(1 - abs * 0.12, 0.6, 1);
      const opacity = clamp(1 - abs * 0.35, 0, 1);
      const zIndex = 100 - Math.round(abs * 10) - (diff === 0 ? 0 : Math.abs(diff));

      // responsive adjustments using CSS env var (we set via Tailwind breakpoints)
      return {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        willChange: "transform, opacity",
      } as React.CSSProperties;
    },
    [currentIndex, len, rotationIntensity]
  );

  // lazy decode images to avoid jank
  useEffect(() => {
    // try to decode nearby images for smoother transitions
    visibleIndexes.forEach((i) => {
      const url = cards[i]?.image;
      if (!url) return;
      const img = new Image();
      img.src = url;
      // browsers decode automatically; we don't block rendering on it
    });
  }, [visibleIndexes, cards]);

  // Accessibility: keyboard
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft") prev();
      if (ev.key === "ArrowRight") next();
      if (ev.key === " " || ev.key === "Spacebar") {
        ev.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ===== render =====
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Glass 3D carousel"
      className="relative w-full max-w-6xl mx-auto p-4 sm:p-6"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 opacity-40" />
        <div className="absolute inset-0 blur-3xl opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-600 via-purple-600 to-pink-600 mix-blend-screen" />
      </div>

      {/* Controls top-right */}
      {showControls && (
        <div className="absolute right-4 top-4 flex items-center gap-3 z-30">
          <button
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
            onClick={() => setIsPlaying((p) => !p)}
            className="rounded-full p-2 shadow-md backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
          </button>
        </div>
      )}

      {/* carousel viewport */}
      <div
        ref={containerRef}
        className="relative h-[420px] sm:h-[440px] md:h-[460px] lg:h-[520px] flex items-center justify-center select-none"
        style={{ perspective: "1200px" }}
      >
        {/* left arrow */}
        {showControls && (
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 z-30 rounded-full p-3 shadow-lg bg-white/8 backdrop-blur-md hover:scale-105 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* card stack */}
        <div
          className="relative w-full flex items-center justify-center"
          // small transform to follow pointer drag via CSS var
          style={{ transform: "translateX(var(--drag-x, 0))" }}
        >
          {cards.map((card, index) => {
            // only render nearby cards to prevent heavy DOM
            if (!visibleIndexes.includes(index)) return null;

            const style = getStyle(index);

            // center card width responsive
            const baseWidth = "w-[68%] sm:w-[56%] md:w-[48%] lg:w-[36%] xl:w-[30%]";

            return (
              <article
                key={card.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${len}: ${card.title}`}
                onClick={() => onItemSelect?.(index, card)}
                className={`absolute transition-[transform,opacity] duration-700 ease-out ${baseWidth} max-w-[900px]`}
                style={style}
              >
                {/* GLASS CARD */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
                  {/* glass surface */}
                  <div className="absolute inset-0 bg-white/6 backdrop-blur-[8px] border border-white/8 rounded-3xl shadow-inner" />

                  {/* soft gradient overlay for "liquid glass" look */}
                  <div className="absolute inset-0 pointer-events-none rounded-3xl">
                    <div className="absolute inset-0 opacity-60 bg-gradient-to-tr from-white/6 via-transparent to-black/10 mix-blend-overlay" />
                    <div className="absolute -left-10 -top-10 w-72 h-72 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-40" />
                    <div className="absolute -right-12 -bottom-12 w-96 h-96 rounded-full bg-gradient-to-bl from-pink-400/8 to-transparent blur-3xl opacity-30" />
                  </div>

                  {/* content */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    {card.badge && (
                      <span className="self-end text-xs font-semibold inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-sm">
                        {card.badge}
                      </span>
                    )}

                    {card.image && (
                      <div className="mt-3 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    )}

                    <div className="mt-4 flex-grow">
                      {card.category && <div className="text-sm text-indigo-200 font-medium mb-1">{card.category}</div>}
                      <h3 className="text-white text-lg md:text-2xl font-bold leading-tight">{card.title}</h3>
                      <p className="text-white/80 mt-2 text-sm md:text-base leading-relaxed">{card.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-75" />
                        <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-150" />
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); onItemSelect?.(index, card); }}
                        className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white"
                      >
                        Explore
                      </button>
                    </div>
                  </div>

                  {/* outer glow on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/8 via-indigo-400/6 to-pink-400/8 blur-xl rounded-3xl" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* right arrow */}
        {showControls && (
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 z-30 rounded-full p-3 shadow-lg bg-white/8 backdrop-blur-md hover:scale-105 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* pagination dots + progress */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex gap-3 items-center">
          {cards.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.25)]" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        <div className="w-full max-w-md">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-700"
              style={{ width: `${((currentIndex + 1) / len) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* counter */}
      <div className="absolute left-4 bottom-4 bg-white/6 backdrop-blur-md border border-white/6 px-3 py-2 rounded-lg text-sm text-white z-30">
        {currentIndex + 1} / {len}
      </div>
    </section>
  );
};

export default Glass3DCarousel;
