"use client";
import React, { useState, useEffect, useMemo } from "react";
import Logo from "./NavbarLogo";
import SearchInput from "./NavbarSearch";
import NavbarActions from "./NavbarActions";
import { getNavbarClasses, getGlassStyles } from "./NavbarUtils";

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
