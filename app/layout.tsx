import type { Metadata } from "next";
import { Playfair_Display, Lora, Jost } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — Dinner for Me",
    default: "Dinner for Me",
  },
  description:
    "Cooking for one, accidental feasts, and the occasional unhinged culinary spirals.",
  openGraph: {
    siteName: "Dinner for Me",
    type: "website",
    images: [
      {
        url: "https://dinnerforme.com/img/dinner-for-me-hero.png",
        alt: "Dinner for Me",
      },
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-3655019220755858",
    "p:domain_verify": "1eff17b845ef929d33fd825866063c63",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${jost.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3655019220755858"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
