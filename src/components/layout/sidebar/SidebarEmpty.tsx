// SidebarEmpty.tsx - Liquid Glass Empty State
import { Package } from "lucide-react";

export default function SidebarEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* Glass container */}
      <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-xl overflow-hidden group hover:scale-105 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
        {/* Animated background */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(circle at center, 
                rgba(59,130,246,0.1) 0%, 
                rgba(168,85,247,0.05) 50%,
                transparent 100%
              )
            `,
            animation: 'liquid-shimmer 8s ease-in-out infinite',
          }}
        />

        <div className="relative z-10">
          {/* Icon with glass effect */}
          <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Package className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-500 drop-shadow-sm" />
          </div>
          
          {/* Text content */}
          <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-sm">
            No components yet
          </h3>
          <p className="text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
            Start building your component library. Your components will appear here as you create them.
          </p>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}