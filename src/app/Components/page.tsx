"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import ComponentPreview from "@/components/componentPreview";
import { NeoGlassButton } from "@/components/ui/Button/NeoglassButton";
import { Eye, Code } from "lucide-react";
import { componentsList } from "@/lib/componentsList";
import { motion, AnimatePresence } from "framer-motion";

export default function MainContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);

  // 🔎 Filter – useMemo optimizatsiyasi
  const filteredComponents = useMemo(
    () =>
      componentsList.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const activeComponent = useMemo(
    () => filteredComponents.find((c) => c.id === selected),
    [filteredComponents, selected]
  );

  const handleSearch = (query: string, enterPressed?: boolean) => {
    setSearchQuery(query);
    if (enterPressed && filteredComponents.length > 0) {
      handleSelect(filteredComponents[0].id);
    }
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    setShowPreview(true);
    setShowCode(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-slate-100 overflow-hidden relative">
      {/* ✅ Liquid Glass Background Blur */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 h-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-64 min-w-[220px] h-full border-r border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-y-auto shrink-0 rounded-tr-2xl">
          <Sidebar components={filteredComponents} onSelect={handleSelect} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto w-full box-border relative p-4">
          {!activeComponent ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-center text-gray-400">
              <p className="text-lg animate-pulse">
                👈 Chap tomondan komponent tanlang yoki qidiring...
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComponent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col space-y-6 w-full h-full"
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent text-center drop-shadow-md">
                  {activeComponent.name}
                </h1>

                {/* Toggle Buttons */}
                <div className="flex gap-3 justify-center mt-2">
                  <NeoGlassButton
                    active={showPreview}
                    onClick={() => {
                      setShowPreview(true);
                      setShowCode(false);
                    }}
                  >
                    <Eye className="w-5 h-5" />
                  </NeoGlassButton>

                  <NeoGlassButton
                    active={showCode}
                    onClick={() => {
                      setShowCode(true);
                      setShowPreview(false);
                    }}
                  >
                    <Code className="w-5 h-5" />
                  </NeoGlassButton>
                </div>

                {/* Content Preview / Code */}
                <motion.div
                  className="flex-1 flex items-center justify-center mt-4"
                  layout
                >
                  {showPreview && !showCode && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
                    >
                      {activeComponent.element}
                    </motion.div>
                  )}

                  {showCode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-4 shadow-inner"
                    >
                      <ComponentPreview {...activeComponent} showPreview={showPreview} />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
