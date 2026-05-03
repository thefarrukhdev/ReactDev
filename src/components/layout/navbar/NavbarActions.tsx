import React from "react";
import { Menu, Settings, User } from "lucide-react";

interface NavbarActionsProps {
  isScrolled: boolean;
}

export default function NavbarActions({ isScrolled }: NavbarActionsProps) {
  return (
    <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
      {/* Settings Button */}
      <button
        className="p-2 rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
                   hover:bg-white/10 hover:backdrop-blur-xl hover:scale-110 active:scale-95 
                   hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 
                   focus:ring-white/30 group"
        aria-label="Settings"
      >
        <Settings 
          className="h-5 w-5 text-white/80 group-hover:text-white group-hover:rotate-90 
                     transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) drop-shadow-sm" 
        />
      </button>

      {/* User Profile Button */}
      <button
        className="p-2 rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
                   hover:bg-white/10 hover:backdrop-blur-xl hover:scale-110 active:scale-95 
                   hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 
                   focus:ring-white/30 group relative overflow-hidden"
        aria-label="User profile"
      >
        <div className="relative">
          <User 
            className="h-5 w-5 text-white/80 group-hover:text-white 
                       transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) drop-shadow-sm" 
          />
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 
                          rounded-full opacity-0 group-hover:opacity-100 blur-sm 
                          transition-opacity duration-500 -z-10" />
        </div>
      </button>

      {/* Mobile Menu Button - only show on smaller screens */}
      <button
        className={`p-2 rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) 
                   hover:bg-white/10 hover:backdrop-blur-xl hover:scale-110 active:scale-95 
                   hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 
                   focus:ring-white/30 group md:hidden
                   ${isScrolled ? "block" : "hidden sm:block"}`}
        aria-label="Menu"
      >
        <Menu 
          className="h-5 w-5 text-white/80 group-hover:text-white 
                     transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) drop-shadow-sm
                     group-hover:rotate-90" 
        />
      </button>
    </div>
  );
}