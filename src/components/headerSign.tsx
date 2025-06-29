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

type Notification = {
  id: string
  label: string
  link: string
}

type HeaderSignProps = {
  count: number
}

export function HeaderSign({ count }: HeaderSignProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationSent, setNotificationSent] = useState(false) // éviter envoi multiple
  const { theme, setTheme } = useTheme()
  const notificationRef = useRef<HTMLDivElement>(null)

  const { user } = useUser()

  const sendNotification = async () => {
    if (!user) return
    try {
      const res = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: "Bonjour 👋",
          message: "Tu as reçu une nouvelle offre personnalisée !",
        }),
      })
      if (!res.ok) throw new Error("Erreur lors de l'envoi de la notification")
      const data = await res.json()
      alert("Notification envoyée automatiquement 🚀")
    } catch (error) {
      console.error("Erreur notification :", error)
    }
  }

  // Envoi automatique une fois après connexion
  useEffect(() => {
    if (user && !notificationSent) {
      sendNotification()
      setNotificationSent(true)
    }
  }, [user, notificationSent])

  const notifications: Notification[] = Array.from({ length: count }).map((_, index) => ({
    id: `${index + 1}`,
    label: `Notification ${index + 1}`,
    link: `/notifications/${index + 1}`,
  }))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* 🔔 Notification panel (superposé au-dessus de tout) */}
      {showNotifications && (
        <div
          ref={notificationRef}
          className="fixed top-2 right-4 z-[9999] w-80 max-h-96 overflow-y-auto rounded-xl border bg-white dark:bg-zinc-900 shadow-2xl p-4 animate-slide-down"
        >
          <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
            Notifications
          </h4>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <Link
                key={notif.id}
                href={notif.link}
                className="flex items-start gap-2 px-3 py-2 mb-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <span className="text-pink-500 mt-1">📣</span>
                <span className="text-sm text-zinc-900 dark:text-white">{notif.label}</span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucune notification</p>
          )}
        </div>
      )}

      {/* 🌐 Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
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
              <span className="text-lg font-bold text-foreground">ArtiVisio</span>
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-5">
            <ConfirmSwitchButton />

            {/* 🔔 Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>

            {/* ☀️/🌙 Toggle thème */}
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

          {/* Mobile actions */}
          <div className="md:hidden mt-2 flex items-center space-x-4">
            {/* Notifications mobile */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>

            {/* Toggle thème mobile */}
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

            {/* Profil utilisateur */}
            <UserButton />

            {/* Menu mobile */}
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
                  <Link href="/candidatures">
                    <button>Mes candidatures</button>
                  </Link>
                  <Link href="/offres">
                    <button>Mes offres d'emploi</button>
                  </Link>
                  <Link href="/candidatures/entretiens">
                    <button>Mes entretiens</button>
                  </Link>
                  <ConfirmSwitchButton />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  )
}
