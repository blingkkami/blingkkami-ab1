import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blingkkami-ab1-6hei.vercel.app"),
  title: "Blingkkami | Freelance AI Landing Page Designer",
  description: "AI-based landing page design portfolio and commission site.",
  openGraph: {
    title: "Blingkkami | Freelance AI Landing Page Designer",
    description: "AI-based landing page design portfolio and commission site.",
    url: "https://blingkkami-ab1-6hei.vercel.app",
    siteName: "Blingkkami",
    images: [
      {
        url: "/logo_b.png",
        width: 916,
        height: 349,
        alt: "Blingkkami Service Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blingkkami | Freelance AI Landing Page Designer",
    description: "AI-based landing page design portfolio and commission site.",
    images: ["/logo_b.png"],
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
