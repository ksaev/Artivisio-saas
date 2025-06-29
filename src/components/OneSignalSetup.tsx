"use client"
import { useEffect } from "react"

export function OneSignalSetup() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.OneSignal) {
      window.OneSignal = window.OneSignal || []
      window.OneSignal.push(() => {
        window.OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          notifyButton: {
            enable: true,
          },
          serviceWorkerPath: "/OneSignalSDKWorker.js",
        })
      })
    }
  }, [])  
  return null
}
