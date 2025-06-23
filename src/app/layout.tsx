"use client"

import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderSign } from "@/components/headerSign"
import { HeaderSignRecruteur } from "@/components/headerRecruteur"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import { frFR } from '@clerk/localizations'
import Head from "next/head"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  // Détection de routes
  const isRecruteur = pathname.startsWith("/recruteur")
  const isSign = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/dashboard")
  const isCandidat = pathname.startsWith("/candidatures") || pathname.startsWith("/offres") || pathname.startsWith("/candidatures/entretiens") || pathname.startsWith("/candidatures/nouvelle")

  const showHeaderSign = isSign || isAuth || isCandidat
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
        <Head>
          <title>ArtiVisio – Coaching d'élite pour carrière d'exception</title>
          <meta name="description" content="Sculptez votre carrière d’exception avec ArtiVisio. Coaching premium, opportunités exclusives et accompagnement personnalisé pour les professionnels d’élite en Afrique de l’Ouest." />
          <meta name="keywords" content="Coaching professionnel, Executive coaching, Opportunités d'emploi, Carrière Afrique, Coaching emploi, ArtiVisio, Carrière de dirigeant, Leadership Afrique, Emploi cadre Afrique de l'Ouest" />
          <meta name="author" content="ArtiVisio" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <meta property="og:title" content="ArtiVisio – Coaching de carrière pour professionnels d’élite" />
          <meta property="og:description" content="Coaching premium, opportunités exclusives, accompagnement de leaders en Afrique de l’Ouest. 98% de réussite." />
          <meta property="og:image" content="/images/og-artivisio.jpg" />
          <meta property="og:type" content="website" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ArtiVisio",
              "url": "https://artivisio.com",
              "logo": "https://artivisio.com/images/logo.png",
              "description": "Coaching professionnel premium et accompagnement de carrière pour cadres et dirigeants en Afrique de l'Ouest.",
              "sameAs": [
                "https://www.linkedin.com/company/artivisio",
                "https://www.facebook.com/artivisio"
              ]
            }
            `
          }} />
        </Head>

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

            {isSign && (
              <footer>
                <Footer />
              </footer>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
