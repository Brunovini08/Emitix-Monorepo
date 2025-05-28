"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../context/AuthContext";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();

  const metadata: Metadata = {
    title: "Emitix",
    description: "Emitix",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {router !== "/login" && router !== "/register" ? <Navbar /> : null}
          {children}
          {router !== "/login" && router !== "/register" ? <Footer /> : null}
        </AuthProvider>
      </body>
    </html>
  );
}
