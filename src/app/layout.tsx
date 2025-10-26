import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientAuthProvider } from "@/hooks/useClientAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocAfrik - L'IA au service de vos documents professionnels en Afrique",
  description: "Générez automatiquement CV, lettres, factures et documents administratifs en quelques clics. Simple, rapide et professionnel.",
  keywords: ["DocAfrik", "IA", "documents", "Afrique", "CV", "lettres", "factures", "Mali"],
  authors: [{ name: "DocAfrik Team" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "DocAfrik - Documents professionnels par IA",
    description: "Générez automatiquement CV, lettres, factures et documents administratifs en quelques clics",
    url: "https://docafrik.netlify.app",
    siteName: "DocAfrik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocAfrik - Documents professionnels par IA",
    description: "Générez automatiquement CV, lettres, factures et documents administratifs en quelques clics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ClientAuthProvider>
          {children}
          <Toaster />
        </ClientAuthProvider>
      </body>
    </html>
  );
}
