"use client"

import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderSign } from "@/components/headerSign"
import { HeaderSignRecruteur } from "@/components/headerRecruteur"
import CookieConsent from "@/components/CookieConsent"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { frFR } from "@clerk/localizations"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  const isRecruteur = pathname.startsWith("/recruteur")
  const isAuth =
    pathname.startsWith("/auth") || pathname.startsWith("/dashboard")
  const isCandidat =
    pathname.startsWith("/offres-user") ||
    pathname.startsWith("/candidatures") ||
    pathname.startsWith("/candidatures/entretiens") ||
    pathname.startsWith("/candidatures/nouvelle")

  const showHeaderSign = isAuth || isCandidat
  const showDefaultHeader = !isRecruteur && !showHeaderSign

  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#8B4513" },
      }}
    >
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* HEADER */}
            {isRecruteur && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <HeaderSignRecruteur count={100} />
              </header>
            )}

            {showHeaderSign && !isRecruteur && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <HeaderSign count={150} />
              </header>
            )}

            {showDefaultHeader && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Header />
              </header>
            )}

            {/* CONTENU PRINCIPAL */}
            <main>{children}</main>

            {/* PIED DE PAGE */}
            {showDefaultHeader && <Footer />}

            {/* BANNIÈRE DE COOKIES & CHARGEMENT SCRIPT GA */}
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
