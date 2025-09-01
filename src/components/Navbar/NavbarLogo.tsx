import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  isScrolled: boolean;
}

export default function Logo({ isScrolled }: LogoProps) {
  return (
    <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
      <Link href="/" className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full px-3 py-2 -mx-1 transition-all duration-300 ease-out hover:bg-gray-100/60 dark:hover:bg-gray-800/60 hover:scale-105 active:scale-95" aria-label="Go to homepage">
        <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300 ease-out">
          <Image src="/ReactLogo.png" alt="React Logo" width={32} height={32} className="object-contain group-hover:rotate-180 transition-transform duration-700 ease-out" priority />
        </div>
        <div className={`${isScrolled ? "hidden sm:block" : "hidden xs:block sm:block"} min-w-0 transition-all duration-500 ease-out`}>
          <h1 className="text-lg sm:text-xl font-bold font-sans bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent bg-size-200 group-hover:bg-position-100 transition-all duration-500 ease-out truncate whitespace-nowrap">
            React Dev
          </h1>
        </div>
      </Link>
    </div>
  );
}
