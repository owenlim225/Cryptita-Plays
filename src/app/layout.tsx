import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GlobalMascotOverlay } from "@/components/global-mascot-overlay";
import { PageLoadSplash } from "@/components/page-load-splash";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SmoothCursorFollower } from "@/components/smooth-cursor-follower";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptita Plays | Bridging Web3 Education and Social Impact",
  description:
    "Cryptita Plays is a community-driven social impact initiative in the Philippines that bridges Web3 education and social development for youth and underserved communities.",
  authors: [
    {
      name: "Sherwin P. Limosnero",
      url: "https://www.linkedin.com/in/sherwinlimosnero/",
    },
  ],
  icons: {
    icon: "/brand/icon-mark.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-slate-900">
        <SmoothScrollProvider>
          <GlobalMascotOverlay />
          <SmoothCursorFollower />
          {children}
          <PageLoadSplash />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
