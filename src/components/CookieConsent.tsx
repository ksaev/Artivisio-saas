
import { useEffect, useState } from "react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setVisible(true)
    } else if (consent === "true") {
      // Consentement déjà donné → charger GA
      loadGoogleAnalytics()
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true")
    setVisible(false)
    loadGoogleAnalytics()
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "false")
    setVisible(false)
  }

  const loadGoogleAnalytics = () => {
    // Insère dynamiquement le script de Google
    const script1 = document.createElement("script")
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-NDGG3LBBVJ"
    script1.async = true
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NDGG3LBBVJ');
    `
    document.head.appendChild(script2)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white px-6 py-4 z-50 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <p className="text-sm mb-2 sm:mb-0 max-w-xl">
        Ce site utilise des cookies pour améliorer votre expérience.{" "}
        <a href="/cookies" className="underline text-primary">En savoir plus</a>
      </p>
      <div className="flex gap-2">
        <button onClick={rejectCookies} className="bg-white text-gray-900 px-4 py-1 rounded hover:bg-gray-200 transition">
          Refuser
        </button>
        <button onClick={acceptCookies} className="bg-primary px-4 py-1 rounded text-white font-semibold hover:bg-primary-dark transition">
          Accepter
        </button>
      </div>
    </div>
  )
}
