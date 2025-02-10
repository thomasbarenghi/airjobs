import { Toaster } from 'sonner'
import './globals.css'
import { Outfit } from 'next/font/google'
import HeroUIProvider from '@/app/HeroUIProvider'
import { SessionProvider } from 'next-auth/react'
import SWRProvider from './SWRProvider'
import { Viewport } from 'next'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700']
})

export const viewport: Viewport = {
  themeColor: '#0F03C1'
}

export const metadata = {
  title: 'Airjobs'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='es'>
    <body className={outfit.className + ' light'} translate='no'>
      <SessionProvider>
        <SWRProvider>
          <HeroUIProvider>
            <Toaster richColors />
            {children}
          </HeroUIProvider>
        </SWRProvider>
      </SessionProvider>
    </body>
  </html>
)

export default RootLayout
