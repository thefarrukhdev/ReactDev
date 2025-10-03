"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import ComponentPreview from "@/components/componentPreview";
import { NeoGlassButton } from "@/components/ui/Button/NeoglassButton";
import { Eye, Code, Layers } from "lucide-react";
import { componentsList } from "@/lib/componentsList";
import { motion, AnimatePresence } from "framer-motion";

export default function MainContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ mobil sidebar boshqaruvi

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
    setIsOpen(false); // ✅ Mobil qurilmada tanlagandan keyin sidebarni yopish
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-slate-100 overflow-hidden relative">
      {/* ✅ Liquid Glass Background Blur */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      {/* ✅ Navbar */}
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 h-full overflow-hidden relative z-10">
        {/* ✅ Hamburger tugmasi - faqat mobil va faqat sidebar yopiq bo‘lsa */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden fixed left-4 top-[72px] z-[60] p-2 
                       bg-white/10 backdrop-blur-lg rounded-xl shadow-lg
                       hover:bg-white/20 hover:scale-110 active:scale-95 
                       transition-all duration-300"
            aria-label="Open Sidebar"
          >
            <Layers className="w-6 h-6 text-white" />
          </button>
        )}

        {/* ✅ Sidebar */}
        <Sidebar
          components={filteredComponents}
          onSelect={handleSelect}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} // ✅ SidebarHeader yopish tugmasi uchun
        />

        {/* ✅ Main Content */}
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
                {/* ✅ Component nomi */}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent text-center drop-shadow-md">
                  {activeComponent.name}
                </h1>

                {/* ✅ Toggle Buttons */}
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

                {/* ✅ Content Preview / Code */}
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
                      className="w-full max-w-full h-full p-6 rounded-2xl 
                                 bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
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
                      className="w-full h-full rounded-2xl bg-black/50 
                                 backdrop-blur-md border border-white/10 p-4 shadow-inner"
                    >
                      <ComponentPreview
                        {...activeComponent}
                        showPreview={showPreview}
                      />
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
