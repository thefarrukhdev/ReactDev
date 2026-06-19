"use client";

import { useState, useMemo, useCallback } from "react";
import { ComponentItem } from "@/types";
import { componentsList } from "@/lib/constants";

interface UseComponentShowcaseReturn {
  // State
  selected: string | null;
  searchQuery: string;
  showPreview: boolean;
  showCode: boolean;
  isSidebarOpen: boolean;
  // Derived
  filteredComponents: ComponentItem[];
  activeComponent: ComponentItem | undefined;
  // Actions
  handleSearch: (query: string, enterPressed?: boolean) => void;
  handleSelect: (id: string) => void;
  setShowPreview: (val: boolean) => void;
  setShowCode: (val: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export function useComponentShowcase(): UseComponentShowcaseReturn {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
    setShowPreview(true);
    setShowCode(false);
    setIsSidebarOpen(false);
  }, []);

  const handleSearch = useCallback(
    (query: string, enterPressed?: boolean) => {
      setSearchQuery(query);
      if (enterPressed && filteredComponents.length > 0) {
        handleSelect(filteredComponents[0].id);
      }
    },
    [filteredComponents, handleSelect]
  );

  return {
    selected,
    searchQuery,
    showPreview,
    showCode,
    isSidebarOpen,
    filteredComponents,
    activeComponent,
    handleSearch,
    handleSelect,
    setShowPreview,
    setShowCode,
    openSidebar: () => setIsSidebarOpen(true),
    closeSidebar: () => setIsSidebarOpen(false),
  };
}
