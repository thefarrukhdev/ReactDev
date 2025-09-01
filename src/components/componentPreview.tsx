import { useState, ReactNode } from "react";
import NeonButton from "./NeonButton";
import { Check, Copy, Eye, EyeOff, Code, Terminal, Zap, Sparkles, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// Section ID literal
type SectionId = "install" | "usage" | "code";

// Section tipi
type Section = {
  id: SectionId;
  label: string;
  icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  content?: string;
};

// Props
type ComponentPreviewProps = {
  name: string;
  element: ReactNode;
  install?: string;
  usage?: string;
  code: string;
  showPreview?: boolean;
};

export default function ComponentPreview({
  name,
  element,
  install,
  usage,
  code,
  showPreview = true,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState<SectionId | null>(null);
  const [previewVisible, setPreviewVisible] = useState(showPreview);
  const [activeTab, setActiveTab] = useState<SectionId>("code");

  const handleCopy = async (text: string, label: SectionId) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Sections array
  const sections: Section[] = [
    { id: "install", label: "Installation", icon: Terminal, content: install },
    { id: "usage", label: "Usage", icon: Zap, content: usage },
    { id: "code", label: "Source Code", icon: Code, content: code },
  ].filter((s): s is Section & { content: string } => !!s.content);
   // filter orqali undefined content olib tashlanadi

  // .


  return (
    <div className="w-full text-slate-200 space-y-6">
      {/* Header */}
      <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">Component preview va kod namunasi</p>
          </div>
        </div>

        {showPreview && (
          <NeonButton onClick={() => setPreviewVisible(!previewVisible)} variant="secondary">
            {previewVisible ? <><EyeOff className="w-4 h-4" /> Yashirish</> : <><Eye className="w-4 h-4" /> Ko‘rsatish</>}
          </NeonButton>
        )}
      </div>

      {/* Component Preview */}
      {showPreview && previewVisible && (
        <div className="mb-8 group relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700 bg-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-sm font-medium text-slate-300">Component Preview</span>
          </div>
          <div className="p-6 sm:p-8 flex items-center justify-center min-h-[180px] sm:min-h-[200px] relative">
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: `radial-gradient(circle, rgba(56,189,248,0.1) 1px, transparent 1px)`, backgroundSize: "20px 20px" }}
            />
            <div className="relative z-10 transform transition-all duration-500 group-hover:scale-105">
              {element}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800/60 rounded-2xl border border-slate-700 backdrop-blur-sm min-w-max">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <NeonButton
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                variant={activeTab === s.id ? "primary" : "ghost"}
                className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{s.label}</span>
              </NeonButton>
            );
          })}
        </div>
      </div>

      {/* Code Sections */}
      <div className="space-y-6 relative">
        {sections.map(s => (
          <div
            key={s.id}
            className={`transition-all duration-500 ${
              activeTab === s.id ? "opacity-100 translate-y-0 scale-100 relative" : "opacity-0 translate-y-4 scale-95 absolute pointer-events-none"
            }`}
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/70 border-b border-slate-700 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-300">{s.label}</span>
                  </div>
                  <NeonButton
                    onClick={() => handleCopy(s.content!, s.id)}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
                  >
                    {copied === s.id ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                  </NeonButton>
                </div>
                <div className="relative">
                  <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed text-green-400">
                    <code>{s.content}</code>
                  </pre>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/20 pointer-events-none" />
                </div>
              </div>

              {copied === s.id && (
                <div className="absolute top-4 right-4 sm:right-20 bg-cyan-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium shadow-lg animate-pulse">
                  ✓ Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
