import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // turbo
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Website Client Machine | Automate Your Web Design Sales",
  description: "The AI-powered system that finds businesses without websites, builds a demo, and hands you the lead ready to close.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased selection:bg-indigo-500 selection:text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
