{/* YumeMotion early access public deployment metadata */}
import { Analytics } from "@vercel/analytics/next";
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
  title: "YumeMotion - AI Anime Image & Video Creation Platform",
  description:
    "YumeMotion is an early-access AI anime creation platform for anime images, cinematic video concepts, prompt enhancement, thumbnails, and creator tools.",
  keywords: [
    "YumeMotion",
    "AI anime generator",
    "anime image generator",
    "anime video generator",
    "AI video creation",
    "anime creator tools",
    "prompt enhancer",
    "AI thumbnails",
  ],
  authors: [{ name: "YumeMotion" }],
  creator: "YumeMotion",
  publisher: "YumeMotion",
  openGraph: {
    title: "YumeMotion - AI Anime Image & Video Creation Platform",
    description:
      "Join YumeMotion early access and preview AI anime image, video, prompt, and creator tools.",
    siteName: "YumeMotion",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "YumeMotion Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YumeMotion - AI Anime Image & Video Creation Platform",
    description:
      "Early-access AI anime creation platform for anime images, video concepts, prompts, thumbnails, and creator workflows.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}