"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ConfirmSwitchButton } from "./confirmBox";

declare global {
  interface Window {
    OneSignal: any;
  }
}

type Notification = {
  id: string;
  label: string;
  link: string;
};

type HeaderSignProps = {
  count: number;
};

export function HeaderSign({ count }: HeaderSignProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  // 🔔 Envoi push
  const sendNotification = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: "Bonjour 👋",
          message: "Tu as reçu une nouvelle offre personnalisée !",
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi de la notification");
      const data = await res.json();
      alert("Notification envoyée automatiquement 🚀");
    } catch (error) {
      console.error("Erreur notification :", error);
    }
  };

  // 🔌 Init OneSignal & liaison userId
  useEffect(() => {
    if (!user || typeof window === "undefined") return;

    window.OneSignal = window.OneSignal || [];

    window.OneSignal.push(async function () {
      await window.OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        notifyButton: { enable: true },
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
        allowLocalhostAsSecureOrigin: true,
      });

      const isSupported = await window.OneSignal.isPushNotificationsSupported();
      if (!isSupported) {
        console.log("🔕 Notifications non supportées");
        return;
      }

      const isEnabled = await window.OneSignal.isPushNotificationsEnabled();
      if (!isEnabled) {
        console.log("🔔 Demande permission notification");
        await window.OneSignal.registerForPushNotifications();
      }

      // 🔗 Liaison avec Clerk
      if (user.id) {
        console.log("🔐 Liaison user ID → OneSignal:", user.id);
        await window.OneSignal.setExternalUserId(user.id);
        const playerId = await window.OneSignal.getUserId();
        console.log("🆔 playerId:", playerId);
      }
    });
  }, [user]);

  // Envoi automatique après liaison
  useEffect(() => {
    if (user && !notificationSent) {
      sendNotification();
      setNotificationSent(true);
    }
  }, [user, notificationSent]);

  const notifications: Notification[] = Array.from({ length: count }).map(
    (_, i) => ({
      id: `${i + 1}`,
      label: `Notification ${i + 1}`,
      link: `/notifications/${i + 1}`,
    })
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
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
                <span className="text-sm text-zinc-900 dark:text-white">
                  {notif.label}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Aucune notification
            </p>
          )}
        </div>
      )}

      {/* 🌐 Header principal */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-15 w-15 overflow-hidden rounded-lg">
                <Image
                  src="/logo_artivisio.png"
                  alt="Logo ArtiVisio"
                  width={50}
                  height={50}
                />
              </div>
              <span className="text-lg font-bold text-foreground">
                ArtiVisio
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <ConfirmSwitchButton />
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>
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
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6" />
              </Button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs h-5 min-w-[1.25rem] px-1 leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </div>
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
                  <Link href="/candidatures">
                    <button>Mes candidatures</button>
                  </Link>
                  <Link href="/offres-user">
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
  );
}
