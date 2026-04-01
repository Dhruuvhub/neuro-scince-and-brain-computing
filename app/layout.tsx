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
  title: 'Neuroscience & Brain Computing — Synapse OS',
  description: 'An interactive storyboard exploring Neuroscience, Action Potentials, Brain Waves, and Brain-Computer Interfaces. Built with Next.js and GSAP.',
  openGraph: {
    title: 'Neuroscience & Brain Computing — Synapse OS',
    description: 'From neurons to neural engineering — an interactive class presentation.',
    type: 'website',
  },
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
