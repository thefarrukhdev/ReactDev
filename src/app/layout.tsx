import Image from "next/image";
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Component Library | ReactDev",
  description: "Custom component library with Next.js",
  keywords: ["Next.js", "React", "Component Library", "PWA", "ReactDev"],
  authors: [{ name: "ReactDev" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/ReactLogo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Component Library | ReactDev",
    description: "Custom component library with Next.js",
    url: "https://reactdev.example.com",
    siteName: "ReactDev",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Component Library | ReactDev",
    description: "Custom component library with Next.js",
    images: ["/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Component Library",
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
