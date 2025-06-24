// app/sitemap.xml/route.ts
import { NextResponse } from "next/server"

export const dynamic = "force-static" // Rend le sitemap accessible même en build static

const baseUrl = "https://artivisio.com"

export async function GET() {
  const routes = [
    { url: "/", priority: 1.0 },
    { url: "/services", priority: 0.9 },
    { url: "/offres", priority: 0.8 },
    { url: "/candidatures", priority: 0.7 },
    { url: "/candidatures/nouvelle", priority: 0.7 },
    { url: "/sign-up", priority: 0.6 },
    { url: "/sign-in", priority: 0.6 },
    { url: "/recruteur", priority: 0.5 },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      ({ url, priority }) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
