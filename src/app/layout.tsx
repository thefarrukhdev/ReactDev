import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-y-auto max-w-full">
              <div className="p-6 max-w-full">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
