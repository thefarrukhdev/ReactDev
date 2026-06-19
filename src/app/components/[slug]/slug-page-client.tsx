"use client";

import { useState } from "react";
import { Eye, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NeoGlassButton } from "@/components/ui/button";
import { ComponentPreview } from "@/components/features/component-preview";
import { componentsList } from "@/lib/constants";

export default function SlugPageClient({ slug }: { slug: string }) {
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const component = componentsList.find((c) => c.id === slug);

  if (!component) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p className="text-lg">Component not found.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={component.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col space-y-6 w-full h-full p-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent text-center drop-shadow-md">
          {component.name}
        </h1>

        <div className="flex gap-3 justify-center">
          <NeoGlassButton
            active={showPreview}
            onClick={() => { setShowPreview(true); setShowCode(false); }}
            aria-label="Show preview"
          >
            <Eye className="w-5 h-5" />
          </NeoGlassButton>

          <NeoGlassButton
            active={showCode}
            onClick={() => { setShowCode(true); setShowPreview(false); }}
            aria-label="Show code"
          >
            <Code className="w-5 h-5" />
          </NeoGlassButton>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {showPreview && !showCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
            >
              {component.element}
            </motion.div>
          )}

          {showCode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-4 shadow-inner"
            >
              <ComponentPreview {...component} showPreview={showPreview} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
