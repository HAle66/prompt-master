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
  title: "AI Prompt Hub - 100+ Ready-to-Use AI Prompts",
  description: "Supercharge your AI workflow with 100+ curated prompts for ChatGPT, Claude, and more. Copy-paste prompts for writing, marketing, coding, and business.",
  keywords: ["AI prompts", "ChatGPT prompts", "Claude prompts", "AI tools", "prompt engineering"],
  authors: [{ name: "AI Prompt Hub" }],
  openGraph: {
    title: "AI Prompt Hub - 100+ Ready-to-Use AI Prompts",
    description: "Supercharge your AI workflow with curated AI prompts",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
