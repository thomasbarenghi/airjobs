import { Toaster } from 'sonner'
import './globals.css'
import { Outfit } from 'next/font/google'
import HeroUIProvider from '@/app/HeroUIProvider'
import { SessionProvider } from 'next-auth/react'
import SWRProvider from './SWRProvider'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700']
})

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
