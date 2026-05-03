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
    icon: "/ReactLogo.png", // ✅ To‘g‘ri format
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-neutral-900 h-full overflow-hidden`}
      >
        {/* Root container */}
        <div className="flex flex-col h-full w-full">
          {/* Children (Layouts & Pages) */}
          {children}
        </div>
      </body>
    </html>
  );
}
