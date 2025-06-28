"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { Menu, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import AnnouncementBar from "./AnnouncementBar"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Coaching", href: "/coaching" },
    { name: "Offres d'emploi", href: "/offres" },
    { name: "Contact", href: "/contact" },
  ]

  return (
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-15 w-15 overflow-hidden rounded-lg">
              <Image
                src="/logo_artivisio.png"
                alt="Logo ArtiVisio"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-foreground">ArtiVisio</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Changer de thème</span>
            </Button>

            <Button asChild variant="ghost">
              <Link href="/sign-in">
                <User className="h-4 w-4 mr-2" />
                Connexion
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">S'inscrire</Link>
            </Button>
        </div>

          {/* Menu Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
                <SheetHeader>
                  <SheetTitle><span className="sr-only">Ouvrir le menu</span></SheetTitle>
                </SheetHeader>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full justify-start"
                  >
                    <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    Changer de thème
                  </Button>

                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      S'inscrire
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
      </div>
      
    </div>
    
  )
}
