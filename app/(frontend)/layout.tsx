import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "../globals.scss";

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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

// The public site owns its own document shell. (The Payload admin group renders
// its own <html>/<body> via Payload's RootLayout, so the root app/layout.tsx
// only passes children through to avoid nested <html>.)
export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${archivo.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
