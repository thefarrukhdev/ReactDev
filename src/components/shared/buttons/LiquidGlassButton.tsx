"use client";

import { ReactNode } from "react";
// import { cn } from "@/lib/utils"; // agar tailwindda helper bor bo'lsa ishlatamiz, bo'lmasa shunchaki className birlashtirish uchun template literal ishlatamiz

interface LiquidGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function LiquidGlassButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: LiquidGlassButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium backdrop-blur-xl transition-all duration-500 overflow-hidden border group";

  const variants = {
    primary:
      "bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border-cyan-400/30 text-cyan-300 hover:from-cyan-400/20 hover:to-purple-500/20 hover:border-cyan-300/50 hover:scale-[1.05] shadow-lg shadow-cyan-400/20",
    secondary:
      "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white hover:scale-[1.05]",
    ghost:
      "bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white hover:scale-[1.05]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {/* Liquid glass animated overlay */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          backgroundSize: "200% 200%",
          animation: "liquid-flow 6s ease-in-out infinite",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes liquid-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </button>
  );
}
