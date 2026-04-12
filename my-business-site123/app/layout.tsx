import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blingkkami-ab1-6hei.vercel.app"),
  title: "블링까미 | 프리랜서 AI 상세페이지 디자이너",
  description: "AI 기반 상세페이지 디자인 포트폴리오 및 의뢰 사이트입니다.",
  openGraph: {
    title: "블링까미 | 프리랜서 AI 상세페이지 디자이너",
    description: "AI 기반 상세페이지 디자인 포트폴리오 및 의뢰 사이트입니다.",
    url: "https://blingkkami-ab1-6hei.vercel.app",
    siteName: "블링까미",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "블링까미 서비스 미리보기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "블링까미 | 프리랜서 AI 상세페이지 디자이너",
    description: "AI 기반 상세페이지 디자인 포트폴리오 및 의뢰 사이트입니다.",
    images: ["/og-image.png"],
  },
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
      <body 
        className={`${inter.variable} min-h-screen flex flex-col font-sans bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
