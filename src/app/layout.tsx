import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Framer Components Showcase',
  description: 'A showcase website for custom Framer components with code viewing and copying functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
