import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/sections/Header";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SecureCounsel",
  description: "Your time matters. Let us help you get it back.",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "SecureCounsel",
    description: "Your time matters. Let us help you get it back.",
    url: process.env.WEBSITE_URL, // Replace with your actual URL
    images: [
      {
        url: `${process.env.WEBSITE_URL}/images/og-image.jpg`, // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "SecureCounsel - Your time matters.",
      },
    ],
    siteName: "SecureCounsel",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
