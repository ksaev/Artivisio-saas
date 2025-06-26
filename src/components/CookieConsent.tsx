"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
"use client"


export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    // Autorise le stockage analytics (Google Consent Mode v2)
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
    })

    // Émet un événement personnalisé pour GTM
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "consent_analytics_granted" })

    // Masquer la bannière + mémoriser le choix
    localStorage.setItem("cookieConsent", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 p-4 text-center shadow-lg">
      <p className="text-sm text-gray-800 mb-2">
        Ce site utilise des cookies pour mesurer l’audience. Acceptez-vous ?
      </p>
      <button
        onClick={acceptCookies}
        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        J’accepte
      </button>
    </div>
  )
}
