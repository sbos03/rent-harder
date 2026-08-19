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

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${archivo.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
