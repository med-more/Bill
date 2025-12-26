import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Legends Academy - Premium Pool & Snooker Lounge",
  description: "Experience luxury billiards, premium coffee, and elegant dining at Legends Academy",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#1F3A4A",
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-slate-950`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
