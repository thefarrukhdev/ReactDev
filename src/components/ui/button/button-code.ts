export const neoglassButtonCode = `import React from 'react';
import { Loader2 } from 'lucide-react';

export type NeoVariant = "primary" | "secondary" | "danger" | "ghost";
export type NeoSize = "sm" | "md" | "lg";

export interface NeoGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeoVariant;
  size?: NeoSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const NeoGlassButton: React.FC<NeoGlassButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/30 text-white hover:from-cyan-400/30 hover:to-violet-400/30 hover:border-cyan-300/50 hover:shadow-cyan-400/25 focus:ring-cyan-400/50",
    secondary: "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-white/20 focus:ring-white/50",
    danger: "bg-gradient-to-r from-rose-500/20 to-red-500/20 border-rose-400/30 text-white hover:from-rose-400/30 hover:to-red-400/30 hover:border-rose-300/50 hover:shadow-rose-400/25 focus:ring-rose-400/50",
    ghost: "bg-transparent border-transparent text-white hover:bg-white/10 hover:border-white/20 focus:ring-white/30"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-3"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-semibold rounded-xl backdrop-blur-xl border transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
        "active:scale-95 hover:scale-105",
        "shadow-lg hover:shadow-xl",
        "before:absolute before:inset-[1px] before:rounded-[11px] before:bg-gradient-to-t before:from-white/5 before:to-white/20 before:pointer-events-none",
        "after:absolute after:inset-0 after:rounded-xl after:shadow-inner after:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && "opacity-60 cursor-not-allowed hover:scale-100 active:scale-100",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={cn("animate-spin", iconSizes[size])} />
      )}
      
      {!loading && leftIcon && (
        <span className={iconSizes[size]}>{leftIcon}</span>
      )}
      
      {!loading && (
        <span className="relative z-10 tracking-wide">{children}</span>
      )}
      
      {!loading && rightIcon && (
        <span className={iconSizes[size]}>{rightIcon}</span>
      )}
      
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
        variant === "primary" && "bg-gradient-to-r from-cyan-400/20 to-violet-400/20 blur-xl",
        variant === "danger" && "bg-gradient-to-r from-rose-400/20 to-red-400/20 blur-xl",
        variant === "secondary" && "bg-white/10 blur-xl",
        variant === "ghost" && "bg-white/5 blur-xl"
      )} />
    </button>
  );
};`