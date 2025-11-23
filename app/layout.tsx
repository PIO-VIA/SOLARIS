import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "./analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOLARIS",
  description: "Explore the Solar System and Beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2993050670240470"
        crossOrigin="anonymous">

     </script>
        </head >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
       <Analytics />

      </body>
    </html>
  );
}
