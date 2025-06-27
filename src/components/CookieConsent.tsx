"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie("cookie_consent")
    if (!consent) {
      window.gtag?.("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      })
      setVisible(true)
    }
  }, [])

  const accept = () => {
    setCookie("cookie_consent", "granted", 365)
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
    setVisible(false)
  }

  const decline = () => {
    setCookie("cookie_consent", "denied", 365)
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 w-full bg-black text-white px-4 py-3 flex justify-between items-center z-50">
      <p className="text-sm">
        Ce site utilise des cookies pour améliorer votre expérience.{" "}
        <a href="/politique-de-cookies" className="underline">
          En savoir plus
        </a>
      </p>
      <div className="flex gap-2">
        <button
          onClick={decline}
          className="bg-gray-700 px-3 py-1 rounded text-white"
        >
          Refuser
        </button>
        <button
          onClick={accept}
          className="bg-yellow-400 px-3 py-1 rounded text-black"
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
