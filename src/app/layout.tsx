"use client"

import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderSign } from "@/components/headerSign"
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { frFR } from '@clerk/localizations'
import { candidatures } from "@/lib/data-store"


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  // 👉 Exclure certaines routes (auth, dashboard, etc.)
  const shouldHideLayout = pathname.startsWith("/auth") || pathname.startsWith("/dashboard") || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") 
  || pathname.startsWith("/candidatures") || pathname.startsWith("/recruteur") || pathname.startsWith("/offres") 
  || pathname.startsWith("/candidatures/entretiens")|| pathname.startsWith("/candidatures/nouvelle") || pathname.startsWith("/recruteur") || pathname.startsWith("/candidatures")
  const shouldHideLayoutSign=pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")

  return (
    <ClerkProvider 
      localization={frFR}  
      appearance={{
          baseTheme: [dark, dark],
          variables: { colorPrimary: "#8B4513" },
          signIn: {
            baseTheme: [dark, dark],
            variables: { colorPrimary: "#8B4513"},
          },
        }}
    
    >
      <html lang="fr" suppressHydrationWarning>
        <title>Artivsio</title>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>

            {shouldHideLayout && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <HeaderSign />
              </header>)}


            {!shouldHideLayout && (
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Header />
              </header>
            )}

            <main>{children}</main>

            {!shouldHideLayout && <Footer />}


        <footer>
           {shouldHideLayoutSign && (
              <footer>
                <Footer/>
              </footer>
            )}
        </footer>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
