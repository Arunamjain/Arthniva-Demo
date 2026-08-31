import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EntrepreneurProvider } from "@/lib/context/EntrepreneurContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arthniva — AI Business Advisory for Rural Entrepreneurs",
  description:
    "Arthniva turns basic business information into simple financial insights, personalized guidance and actionable growth planning for rural entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-gray-50 font-sans`}>
        <EntrepreneurProvider>{children}</EntrepreneurProvider>
      </body>
    </html>
  );
}
