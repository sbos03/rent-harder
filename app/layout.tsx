import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "RENT HARDER — De digitale sidekick achter jouw verhuur",
    template: "%s | RENT HARDER",
  },
  description:
    "RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Voor ambitieuze verhuurders van machines, materieel en objecten.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
