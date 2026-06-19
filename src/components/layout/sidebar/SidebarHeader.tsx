// SidebarHeader.tsx - Liquid Glass Header
"use client";

import { Layers } from "lucide-react";

interface SidebarHeaderProps {
  componentsCount: number;
  onClose?: () => void;
}

export default function SidebarHeader({
  componentsCount,
  onClose,
}: SidebarHeaderProps) {
  return (
    <div className="relative p-6 border-b border-white/20 overflow-hidden">
      {/* Glass background layer */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(59,130,246,0.1) 0%, 
              rgba(168,85,247,0.1) 50%,
              rgba(236,72,153,0.1) 100%
            )
          `,
          animation: "liquid-shimmer 8s ease-in-out infinite",
        }}
      />

      {/* Close Button (mobile only) */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-20 right-4 p-2 rounded-lg 
                     bg-white/10 hover:bg-white/20 backdrop-blur-md 
                     border border-white/20 shadow-md 
                     transition duration-300 z-20"
          aria-label="Close Sidebar"
        >
          <Layers className="w-5 h-5 text-white" />
        </button>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3 group">
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg group-hover:scale-110 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden">
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Layers
              onClick={onClose}
              className="relative w-5 h-5 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm group-hover:bg-position-100 transition-all duration-500">
            Components
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-sm font-medium text-white/80">
              {componentsCount}{" "}
              {componentsCount === 1 ? "component" : "components"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
