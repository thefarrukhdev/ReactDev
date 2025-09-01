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
    <aside className="h-full w-full max-w-xs md:max-w-[280px] bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm flex flex-col">
      <SidebarHeader componentsCount={components.length} />

      <div className="flex-1 p-4 overflow-y-auto">
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
    </aside>
  );
}
