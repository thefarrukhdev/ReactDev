"use client";

import { useRouter } from "next/navigation";
import { Layers } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { useComponentShowcase } from "@/lib/hooks";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    isSidebarOpen,
    filteredComponents,
    handleSearch,
    openSidebar,
    closeSidebar,
  } = useComponentShowcase();

  const onSelect = (id: string) => {
    closeSidebar();
    router.push(`/components/${id}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-transparent text-slate-100 overflow-hidden">
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

        <main
          className="flex-1 h-full overflow-y-auto w-full box-border relative p-4"
          role="main"
          aria-label="Component preview area"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
