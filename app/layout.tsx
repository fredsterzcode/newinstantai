import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

export const metadata: Metadata = {
  title: 'InstantList.ai - AI Website Builder',
  description: 'Create beautiful websites instantly with AI. Just describe what you want and watch your website come to life.',
  keywords: ['AI', 'website builder', 'instant websites', 'landing pages'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-background font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
