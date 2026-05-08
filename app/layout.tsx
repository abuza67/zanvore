import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zanvore — One Life. Thousand Dreams.",
  description:
    "Zanvore est un réseau exclusif pour ceux qui vivent au-delà de l'ordinaire.",
  openGraph: {
    title: "Zanvore — One Life. Thousand Dreams.",
    description:
      "Zanvore est un réseau exclusif pour ceux qui vivent au-delà de l'ordinaire.",
    siteName: "Zanvore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <head>
        {/* Satoshi via Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
