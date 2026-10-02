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
        fixed md:sticky md:top-14 left-0 
        z-40 h-[calc(100vh-3.5rem)]
        w-full md:w-64 flex-shrink-0 flex flex-col
        border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="relative z-10 h-full flex flex-col">
        <SidebarHeader componentsCount={components.length} onClose={onClose} />

        <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          {components.length === 0 ? (
            <SidebarEmpty />
          ) : (
            <ul className="space-y-1 px-3" role="listbox" aria-label="Available components">
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
    </aside>
  );
}
