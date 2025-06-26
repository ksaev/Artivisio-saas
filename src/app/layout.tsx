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
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { frFR } from "@clerk/localizations"
import CookieConsent from "react-cookie-consent"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const GTM_ID = "GTM-MGSWXGTP" // Ton vrai ID GTM

function initDefaultConsent() {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "default_consent_set" })

  // Mode par défaut : refus
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  })
}

function loadGTM(id: string) {
  if (typeof window === "undefined" || document.getElementById("gtm-script")) return

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  script.id = "gtm-script"
  document.head.appendChild(script)

  // GTM nécessite dataLayer défini avant insertion
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", id)
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [consent, setConsent] = useState<boolean | null>(null)

  const isRecruteur = pathname.startsWith("/recruteur")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/dashboard")
  const isCandidat = pathname.startsWith("/offres-user") || pathname.startsWith("/candidatures")

  const showHeaderSign = isAuth || isCandidat
  const showDefaultHeader = !isRecruteur && !showHeaderSign

  useEffect(() => {
    initDefaultConsent()

    const storedConsent = localStorage.getItem("siteCookieConsent")
    if (storedConsent === "true") {
      setConsent(true)
    } else if (storedConsent === "false") {
      setConsent(false)
    }
  }, [])

  useEffect(() => {
    if (consent === true) {
      loadGTM(GTM_ID)
      window.gtag?.("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      })
    } else if (consent === false) {
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
      })
    }
  }, [consent])

  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#8B4513" },
      }}
    >
      <html lang="fr" suppressHydrationWarning>
        <head />
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

            {/* Consentement */}
            {consent === null && (
              <CookieConsent
                location="bottom"
                buttonText="Accepter"
                declineButtonText="Refuser"
                enableDeclineButton
                cookieName="siteCookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#fff", background: "#4caf50", fontSize: "13px" }}
                declineButtonStyle={{ color: "#fff", background: "#f44336", fontSize: "13px" }}
                expires={365}
                onAccept={() => {
                  setConsent(true)
                  localStorage.setItem("siteCookieConsent", "true")
                }}
                onDecline={() => {
                  setConsent(false)
                  localStorage.setItem("siteCookieConsent", "false")
                }}
              >
                Ce site utilise des cookies pour analyser le trafic.{" "}
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
