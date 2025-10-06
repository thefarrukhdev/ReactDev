"use client";
import React, { useState, useEffect, useMemo } from "react";
import Logo from "./NavbarLogo";
import SearchInput from "./NavbarSearch";
import NavbarActions from "./NavbarActions";
import { getNavbarClasses, getGlassStyles } from "@/components/NavbarUtils";

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
      fixed top-0 left-1/2 transform -translate-x-1/2 z-50
      transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
      ${isScrolled
        ? "w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/3 rounded-2xl scale-98 opacity-95"
        : "w-full rounded-none scale-100 opacity-100"
      }
    `.replace(/\s+/g, " ").trim();
  }, [isScrolled]);

  const glassStyles = useMemo(() => {
    return `
      backdrop-blur-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10
      border border-white/20 shadow-2xl shadow-black/10
      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
      before:from-white/20 before:via-transparent before:to-purple-500/10 
      before:opacity-50 before:pointer-events-none
      after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl
      after:from-blue-500/5 after:via-transparent after:to-white/5
      after:pointer-events-none
      ${isScrolled ? "before:opacity-70 after:opacity-60" : "before:opacity-40 after:opacity-30"}
    `.replace(/\s+/g, " ").trim();
  }, [isScrolled]);

  const navbarClasses = useMemo(() => getNavbarClasses(isScrolled), [isScrolled]);
  const glassStyles = useMemo(() => getGlassStyles(isScrolled), [isScrolled]);
  const contentPadding = isScrolled ? "px-6 sm:px-8" : "px-4 sm:px-6 lg:px-8";

  return (
    <nav
      className={`${navbarClasses} ${glassStyles} ${className} relative overflow-hidden`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(255,255,255,0.05) 25%,
            rgba(168,85,247,0.05) 50%,
            rgba(59,130,246,0.05) 75%,
            rgba(255,255,255,0.1) 100%
          )
        `,
        // animation: "liquid-gradient 8s ease-in-out infinite",
      }}
    >
      {/* Animated liquid gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(59,130,246,0.1) 0%, 
              rgba(168,85,247,0.1) 25%,
              rgba(236,72,153,0.1) 50%,
              rgba(168,85,247,0.1) 75%,
              rgba(59,130,246,0.1) 100%
            )
          `,
          animation: "liquid-flow 12s ease-in-out infinite",
        }}
      />

      <div
        className={`relative flex items-center justify-between h-16 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${contentPadding}`}
      >
        <Logo isScrolled={isScrolled} />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={onSearch}
          isFocused={isSearchFocused}
          setIsFocused={setIsSearchFocused}
          isScrolled={isScrolled}
        />
        <NavbarActions isScrolled={isScrolled} />
      </div>

      {/* Subtle bottom glow effect */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent
        transition-all duration-700 ease-out
        ${isScrolled ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
      />
    </nav>
  );
}
