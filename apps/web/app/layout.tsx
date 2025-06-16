import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ClientWrapper } from "../components/ClientWrapper/ClientWrapper";
import { ThemeProvider } from "@mui/material";
import ThemeRegistry from "../components/Theme/ThemeRegistry";

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
  const metadata: Metadata = {
    title: "Emitix",
    description: "Emitix",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AuthProvider>
            <ThemeRegistry>
              <ClientWrapper children={children} />
            </ThemeRegistry>
          </AuthProvider>
      </body>
    </html>
  );
}
