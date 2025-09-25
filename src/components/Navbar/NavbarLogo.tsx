import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  isScrolled: boolean;
}

export default function Logo({ isScrolled }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
      <Link
        href="/"
        className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full px-3 py-2 -mx-1 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:bg-white/10 hover:backdrop-blur-xl hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10"
        aria-label="Go to homepage"
      >
        <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm group-hover:from-white/30 group-hover:to-white/10 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:shadow-lg group-hover:shadow-white/20">
          {/* Glow overlay on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Logo container */}
          <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 ease-out overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageError ? (
                <Image
                  src="/ReactLogo.png"
                  alt="React Logo"
                  width={32}
                  height={32}
                  className="object-contain group-hover:rotate-180 transition-transform duration-700 ease-out rounded-full"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-5 h-5 bg-white rounded-full opacity-90" />
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            isScrolled ? "hidden sm:block" : "hidden xs:block sm:block"
          } min-w-0 transition-all duration-500 ease-out`}
        >
          <h1 className="text-lg sm:text-xl font-bold font-sans bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent bg-size-200 group-hover:bg-position-100 transition-all duration-500 ease-out truncate whitespace-nowrap drop-shadow-sm">
            React Dev
          </h1>
        </div>
      </Link>
    </div>
  );
}
