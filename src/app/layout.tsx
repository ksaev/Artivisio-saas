"use client"

import { GoogleTagManager } from "@next/third-parties/google"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { frFR } from "@clerk/localizations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CookieConsent from "@/components/CookieConsent"
import AnnouncementBar from "@/components/AnnouncementBar"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#8B4513" },
      }}
    >
      <html lang="fr">
        {/* Google Tag Manager */}
        <GoogleTagManager gtmId="GTM-MGSWXGTP" />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <AnnouncementBar />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
