"use client";

import { useState, ReactNode } from "react";
import { Copy, Eye, EyeOff, Code, Terminal, Zap, Sparkles, LucideIcon } from "lucide-react";

type SectionId = "install" | "usage" | "code";

type Section = {
  id: SectionId;
  label: string;
  icon: LucideIcon;   // 🔥 any o‘rniga LucideIcon
  content: string;
};


type ComponentPreviewProps = {
  name: string;
  element: ReactNode;
  install?: string;
  usage?: string;
  code: string;
  showPreview?: boolean;
};

// Liquid Glass Button Component
function LiquidButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses = `
    relative overflow-hidden group transition-all duration-700 ease-out
    backdrop-blur-xl border rounded-2xl font-medium
    flex items-center gap-2 justify-center
    transform-gpu hover:scale-105 active:scale-95
    before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-700
    after:absolute after:inset-0 after:opacity-0 after:transition-all after:duration-1000
    hover:before:opacity-100 hover:after:opacity-100
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-cyan-400/20 via-blue-500/30 to-purple-600/20
      border-cyan-400/30 text-cyan-100 shadow-lg shadow-cyan-500/20
      hover:shadow-2xl hover:shadow-cyan-400/40 hover:border-cyan-300/50
      before:bg-gradient-to-r before:from-cyan-300/30 before:via-blue-400/20 before:to-purple-500/30
      after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-transparent
      hover:after:animate-pulse
    `,
    secondary: `
      bg-gradient-to-r from-purple-400/15 via-pink-500/25 to-rose-600/15
      border-purple-400/25 text-purple-100 shadow-lg shadow-purple-500/15
      hover:shadow-2xl hover:shadow-purple-400/35 hover:border-purple-300/45
      before:bg-gradient-to-r before:from-purple-300/25 before:via-pink-400/15 before:to-rose-500/25
      after:bg-gradient-to-tl after:from-transparent after:via-white/8 after:to-transparent
    `,
    ghost: `
      bg-white/5 border-white/15 text-white/80 shadow-lg shadow-white/5
      hover:bg-white/10 hover:border-white/25 hover:text-white
      hover:shadow-xl hover:shadow-white/10
      before:bg-white/10
      after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Liquid flow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
      </div>
    </button>
  );
}

function WindowHeader({ title }: { title: string }) {
  return (
    <div className="relative px-6 py-4 border-b border-white/10 backdrop-blur-2xl flex items-center gap-3 rounded-t-2xl overflow-hidden">
      {/* Liquid background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/15 to-purple-600/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      {/* Window controls */}
      <div className="relative z-10 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30 animate-pulse" />
        <div
          className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <span className="relative z-10 text-sm font-medium text-white/90 tracking-wide">
        {title}
      </span>

      {/* Floating particles */}
      <div
        className="absolute top-2 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-3 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}

export default function ComponentPreview({
  name,
  element,
  install,
  usage,
  code,
  showPreview = true,
}: ComponentPreviewProps) {
  const [previewVisible, setPreviewVisible] = useState(showPreview);
  const [activeTab, setActiveTab] = useState<SectionId>("code");
  const [copied, setCopied] = useState(false);

  const sections: Section[] = [
    install && {
      id: "install",
      label: "Installation",
      icon: Terminal,
      content: install,
    },
    usage && { id: "usage", label: "Usage", icon: Zap, content: usage },
    { id: "code", label: "Source Code", icon: Code, content: code },
  ].filter(Boolean) as Section[];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="w-full text-white space-y-8 relative">
      {/* Background liquid effects */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* HEADER */}
      <div className="relative mb-8 p-8 rounded-3xl backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden group">
        {/* Liquid glass background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/15 to-purple-600/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-all duration-1000" />

        {/* Floating liquid bubbles */}
        <div
          className="absolute top-4 right-8 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-6 left-12 w-3 h-3 bg-purple-400/50 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "1.2s" }}
        />
        <div className="absolute top-8 left-1/3 w-1 h-1 bg-blue-400/80 rounded-full animate-pulse" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative p-4 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/30 shadow-2xl backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-transform duration-700">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-400 bg-clip-text text-transparent animate-pulse">
                {name}
              </h2>
              <p className="text-white/70 mt-2 text-lg tracking-wide">
                Liquid Glass Component
              </p>
            </div>
          </div>

          {showPreview && (
            <LiquidButton
              onClick={() => setPreviewVisible(!previewVisible)}
              variant="secondary"
            >
              {previewVisible ? (
                <>
                  <EyeOff className="w-5 h-5" /> Yashirish
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" /> Ko&apos;rsatish
                </>
              )}
            </LiquidButton>
          )}
        </div>
      </div>

      {/* PREVIEW */}
      {showPreview && previewVisible && (
        <div className="relative mb-10 group overflow-hidden rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl transition-all duration-1000 hover:shadow-cyan-500/30">
          {/* Liquid background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-500/10 to-purple-600/5 group-hover:from-cyan-400/10 group-hover:via-blue-500/15 group-hover:to-purple-600/10 transition-all duration-1000" />

          <WindowHeader title="Component Preview" />
          <div className="relative bg-red-500 p-10 flex items-center justify-center min-h-[250px]">
            {/* Liquid grid pattern */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                animation: "float 6s ease-in-out infinite",
              }}
            />

            {/* Liquid flow lines */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div
                className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </div>

            <div className="relative z-10 transform transition-all duration-700 group-hover:scale-110">
              {element}
            </div>
          </div>
        </div>
      )}

      {/* TABS */}
      {sections.length > 1 && (
        <div className="relative mb-8 overflow-x-auto">
          <div className="flex flex-wrap gap-3 p-3 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-3xl rounded-3xl border border-white/20 min-w-max shadow-xl">
            {sections.map(({ id, label, icon: Icon }) => (
              <LiquidButton
                key={id}
                onClick={() => setActiveTab(id)}
                variant={activeTab === id ? "primary" : "ghost"}
                className="px-6 py-3 text-sm font-medium"
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">{label}</span>
              </LiquidButton>
            ))}
          </div>
        </div>
      )}

      {/* SECTION CONTENT */}
      <div className="relative space-y-8">
        {sections.map(
          ({ id, label, content }) =>
            activeTab === id && (
              <div key={id} className="relative animate-fadeIn">
                <div className="relative overflow-hidden rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl group">
                  {/* Liquid background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-teal-500/10 to-cyan-600/5 group-hover:from-emerald-400/8 group-hover:via-teal-500/15 group-hover:to-cyan-600/8 transition-all duration-1000" />

                  {/* HEADER + COPY BUTTON */}
                  <div className="flex items-center justify-between">
                    <WindowHeader title={label} />
                    <LiquidButton
                      onClick={() => handleCopy(content)}
                      variant="secondary"
                      className="m-3 flex items-center gap-2 px-4 py-2 text-sm z-20"
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </LiquidButton>
                  </div>

                  {/* CODE CONTENT */}
                  <div className="relative">
                    <pre className="relative z-10 p-8 overflow-x-auto text-sm leading-relaxed text-emerald-200 font-mono">
                      <code>{content}</code>
                    </pre>

                    {/* Floating code particles */}
                    <div className="absolute top-6 right-20 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-60" />
                    <div
                      className="absolute bottom-8 right-16 w-1 h-1 bg-teal-400 rounded-full animate-pulse opacity-40"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* LIQUID SNACKBAR */}
      {copied && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce">
          <div className="relative px-6 py-3 rounded-2xl backdrop-blur-2xl shadow-2xl border border-cyan-400/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-emerald-500/25 to-teal-600/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse" />
            <span className="relative z-10 text-white font-medium flex items-center gap-2">
              <span className="text-emerald-400 text-lg">✓</span>
              Copied to clipboard!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
