import { ReactNode } from "react";

// components/common/Tabs.tsx
type TabProps = {
    tabs: { id: string; label: string; icon?: ReactNode }[];
    active: string;
    onChange: (id: string) => void;
  };
  
  export default function Tabs({ tabs, active, onChange }: TabProps) {
    return (
      <div className="flex gap-2 bg-slate-800/60 rounded-2xl p-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-3 py-2 rounded-md ${
              active === t.id ? "bg-cyan-500 text-white" : "bg-transparent hover:bg-slate-700"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
    );
  }
  