import type { Metadata, Viewport } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Sea N Shore IT",
  description:
    "Sea N Shore IT Solutions LLP designs, builds and runs websites, platforms, mobile apps and AI automation. Built Sea N Shore, Marine Tanks, VerifyU, Cloud Trails and inFAMOUS Gaming Cafe.",
  metadataBase: new URL("https://snsit.co.in"),
  icons: { icon: "/assets/brand/sns-mark-color.png" },
  openGraph: {
    title: "Sea N Shore IT",
    description: "Websites, platforms, mobile apps and AI automation by Sea N Shore IT Solutions LLP.",
    url: "https://snsit.co.in",
    images: [{ url: "/assets/og.jpg" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&family=Schibsted+Grotesk:wght@500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
