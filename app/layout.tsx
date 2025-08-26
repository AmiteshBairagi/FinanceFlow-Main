import React from 'react'
import ThemeProvider from "@/contexts/ThemeContext/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css"
import MainLayout from '@/layouts/MainLayout';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinanceFlow - Personal Finance Manager",
  description: "Beautiful personal finance management application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="rainbow"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "rainbow"]}
        >
          <MainLayout>{children}</MainLayout>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
