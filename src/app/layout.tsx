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
import { Inter } from "next/font/google"
import type { Metadata } from "next"



const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "PEGGY DERRICK SARL - Construction & Services",
  description:
    "Entreprise basée à Abidjan spécialisée dans la construction, l'entretien, la rénovation et les services industriels. Expertise, qualité et passion au service de vos projets.",
  keywords: [
    "construction Côte d'Ivoire",
    "entretien bâtiment",
    "rénovation Abidjan",
    "services industriels",
    "entreprise de bâtiment",
    "PEGGY DERRICK SARL"
  ],
  openGraph: {
    title: "PEGGY DERRICK SARL",
    description: "Expert en construction, entretien, rénovation à Abidjan",
    url: "http://localhost:3000/",
    siteName: "PEGGY DERRICK",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image de présentation de PEGGY DERRICK SARL"
      }
    ],
  },
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: [{ url: "/favicon.png", sizes: "any", type: "image/x-icon" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}


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
        <title>Artivsio</title>
        <head>
          <CookieConsent/>
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

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
