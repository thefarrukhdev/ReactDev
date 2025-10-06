"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function LiquidButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const baseClasses = `
    relative overflow-hidden group
    backdrop-blur-md border rounded-2xl font-medium
    flex items-center gap-2 justify-center
    px-5 py-2.5 transition-transform duration-300 ease-out
    hover:scale-105 active:scale-95
    before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500
    after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-700
    hover:before:opacity-100 hover:after:opacity-100
    transform-gpu
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-cyan-400/15 via-blue-500/25 to-purple-600/15
      border-cyan-400/30 text-cyan-100 shadow-md shadow-cyan-500/10
      hover:shadow-lg hover:shadow-cyan-400/25 hover:border-cyan-300/40
      before:bg-gradient-to-r before:from-cyan-300/20 before:via-blue-400/10 before:to-purple-500/20
      after:bg-white/5
    `,
    secondary: `
      bg-gradient-to-r from-purple-400/10 via-pink-500/15 to-rose-600/10
      border-purple-400/25 text-purple-100 shadow-md shadow-purple-500/10
      hover:shadow-lg hover:shadow-purple-400/25 hover:border-purple-300/35
      before:bg-gradient-to-r before:from-purple-300/15 before:via-pink-400/10 before:to-rose-500/15
      after:bg-white/5
    `,
    ghost: `
      bg-white/5 border-white/10 text-white/70
      hover:bg-white/10 hover:border-white/20 hover:text-white
      before:bg-white/10 after:bg-white/5
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* 💧 Liquid reflection effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute top-0 left-[-50%] w-[200%] h-full
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            opacity-0 group-hover:opacity-60
            translate-x-[-100%] group-hover:translate-x-0
            transition-all duration-[1200ms] ease-in-out
          "
        />
      </div>
    </button>
  );
}
