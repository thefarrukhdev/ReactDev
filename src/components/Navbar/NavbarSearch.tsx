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

export default function SearchInput({ value, onChange, onSearch, isFocused, setIsFocused, isScrolled }: SearchProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    onSearch(e.target.value, false);
  }, [onChange, onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(value, true);
    }
  }, [onSearch, value]);

  const inputClasses = useMemo(
    () =>
      `
      w-full pl-10 pr-4 py-2.5 text-sm font-medium
      placeholder:text-gray-500 dark:placeholder:text-gray-400
      bg-white/90 dark:bg-gray-800/90
      border border-gray-200/60 dark:border-gray-700/60
      rounded-full backdrop-blur-sm
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
      dark:focus:ring-blue-400/40 dark:focus:border-blue-400/60
      hover:shadow-lg hover:bg-white/95 dark:hover:bg-gray-800/95
      hover:border-gray-300/70 dark:hover:border-gray-600/70
      text-gray-900 dark:text-gray-100
      ${isFocused ? "shadow-xl scale-[1.02] bg-white dark:bg-gray-800 ring-2 ring-blue-500/40 dark:ring-blue-400/40" : "shadow-md"}
      `.replace(/\s+/g, " ").trim(),
    [isFocused]
  );

  return (
    <div className={`flex-1 max-w-sm mx-4 transition-all duration-500 ease-out ${isScrolled ? "sm:max-w-xs" : "sm:max-w-md"}`}>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-300 ease-out">
          <Search className={`h-4 w-4 transition-all duration-300 ease-out ${isFocused ? "text-blue-500 dark:text-blue-400 scale-110" : "text-gray-400 dark:text-gray-500"}`} aria-hidden="true" />
        </div>
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
        {isFocused && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10 animate-pulse" />}
      </div>
    </div>
  );
}
