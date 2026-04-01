import type { Metadata } from 'next'
import { Poppins, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Bloom — AI-Powered Plant & Floral Design',
  description: 'Innovating the spirit of bloom with AI. Discover generative botanical design, 3D plant structures, and artistic floral galleries.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSerif4.variable}`}>
      <body>{children}</body>
    </html>
  )
}
