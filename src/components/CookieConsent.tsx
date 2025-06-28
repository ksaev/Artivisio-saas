"use client"

import { useEffect, useState } from "react"
import { GoogleTagManager } from "@next/third-parties/google"

type ConsentPrefs = {
  analytics: boolean
  ads: boolean
}


const COOKIE_NAME = "cookie_consent_prefs"
const COOKIE_EXPIRE_DAYS = 365

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

export default function CookieConsent() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!
  const [visible, setVisible] = useState(false)
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    analytics: false,
    ads: false,
  })

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME)
    if (!cookie) {
      setVisible(true)
    } else {
      try {
        const savedPrefs = JSON.parse(cookie)
        setPrefs(savedPrefs)
        if (savedPrefs.analytics || savedPrefs.ads) {
          loadGTM()
          updateConsent(savedPrefs)
        }
      } catch {
        // Mauvais format cookie, reset consent
        setVisible(true)
      }
    }
  }, [])

  function loadGTM() {
    if (document.getElementById("gtm-script")) return
    const script = document.createElement("script")
    script.id = "gtm-script"
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    script.async = true
    document.head.appendChild(script)
  }

  function updateConsent(prefs: ConsentPrefs) {
    const win = window as any

    if (!win.dataLayer) {
      win.dataLayer = []
    }

    if (!win.gtag) {
      win.gtag = function (...args: any[]) {
        win.dataLayer.push(args)
      }
    }

    win.gtag("consent", "update", {
      ad_storage: prefs.ads ? "granted" : "denied",
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_personalization: prefs.ads ? "granted" : "denied",
      ad_user_data: prefs.ads ? "granted" : "denied",
    })
  }

  const handleAccept = () => {
    const newPrefs = { analytics: true, ads: true }
    setPrefs(newPrefs)
    setCookie(COOKIE_NAME, JSON.stringify(newPrefs), COOKIE_EXPIRE_DAYS)
    loadGTM()
    updateConsent(newPrefs)
    setVisible(false)
  }

  const handleSave = () => {
    setCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_EXPIRE_DAYS)
    if (prefs.analytics || prefs.ads) {
      loadGTM()
      updateConsent(prefs)
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {(prefs.analytics || prefs.ads) && <GoogleTagManager gtmId={GTM_ID} />}

      <div
        className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center p-6 z-[9999]"
        style={{ minHeight: "100vh" }}
      >
        <div className="bg-white rounded-md p-8 max-w-xl w-full text-center text-gray-900">
          <h2 className="text-2xl font-bold mb-4">Préférences de cookies</h2>
          <p className="mb-6">
            Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez choisir les types de cookies que vous acceptez.
          </p>

          <div className="flex flex-col items-start gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={e => setPrefs(prev => ({ ...prev, analytics: e.target.checked }))}
              />
              <span>Cookies Analytics (Google Analytics, etc.)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.ads}
                onChange={e => setPrefs(prev => ({ ...prev, ads: e.target.checked }))}
              />
              <span>Cookies Publicitaires (personnalisation, ciblage)</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                setPrefs({ analytics: false, ads: false })
                handleSave()
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Refuser tout
            </button>

            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Accepter tout
            </button>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 underline text-sm text-gray-600 hover:text-gray-900"
          >
            Enregistrer mes préférences
          </button>
        </div>
      </div>
    </>
  )
}
