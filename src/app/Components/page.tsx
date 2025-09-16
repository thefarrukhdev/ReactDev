"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/Sidebar/Sidebar";
import ComponentPreview from "@/components/componentPreview";
import { NeoGlassButton } from "@/components/ui/Button/NeoglassButton";
import { Eye, Code } from "lucide-react";
import { componentsList } from "@/lib/componentsList";

export default function MainContent() {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);

  // 🔎 Filter
  const filteredComponents = componentsList.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeComponent = filteredComponents.find(c => c.id === selected);

  const handleSearch = (query: string, enterPressed?: boolean) => {
    setSearchQuery(query);
    if (enterPressed && filteredComponents.length > 0) {
      handleSelect(filteredComponents[0].id); // Enter bosilsa birinchi mos komponentni tanlash
    }
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    setShowPreview(true);
    setShowCode(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-slate-100 overflow-hidden">
      {/* ✅ Navbar endi search bilan ishlaydi */}
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 min-w-[220px] h-full border-r border-gray-800 bg-gray-900 overflow-y-auto shrink-0">
          <Sidebar components={filteredComponents} onSelect={handleSelect} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto w-full box-border">
          {!activeComponent ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-center text-gray-400">
              <p className="text-lg">👈 Chap tomondan komponent tanlang yoki Search orqali qidiring</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 w-full h-full p-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent text-center mt-6">
                {activeComponent.name}
              </h1>

              {/* Toggle */}
              <div className="flex gap-3 justify-center mt-2">
                <NeoGlassButton onClick={() => { setShowPreview(true); setShowCode(false); }}>
                  <Eye className="w-5 h-5 text-cyan-400" />
                </NeoGlassButton>
                <NeoGlassButton onClick={() => { setShowCode(true); setShowPreview(false); }}>
                  <Code className="w-5 h-5 text-purple-400" />
                </NeoGlassButton>
              </div>

              {showPreview && !showCode && (
                <div className="flex-1 w-full flex items-center justify-center mt-4 px-2">
                  <div className="w-full max-w-full h-full bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg">
                    {activeComponent.element}
                  </div>
                </div>
              )}

              {showCode && (
                <div className="flex-1 w-full px-2">
                  <ComponentPreview {...activeComponent} showPreview={showPreview} />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
