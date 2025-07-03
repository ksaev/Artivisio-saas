"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Bell, Menu, Moon, Sun } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import { ConfirmSwitchButton } from "./confirmBox"

declare global {
  interface Window {
    OneSignal: any
  }
}

type Notification = {
  id: string
  label: string
  link: string
}



export function HeaderPass() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>

      {/* 🌐 Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-15 w-15 overflow-hidden rounded-lg">
                <Image src="/logo_artivisio.png" alt="Logo ArtiVisio" width={50} height={50} />
              </div>
              <span className="text-lg font-bold text-foreground">ArtiVisio</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-5">
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
            <UserButton />
          </div>

          {/* Mobile */}
          <div className="md:hidden mt-2 flex items-center space-x-4">
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
            <UserButton />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/candidatures"><button>Mes candidatures</button></Link>
                  <Link href="/offres"><button>Mes offres d'emploi</button></Link>
                  <Link href="/candidatures/entretiens"><button>Mes entretiens</button></Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  )
}
