"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "premium";

export type NeonButtonProps = {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  glowIntensity?: "low" | "medium" | "high";
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function NeonButton({
  children,
  variant = "primary",
  fullWidth = false,
  glowIntensity = "medium",
  disabled = false,
  className = "",
  ...props
}: NeonButtonProps) {
  // Glow intensity levels
  const glowLevels = {
    low: {
      primary: "hover:shadow-[0_0_10px_rgba(56,189,248,0.7)]",
      secondary: "hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]",
      danger: "hover:shadow-[0_0_10px_rgba(239,68,68,0.7)]",
      ghost: "hover:shadow-[0_0_8px_rgba(56,189,248,0.5)]",
      premium: "hover:shadow-[0_0_15px_rgba(245,158,11,0.8)]"
    },
    medium: {
      primary: "hover:shadow-[0_0_20px_rgba(56,189,248,0.8)]",
      secondary: "hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]",
      danger: "hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]",
      ghost: "hover:shadow-[0_0_15px_rgba(56,189,248,0.6)]",
      premium: "hover:shadow-[0_0_25px_rgba(245,158,11,0.9)]"
    },
    high: {
      primary: "hover:shadow-[0_0_30px_rgba(56,189,248,0.9)]",
      secondary: "hover:shadow-[0_0_30px_rgba(168,85,247,0.9)]",
      danger: "hover:shadow-[0_0_30px_rgba(239,68,68,0.9)]",
      ghost: "hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]",
      premium: "hover:shadow-[0_0_35px_rgba(245,158,11,1)]"
    }
  };

  // Base classes for all buttons
  let baseClasses = "relative rounded-xl px-6 py-3 font-semibold text-sm flex items-center gap-2 justify-center transition-all duration-300 transform overflow-hidden group";

  // Hover effects
  const hoverEffects = "hover:scale-105 active:scale-95";

  // Focus styles
  const focusStyles = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

  // Variant specific classes
  let variantClasses = "";
  let textGradient = "";
  
  switch (variant) {
    case "primary":
      variantClasses = `bg-gradient-to-br from-cyan-900/40 via-slate-900/80 to-cyan-900/40 border border-cyan-500/50 ${glowLevels[glowIntensity].primary}`;
      textGradient = "from-cyan-300 to-cyan-100";
      break;
    case "secondary":
      variantClasses = `bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-purple-900/40 border border-purple-500/50 ${glowLevels[glowIntensity].secondary}`;
      textGradient = "from-purple-300 to-purple-100";
      break;
    case "danger":
      variantClasses = `bg-gradient-to-br from-red-900/40 via-slate-900/80 to-red-900/40 border border-red-500/50 ${glowLevels[glowIntensity].danger}`;
      textGradient = "from-red-300 to-red-100";
      break;
    case "ghost":
      variantClasses = `bg-transparent border border-slate-600/50 ${glowLevels[glowIntensity].ghost}`;
      textGradient = "from-slate-200 to-slate-100";
      break;
    case "premium":
      variantClasses = `bg-gradient-to-br from-amber-900/30 via-slate-900/80 to-amber-900/30 border border-amber-500/60 ${glowLevels[glowIntensity].premium}`;
      textGradient = "from-amber-300 to-amber-100";
      break;
  }

  // Disabled state
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed grayscale" 
    : `${hoverEffects} ${focusStyles}`;

  // Full width class
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Animated background effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      
      {/* Inner glow effect */}
      <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        variant === "primary" ? "bg-cyan-500/10" :
        variant === "secondary" ? "bg-purple-500/10" :
        variant === "danger" ? "bg-red-500/10" :
        variant === "premium" ? "bg-amber-500/10" :
        "bg-cyan-500/5"
      }`}></span>
      
      {/* Button content */}
      <span className={`relative bg-gradient-to-r ${textGradient} bg-clip-text text-transparent flex items-center`}>
        {children}
      </span>
      
      {/* Light reflection effect */}
      <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl"></span>
    </button>
  );
}