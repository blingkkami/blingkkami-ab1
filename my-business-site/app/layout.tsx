import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "블링까미 | 프리랜서 AI 상세페이지 디자이너",
  description: "AI 기반 상세페이지 디자인 포트폴리오 및 의뢰 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
