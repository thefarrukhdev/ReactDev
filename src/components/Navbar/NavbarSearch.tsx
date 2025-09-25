"use client";
import React, { useCallback, useMemo } from "react";
import { Search } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string, enterPressed?: boolean) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  isScrolled: boolean;
}

export default function NavbarSearch({
  value,
  onChange,
  onSearch,
  isFocused,
  setIsFocused,
  isScrolled,
}: SearchProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      onSearch(e.target.value, false);
    },
    [onChange, onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch(value, true);
      }
    },
    [onSearch, value]
  );

  const inputClasses = useMemo(
    () =>
      `w-full pl-10 pr-4 py-2.5 text-sm font-medium
       placeholder:text-white/60 text-white
       bg-white/10 border border-white/20 rounded-full backdrop-blur-xl
       transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
       focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40
       hover:shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-white/10
       ${isFocused ? "shadow-xl scale-[1.02] bg-white/20 ring-2 ring-white/40 shadow-white/20" : "shadow-md"}
       `.replace(/\s+/g, " ").trim(),
    [isFocused]
  );

  return (
    <div
      className={`flex-1 max-w-sm mx-4 transition-all duration-500 ease-out ${
        isScrolled ? "sm:max-w-xs" : "sm:max-w-md"
      }`}
    >
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
          <Search
            className={`h-4 w-4 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
              isFocused
                ? "text-white scale-110 drop-shadow-sm"
                : "text-white/70"
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Search Input */}
        <input
          type="search"
          placeholder={isScrolled ? "Search..." : "Search components, hooks..."}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          aria-label="Search components and documentation"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Focus glow effect */}
        {isFocused && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse duration-2000" />
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        {/* Additional liquid glass effect layers */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
      </div>
    </div>
  );
}