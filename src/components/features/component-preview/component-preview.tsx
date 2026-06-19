"use client";

import { useState, useMemo } from "react";
import { Copy, Eye, EyeOff, Code, Terminal, Zap, Sparkles } from "lucide-react";
import LiquidButton from "@/components/shared/buttons/LiquidButton";
import WindowHeader from "@/components/shared/window-header/window-header";
import { useCopyToClipboard } from "@/lib/hooks";
import { Section, SectionId, ComponentPreviewProps } from "./types";

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
  const { copied, copyToClipboard } = useCopyToClipboard();

  const sections = useMemo(
    () =>
      [
        install && { id: "install", label: "Installation", icon: Terminal, content: install },
        usage && { id: "usage", label: "Usage", icon: Zap, content: usage },
        { id: "code", label: "Source Code", icon: Code, content: code },
      ].filter(Boolean) as Section[],
    [install, usage, code]
  );

  const handleCopy = copyToClipboard;

  return (
    <div className="w-full text-white space-y-8 relative">
      {/* HEADER */}
      <div className="relative mb-8 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-lg overflow-hidden group transition-transform duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-500/10 to-purple-600/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent group-hover:via-white/10 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-600/20 shadow-md backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-7 h-7 text-white opacity-80" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                {name}
              </h2>
              <p className="text-white/60 mt-1 text-base">Liquid Glass Component</p>
            </div>
          </div>

          {showPreview && (
            <LiquidButton
              onClick={() => setPreviewVisible(!previewVisible)}
              variant="secondary"
            >
              {previewVisible ? (
                <>
                  <EyeOff className="w-5 h-5" /> Hide
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" /> Show
                </>
              )}
            </LiquidButton>
          )}
        </div>
      </div>

      {/* PREVIEW */}
      {showPreview && previewVisible && (
        <div className="relative mb-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg overflow-hidden transition-transform duration-500">
          <WindowHeader title="Component Preview" />
          <div className="relative p-8 flex items-center justify-center min-h-[220px]">
            {element}
          </div>
        </div>
      )}

      {/* TABS */}
      {sections.length > 1 && (
        <div className="relative mb-6 overflow-x-auto">
          <div className="flex flex-wrap gap-3 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-md">
            {sections.map(({ id, label, icon: Icon }) => (
              <LiquidButton
                key={id}
                onClick={() => setActiveTab(id)}
                variant={activeTab === id ? "primary" : "ghost"}
                className="px-5 py-2.5 text-sm font-medium transition-all duration-300"
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">{label}</span>
              </LiquidButton>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative space-y-6">
        {sections.map(
          ({ id, label, content }) =>
            activeTab === id && (
              <div key={id} className="relative fade-in">
                <div className="overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between">
                    <WindowHeader title={label} />
                    <LiquidButton
                      onClick={() => handleCopy(content)}
                      variant="secondary"
                      className="m-3 flex items-center gap-2 px-4 py-2 text-sm"
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </LiquidButton>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm leading-relaxed text-emerald-200 font-mono bg-black/30">
                    <code>{content}</code>
                  </pre>
                </div>
              </div>
            )
        )}
      </div>

      {/* SNACKBAR */}
      {copied && (
        <div className="fixed bottom-8 right-8 z-50 transition-transform duration-500">
          <div className="px-5 py-3 rounded-xl backdrop-blur-md shadow-lg border border-cyan-400/30 bg-cyan-500/10">
            <span className="text-white font-medium flex items-center gap-2">
              ✓ Copied to clipboard!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
