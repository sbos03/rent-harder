import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.scss";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RENT HARDER — De digitale sidekick achter jouw verhuur",
    template: "%s | RENT HARDER",
  },
  description:
    "RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Voor ambitieuze verhuurders van machines, materieel en objecten.",
  keywords: [
    "verhuur",
    "verhuurbedrijf",
    "digitale verhuurtak",
    "verhuurplatform",
    "machines verhuren",
    "materieel verhuur",
    "hoogwerker verhuur",
    "rent harder",
  ],
  openGraph: {
    title: "RENT HARDER — Build. Rent. Grow.",
    description:
      "De digitale sidekick achter jouw verhuur. Beter zichtbaar, slimmer geregeld, sterker groeien.",
    locale: "nl_NL",
    type: "website",
    siteName: "RENT HARDER",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
