"use client";

import Navbar from "@/components/Navbar/page";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-neutral-900">
      {/* Navbar */}
      <Navbar onSearch={function (query: string, enterPressed?: boolean): void {
              throw new Error("Function not implemented.");
          } } />

      {/* Page Content */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
