"use client";

import React, { useState, useEffect, useMemo } from "react";
import Logo from "./NavbarLogo";
import SearchInput from "./NavbarSearch";
import NavbarActions from "./NavbarActions";

interface NavbarProps {
  onSearch: (query: string, enterPressed?: boolean) => void;
  className?: string;
}

export default function Navbar({ onSearch, className = "" }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = useMemo(() => {
    return `
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      transition-all duration-500 ease-out
      ${isScrolled
        ? "w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/3 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30"
        : "w-full rounded-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
      }
    `.replace(/\s+/g, " ").trim();
  }, [isScrolled]);

  const contentPadding = isScrolled ? "px-6 sm:px-8" : "px-4 sm:px-6 lg:px-8";

  return (
    <nav className={`${navbarClasses} ${className}`} role="navigation" aria-label="Main navigation">
      <div className={`flex items-center justify-between h-16 transition-all duration-500 ease-out ${contentPadding}`}>
        <Logo isScrolled={isScrolled} />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={onSearch}
          isFocused={isSearchFocused}
          setIsFocused={setIsSearchFocused}
          isScrolled={isScrolled}
        />
        <NavbarActions />
      </div>

      {/* Gradient chiziq ostida */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent
        transition-all duration-500 ease-out
        ${isScrolled ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
      />
    </nav>
  );
}
