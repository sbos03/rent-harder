import type { Metadata } from "next";
import HoogwerkerverhuurClient from "./HoogwerkerverhuurClient";

export const metadata: Metadata = {
  title: "Hoogwerkerverhuur — Digitaal sterker verhuren",
  description:
    "Rent Harder helpt hoogwerkerverhuurders digitaal de logischste keuze te worden in hun regio. Van lokale vindbaarheid tot een eigen verhuurpositie.",
  keywords: [
    "hoogwerker verhuur",
    "hoogwerkerverhuur",
    "hoogwerkers verhuren",
    "digitale verhuur",
    "lokale vindbaarheid",
    "verhuurplatform hoogwerkers",
  ],
  openGraph: {
    title: "Hoogwerkerverhuur — RENT HARDER",
    description:
      "Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.",
  },
};

export default function HoogwerkerverhuurPage() {
  return <HoogwerkerverhuurClient />;
}
