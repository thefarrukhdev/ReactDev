"use client";

import { useRouter } from "next/navigation";
import { Layers, Eye, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { ComponentPreview } from "@/components/features/component-preview";
import { NeoGlassButton } from "@/components/ui/button";
import { useComponentShowcase } from "@/lib/hooks";

export default function ComponentsPage() {
  const router = useRouter();
  const {
    showPreview,
    showCode,
    isSidebarOpen,
    filteredComponents,
    activeComponent,
    handleSearch,
    handleSelect,
    setShowPreview,
    setShowCode,
    openSidebar,
    closeSidebar,
  } = useComponentShowcase();

  const onSelect = (id: string) => {
    handleSelect(id);
    router.push(`/components/${id}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-slate-100 overflow-hidden">
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 overflow-hidden relative">
        {!isSidebarOpen && (
          <button
            onClick={openSidebar}
            className="md:hidden fixed left-4 top-[72px] z-[60] p-2 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Open Sidebar"
          >
            <Layers className="w-6 h-6 text-white" />
          </button>
        )}

        <Sidebar
          components={filteredComponents}
          onSelect={onSelect}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <main className="flex-1 h-full overflow-y-auto w-full box-border relative p-4" role="main" aria-label="Component preview area">
          {!activeComponent ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-lg animate-pulse">
                👈 Select a component from the sidebar or search...
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

                <div className="flex gap-3 justify-center mt-2">
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

                <motion.div className="flex-1 flex items-center justify-center mt-4" layout>
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
