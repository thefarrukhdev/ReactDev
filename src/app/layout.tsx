import Image from "next/image";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Component Library",
  description: "Custom component library with Next.js",
  icons: {
    icon: "/ReactLogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground font-sans overflow-hidden`}
      >
        <div className="fixed inset-0 z-[-1]">
          <Image 
            src="/miami-bayside-marketplace.jpg" 
            alt="Background" 
            fill 
            className="object-cover opacity-40 pointer-events-none" 
            priority 
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        <div className="flex flex-col h-full w-full relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
