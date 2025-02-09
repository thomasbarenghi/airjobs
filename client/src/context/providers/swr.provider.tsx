/* eslint-disable @typescript-eslint/ban-types */
'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'
import dynamic from 'next/dynamic'

const localStorageProvider = dynamic(async () => await import('./localStorage.provider'), {
  ssr: false
})

const SWRProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <SWRConfig
    value={{
      provider: localStorageProvider,
      fetcher,
      revalidateOnFocus: true,
      errorRetryCount: 1
    }}
  >
    {children}
  </SWRConfig>
)

export default SWRProvider
