import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sri Sowdambika Polytechnic College | SSPC",
    template: "%s | Sri Sowdambika Polytechnic College",
  },
  description:
    "Sri Sowdambika Polytechnic College (SSPC) — AICTE approved polytechnic in Virudhunagar, Tamil Nadu. Offering diploma programmes in Civil, EEE, ECE, IT, Mechanical, Textile and more.",
  keywords: ["SSPC", "Sowdambika Polytechnic", "Virudhunagar", "Polytechnic College", "AICTE", "Diploma"],
  openGraph: {
    title: "Sri Sowdambika Polytechnic College",
    description: "AICTE approved polytechnic college in Virudhunagar, Tamil Nadu",
    url: "https://www.sowdambikapolytechnic.com",
    siteName: "SSPC",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
