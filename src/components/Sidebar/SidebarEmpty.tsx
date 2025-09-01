import { Code } from "lucide-react";

export default function SidebarEmpty() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
        <Code className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-medium">
        Hech qanday komponent topilmadi
      </p>
    </div>
  );
}
