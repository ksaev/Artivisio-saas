"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderSign } from "@/components/headerSign";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import AnnouncementBar from "@/components/AnnouncementBar";
import { HeaderPass } from "@/components/headerPass";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { candidatures } from "@/lib/data-store";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  //  Faire en sorte qu'il n'y ait pas de layout sur certaines pages
  const noLayoutRoutes = [
    "/onboarding-in",
    "/onboarding-up",
    "/register/candidat",
    "/register/recruteur",
  ]; // <= ta page ciblée
  const isLayoutHidden = noLayoutRoutes.includes(pathname);

  //  Exclure certaines routes (auth, dashboard, etc.)
  const shouldHideLayout =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/add-offres") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/candidatures") ||
    pathname.startsWith("/recruteur");

  const shouldHideLayoutSign =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/onboarding");

  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: [dark, dark],
        variables: { colorPrimary: "#8B4513" },
        signIn: {
          baseTheme: [dark, dark],
          variables: { colorPrimary: "#8B4513" },
        },
      }}
    >
      <html lang="fr" suppressHydrationWarning>
        <title>Artivsio</title>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* ❌ Si la page fait partie de celles sans layout */}
            {isLayoutHidden ? (
              <main>{children}</main>
            ) : (
              <>
                {/* ✅ Header conditionnel */}
                {shouldHideLayout ? (
                  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <HeaderSign count={100} />
                  </header>
                ) : (
                  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Header />
                    <AnnouncementBar />
                  </header>
                )}

                <main>{children}</main>

                {/* ✅ Footer que si layout visible */}
                {!shouldHideLayout && <Footer />}
              </>
            )}

            <Analytics />
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
