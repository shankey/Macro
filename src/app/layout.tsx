import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Tracker: 100 years of gold, explained",
  description:
    "Gold price since 1925 with the reasons behind every rise and fall, compared against 25 major world currencies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
