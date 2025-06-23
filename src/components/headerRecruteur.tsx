"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu, Moon, Sun, Bell } from "lucide-react"
import { useTheme } from "next-themes"
import { UserButton } from "@clerk/nextjs"
import { ConfirmSwitchButton } from "./confirmBox"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type NotificationBellProps = {
  count: number
}

export function HeaderSignRecruteur({ count }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

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

          {/* Right: Desktop - Notifications, Theme, User */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
             <ConfirmSwitchButton />
            </div>
          {/* Notification */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>

            {/* Theme Toggle */}
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

            {/* User */}
            <UserButton />
          </div>

          {/* Right: Mobile - Notification, Theme, User, Menu */}
          <div className="md:hidden mt-2 flex items-center space-x-4">
            {/* Notification Mobile */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>

            {/* Theme Toggle Mobile */}
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

            {/* User Mobile */}
            <UserButton />

            {/* Menu Mobile */}
            <div className="flex justify-end">
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
                    <ConfirmSwitchButton/>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
  )
}
