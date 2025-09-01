import { ChevronRight, Code } from "lucide-react";
import { ComponentItem } from "./Sidebar";

interface SidebarItemProps {
  item: ComponentItem;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SidebarItem({ item, index, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`group relative w-full text-left p-4 rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1
          ${isActive
            ? "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25 scale-[1.02] -translate-y-1"
            : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-600/50 hover:border-slate-300 dark:hover:border-slate-500"
          } backdrop-blur-sm`}
        style={{
          animationDelay: `${index * 50}ms`,
          animation: "slideInLeft 0.5s ease-out forwards"
        }}
      >
        {/* Hover Background Overlay */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300
          ${isHovered && !isActive
            ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-100"
            : "opacity-0"
          }`} />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-all duration-300
              ${isActive
                ? "bg-white/20 text-white"
                : "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30"
              }`}>
              <Code className="w-4 h-4" />
            </div>
            <span className={`font-medium transition-all duration-300
              ${isActive
                ? "text-white"
                : "text-slate-700 dark:text-slate-200 group-hover:text-slate-800 dark:group-hover:text-white"
              }`}>
              {item.name}
            </span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-all duration-300
            ${isActive
              ? "text-white transform rotate-90"
              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1"
            }`} />
        </div>

        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />}
        {isHovered && !isActive && <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none shadow-lg shadow-blue-500/10 opacity-100" />}
      </button>
    </li>
  );
}
