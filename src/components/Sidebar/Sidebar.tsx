"use client";
import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarEmpty from "./SidebarEmpty";

export type ComponentItem = {
  id: string;
  name: string;
  element: React.ReactNode;
  code: string;
};

type SidebarProps = {
  components: ComponentItem[];
  onSelect: (id: string) => void;
};

export default function Sidebar({ components, onSelect }: SidebarProps) {
  const [active, setActive] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string>("");

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <>

      <aside className="h-full w-full max-w-xs md:max-w-[280px] relative overflow-hidden flex flex-col">
        {/* Main glass background with animated gradient */}
        <div 
          className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-r border-white/20 shadow-2xl shadow-black/10"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0.08) 25%,
                rgba(168,85,247,0.08) 50%,
                rgba(59,130,246,0.08) 75%,
                rgba(255,255,255,0.15) 100%
              )
            `,
            animation: 'liquid-shimmer 10s ease-in-out infinite',
          }}
        />

        {/* Animated overlay gradients */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(45deg, 
                rgba(59,130,246,0.1) 0%, 
                rgba(168,85,247,0.1) 25%,
                rgba(236,72,153,0.1) 50%,
                rgba(168,85,247,0.1) 75%,
                rgba(59,130,246,0.1) 100%
              )
            `,
            animation: 'liquid-shimmer 15s ease-in-out infinite reverse',
          }}
        />

        {/* Multi-layer glass effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <SidebarHeader componentsCount={components.length} />
          
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {components.length === 0 ? (
              <SidebarEmpty />
            ) : (
              <ul className="space-y-2">
                {components.map((item, index) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    index={index}
                    isActive={active === item.id}
                    isHovered={hoveredItem === item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem("")}
                    onClick={() => handleSelect(item.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
            transition: background 0.3s ease;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </aside>
    </>
  );
}