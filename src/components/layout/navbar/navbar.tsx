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
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`relative flex items-center justify-between h-14 ${contentPadding}`}
      >
        <div className="flex items-center gap-6">
          <Logo isScrolled={isScrolled} />
          <div className="hidden md:flex">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={onSearch}
              isFocused={isSearchFocused}
              setIsFocused={setIsSearchFocused}
              isScrolled={isScrolled}
            />
          </div>
        </div>
        <NavbarActions isScrolled={isScrolled} />
      </div>
    </nav>
  );
}
