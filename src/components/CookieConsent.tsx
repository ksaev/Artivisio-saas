"use client"

import { useEffect, useState } from "react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted")

    // 👉 Déclare localement dataLayer de manière sûre
    const win = window as unknown as { dataLayer: any[] }
    win.dataLayer = win.dataLayer || []

    function gtag(...args: any[]) {
      win.dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', 'G-NDGG3LBBVJ') // remplace par ton vrai ID

    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 bg-white border shadow-lg p-4 rounded-xl max-w-md mx-auto text-sm sm:text-base">
      <p className="mb-3 text-gray-800">
        Ce site utilise des cookies pour analyser le trafic et améliorer votre expérience. En cliquant sur "Accepter", vous consentez à leur utilisation.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setVisible(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Refuser
        </button>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
