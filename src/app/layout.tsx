import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Porecle Dacice - Descoperă-ți numele",
  description: "Află care este numele tău de dac liber inspirat din istorie și mitologie.",
  openGraph: {
    title: "Porecle Dacice - Descoperă-ți numele",
    description: "Află care este numele tău de dac liber inspirat din istorie și mitologie.",
    url: "https://nickname-dacic.vercel.app/",
    siteName: "Porecle Dacice",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porecle Dacice - Descoperă-ți numele",
    description: "Află care este numele tău de dac liber inspirat din istorie și mitologie.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
