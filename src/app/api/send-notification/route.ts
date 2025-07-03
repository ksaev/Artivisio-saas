import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json()

    console.log("🔵 Requête reçue :")
    console.log("userId:", userId)
    console.log("message:", message)
    console.log("app_id:", process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID)
    console.log("REST API Key:", process.env.ONESIGNAL_REST_API_KEY ? "OK (présente)" : "❌ ABSENTE")

    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        include_external_user_ids: [userId],
        contents: { en: message },
      }),
    })

    const data = await response.json()
    console.log("🟠 Réponse OneSignal :", data)

    if (!response.ok) {
      return NextResponse.json({ error: true, status: response.status, data }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error("🔴 Erreur serveur :", err)
    return NextResponse.json({ error: true, message: "Erreur serveur", details: err }, { status: 500 })
  }
}
