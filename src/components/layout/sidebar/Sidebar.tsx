"use client";

import { useState } from "react";
import { ComponentItem } from "@/types";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarEmpty from "./SidebarEmpty";

type SidebarProps = {
  components: ComponentItem[];
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ components, onSelect, isOpen, onClose }: SidebarProps) {
  const [active, setActive] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string>("");

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
    onClose();
  };

  return (
    <aside
      role="navigation"
      aria-label="Component list"
      className={`
        fixed md:static left-0 
        top-[64px] md:top-0
        z-50 h-[calc(100%-64px)] md:h-full
        w-64 max-w-[280px] flex-shrink-0 flex flex-col overflow-hidden
        rounded-2xl md:rounded-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Qoraytirilgan va kuchliroq blur */}
      <div
        className="absolute inset-0 backdrop-blur-3xl bg-black/40 border-r border-white/20 shadow-2xl shadow-black/20"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(0,0,0,0.4) 0%, 
              rgba(0,0,0,0.35) 25%,
              rgba(88,28,135,0.25) 50%,
              rgba(29,78,216,0.25) 75%,
              rgba(0,0,0,0.4) 100%
            )
          `,
          animation: "liquid-shimmer 10s ease-in-out infinite",
        }}
      />

      {/* Rangli gradient overlay biroz kuchaytirildi */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(59,130,246,0.15) 0%, 
              rgba(168,85,247,0.15) 25%,
              rgba(236,72,153,0.15) 50%,
              rgba(168,85,247,0.15) 75%,
              rgba(59,130,246,0.15) 100%
            )
          `,
          animation: "liquid-shimmer 15s ease-in-out infinite reverse",
        }}
      />

      {/* Ko‘p qatlamli shaffoflik */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      {/* Kontent */}
      <div className="relative z-10 h-full flex flex-col">
        <SidebarHeader componentsCount={components.length} onClose={onClose} />

        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          {components.length === 0 ? (
            <SidebarEmpty />
          ) : (
            <ul className="space-y-2" role="listbox" aria-label="Available components">
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

      {/* Custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </aside>
  );
}
