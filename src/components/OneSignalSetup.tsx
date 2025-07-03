"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export function OneSignalSetup() {
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    // Vérifie que le navigateur a bien accès à OneSignal
    if (typeof window !== "undefined") {
      // Initialise OneSignal si non déjà présent
      window.OneSignal = window.OneSignal || []

      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
          notifyButton: {
            enable: true,
          },
          allowLocalhostAsSecureOrigin: true, // nécessaire pour le dev local
          serviceWorkerPath: "/OneSignalSDKWorker.js",
        })

        // Lie l'utilisateur connecté à OneSignal
        window.OneSignal.setExternalUserId(user.id)
        console.log("Connecté en tant que "+user.id)
      })
    }
  }, [user])

  return null
}
