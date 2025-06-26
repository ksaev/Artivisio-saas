"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderSign } from "@/components/headerSign"
import { HeaderSignRecruteur } from "@/components/headerRecruteur"
import {
  ClerkProvider,
} from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import { frFR } from '@clerk/localizations'
import CookieConsent from "react-cookie-consent"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const GTM_ID = "GTM-MGSWXGTP" // Remplace par ton GTM ID réel

function loadGTM(id: string) {
  if (!id) return
  if (document.getElementById("gtm-script")) return // éviter doublon

  // Injecte le script GTM dans le head
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  script.id = "gtm-script"
  document.head.appendChild(script)

  // Initialise dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  // Envoie config initiale
  window.gtag('js', new Date())
  window.gtag('config', id, { 'send_page_view': true })
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [consent, setConsent] = useState<boolean | null>(null)

  const isRecruteur = pathname.startsWith("/recruteur")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/dashboard")
  const isCandidat = pathname.startsWith("/offres-user") || pathname.startsWith("/candidatures") || pathname.startsWith("/candidatures/entretiens") || pathname.startsWith("/candidatures/nouvelle")

  const showHeaderSign = isAuth || isCandidat
  const showDefaultHeader = !isRecruteur && !showHeaderSign

  useEffect(() => {
    // Dès que le consentement est donné, charge GTM et informe Consent Mode
    if (consent === true) {
      loadGTM(GTM_ID)
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted',
        })
      }
    } else if (consent === false) {
      // Refus de consentement, bloque les cookies analytics et pub
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied',
        })
      }
    }
  }, [consent])

  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#8B4513" },
        signIn: {
          baseTheme: dark,
          variables: { colorPrimary: "#8B4513" },
        },
      }}
    >
      <html lang="fr" suppressHydrationWarning>
        <head>
          {/* Pas de GTM ici pour que ce soit chargé uniquement après consentement */}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>

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

            {/* MAIN */}
            <main>{children}</main>

            {/* FOOTER */}
            {showDefaultHeader && <Footer />}

            {/* Banniere consentement cookies */}
            {consent === null && (
              <CookieConsent
                location="bottom"
                buttonText="Accepter"
                declineButtonText="Refuser"
                enableDeclineButton
                cookieName="siteCookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                declineButtonStyle={{ color: "#fff", backgroundColor: "#c44", fontSize: "13px" }}
                expires={150}
                onAccept={() => setConsent(true)}
                onDecline={() => setConsent(false)}
              >
                Ce site utilise des cookies pour améliorer votre expérience.{" "}
                <a href="/politique-de-cookies" style={{ color: "#FFD700" }}>
                  En savoir plus
                </a>
              </CookieConsent>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
