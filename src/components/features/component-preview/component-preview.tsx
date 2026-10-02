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
    <div className="w-full space-y-6 relative group">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {name}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Component preview and source code.</p>
        </div>

        {showPreview && (
          <button
            onClick={() => setPreviewVisible(!previewVisible)}
            className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:outline-none"
          >
            {previewVisible ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" /> Show Preview
              </>
            )}
          </button>
        )}
      </div>

      {/* TABS */}
      {sections.length > 1 && (
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === id
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* PREVIEW */}
      {showPreview && previewVisible && (
        <div className="relative rounded-xl border bg-card text-card-foreground shadow-sm mt-4">
          <div className="relative p-6 flex min-h-[350px] items-center justify-center">
            {element}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative space-y-6 mt-4">
        {sections.map(
          ({ id, label, content }) =>
            activeTab === id && (
              <div key={id} className="relative rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <button
                    onClick={() => handleCopy(content)}
                    className="inline-flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                  >
                    <Copy className="w-3 h-3 mr-2" /> Copy
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-muted-foreground font-mono bg-zinc-950 dark:bg-zinc-950">
                  <code className="text-zinc-50">{content}</code>
                </pre>
              </div>
            )
        )}
      </div>

      {/* SNACKBAR */}
      {copied && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <div className="px-4 py-3 rounded-md bg-foreground text-background shadow-lg border border-border">
            <span className="font-medium text-sm flex items-center gap-2">
              ✓ Copied to clipboard
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
