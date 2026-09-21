import type { Metadata } from "next";

import localFont from "next/font/local";

import { GoogleTagManager } from "@next/third-parties/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

const bwModelica = localFont({
  src: [
    { path: "../fonts/BwModelica-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/BwModelica-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/BwModelica-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/BwModelica-ExtraBoldItalic.woff2", weight: "800", style: "italic" },
    { path: "../fonts/BwModelica-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/BwModelica-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/BwModelica-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/BwModelica-RegularItalic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--bw-modelica",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.SITE_URL}`),
  title: {
    default: `${process.env.SITE_TITLE}`,
    template: `%s | ${process.env.SITE_TITLE}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${bwModelica.variable} antialiased`}>
        <Header />
        {children}
        {process.env.NEXT_PUBLIC_ENV === "production" && <GoogleTagManager gtmId="GTM-" />}
        <Footer />
      </body>
    </html>
  );
}
