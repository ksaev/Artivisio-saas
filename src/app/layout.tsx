import { GoogleTagManager } from "@next/third-parties/google"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { frFR } from "@clerk/localizations"
import { Header } from "@/components/header"
import { HeaderSign } from "@/components/headerSign"
import { HeaderSignRecruteur } from "@/components/headerRecruteur"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CookieConsent from "@/components/CookieConsent"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const tagManager = process.env.NEXT_PUBLIC_GTM_ID!


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#8B4513" },
      }}
    >
      <html lang="fr">
        {/* Intégration officielle GTM */}
        <GoogleTagManager gtmId={tagManager} />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
