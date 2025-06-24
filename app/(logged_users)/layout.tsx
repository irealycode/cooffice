import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoOffice - Premium Coworking Spaces",
  description: "Find and book premium coworking spaces in your city. From hot desks to private offices.",
  icons: {
    icon: "/assets/images/desk.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar logged />
        <main>{children}</main>
      </body>
    </html>
  )
}
