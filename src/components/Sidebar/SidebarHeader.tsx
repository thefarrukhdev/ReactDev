import { Layers } from "lucide-react";

interface SidebarHeaderProps {
  componentsCount: number;
}

export default function SidebarHeader({ componentsCount }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Components
        </h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{componentsCount}</p>
    </div>
  );
}
