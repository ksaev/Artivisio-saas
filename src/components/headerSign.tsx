"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle, // ✅ Ajouté
} from "@/components/ui/sheet"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  UserButton,
} from "@clerk/nextjs"
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors"

export function HeaderSign() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="" className="flex items-center space-x-2 group">
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

            <UserButton showName />
          </div>

          {/* Menu Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle> {/* ✅ Ajouté */}

              <div className="flex flex-col space-y-4 mt-8">
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
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox: "bg-blue-600",
                  userName: "text-white",
                },
              }}
            />

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
