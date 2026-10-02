import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/miami-bayside-marketplace.jpg" 
          alt="Background" 
          fill 
          className="object-cover opacity-40 pointer-events-none" 
          priority 
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial gradient mask */}
      <div className="absolute left-0 right-0 top-0 z-0 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <main className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-md shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now available for Next.js 15
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
          Build your component library <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">with precision.</span>
        </h1>

        <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-medium drop-shadow-sm">
          A curated collection of beautiful, reusable, and production-ready components. Built with Tailwind CSS and Framer Motion.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/components"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Browse Components <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="https://github.com/thefarrukhdev/ReactDev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
