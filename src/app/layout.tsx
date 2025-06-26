"use client"

import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderSign } from "@/components/headerSign"
import CookieConsent from "@/components/CookieConsent"
import { HeaderSignRecruteur } from "@/components/headerRecruteur"
import {
  ClerkProvider,
} from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import { frFR } from '@clerk/localizations'
import type { Metadata } from "next"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  // Détection de routes
  const isRecruteur = pathname.startsWith("/recruteur")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/dashboard") 
  const isCandidat = pathname.startsWith("/offres-user") ||pathname.startsWith("/candidatures") || pathname.startsWith("/candidatures/entretiens") || pathname.startsWith("/candidatures/nouvelle") 

  const showHeaderSign = isAuth || isCandidat
  const showDefaultHeader = !isRecruteur && !showHeaderSign

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
          {/* Place ici uniquement le script GTM base (sans config gtag) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MGSWXGTP');
              `,
            }}
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* GTM noscript */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MGSWXGTP"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

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
            <CookieConsent />

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
