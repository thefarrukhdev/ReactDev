// SidebarItem.tsx - Liquid Glass Items
import { ChevronRight, Code } from "lucide-react";
import { ComponentItem } from "@/types";

interface SidebarItemProps {
  item: ComponentItem;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SidebarItem({ 
  item, 
  index, 
  isActive, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}: SidebarItemProps) {
  return (
    <li role="option" aria-selected={isActive}>
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={`Select ${item.name} component`}
        className={`group relative w-full text-left p-4 rounded-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
          transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden
          ${isActive
            ? "scale-[1.02] -translate-y-1 shadow-2xl shadow-blue-500/20"
            : "shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-white/10"
          }`}
        style={{
          animationDelay: `${index * 50}ms`,
          animation: "slideInLeft 0.5s ease-out forwards"
        }}
      >
        {/* Base glass background */}
        <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transition-all duration-500
          ${isActive
            ? "bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/10 border-white/30"
            : "bg-white/10 border-white/15 group-hover:bg-white/15 group-hover:border-white/25"
          }`} />

        {/* Active state animated background */}
        {isActive && (
          <div 
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(59,130,246,0.2) 0%, 
                  rgba(168,85,247,0.15) 50%,
                  rgba(236,72,153,0.1) 100%
                )
              `,
              animation: 'liquid-shimmer 6s ease-in-out infinite',
            }}
          />
        )}

        {/* Hover glow effect */}
        {isHovered && !isActive && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 via-purple-400/5 to-white/5 opacity-100 transition-opacity duration-500" />
        )}

        {/* Content */}
        <div className="relative flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl backdrop-blur-sm transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110
              ${isActive
                ? "bg-white/20 border border-white/30 shadow-lg"
                : "bg-white/10 border border-white/15 group-hover:bg-white/15 group-hover:border-white/25"
              }`}>
              <Code className={`w-4 h-4 transition-all duration-500 drop-shadow-sm
                ${isActive
                  ? "text-white group-hover:rotate-12"
                  : "text-white/80 group-hover:text-white group-hover:rotate-6"
                }`} />
            </div>
            <span className={`font-medium transition-all duration-500 drop-shadow-sm
              ${isActive
                ? "text-white"
                : "text-white/90 group-hover:text-white"
              }`}>
              {item.name}
            </span>
          </div>
          
          <ChevronRight className={`w-4 h-4 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) drop-shadow-sm
            ${isActive
              ? "text-white transform rotate-90 scale-110"
              : "text-white/70 group-hover:text-white group-hover:transform group-hover:translate-x-1 group-hover:scale-110"
            }`} />
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/90 rounded-r-full shadow-lg shadow-white/50" 
               style={{ animation: 'float 3s ease-in-out infinite' }} />
        )}

        {/* Hover shimmer effect */}
        {isHovered && !isActive && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}
      </button>
    </li>
  );
}