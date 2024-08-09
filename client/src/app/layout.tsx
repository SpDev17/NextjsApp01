
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider, AppWrapper } from '../context/index';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App1",
  description: "Generated by create next app",
  keywords: "Saurabh"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><UserProvider>{children}</UserProvider></body>
    </html>
  );
}
