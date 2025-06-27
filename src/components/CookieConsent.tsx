"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

function loadGTM(gtmId: string) {
  if (document.getElementById("gtm-script")) return

  const script = document.createElement("script")
  script.id = "gtm-script"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "gtm.js", "gtm.start": new Date().getTime() })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie("cookie_consent")
    if (!consent) {
      setVisible(true)
    } else if (consent === "granted") {
      loadGTM("GTM-MGSWXGTP")
    }
  }, [])

  const accept = () => {
    setCookie("cookie_consent", "granted", 365)
    loadGTM("GTM-MGSWXGTP")
    window.dataLayer?.push({ event: "cookie_consent_granted" })
    setVisible(false)
  }

  const decline = () => {
    setCookie("cookie_consent", "denied", 365)
    window.dataLayer?.push({ event: "cookie_consent_denied" })
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
        <button onClick={decline} className="bg-red-600 px-3 py-1 rounded">
          Refuser
        </button>
        <button onClick={accept} className="bg-green-500 px-3 py-1 rounded text-black">
          Accepter
        </button>
      </div>
    </div>
  )
}
