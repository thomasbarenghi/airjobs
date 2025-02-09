'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'

const SWRProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <SWRConfig
    value={{
      fetcher,
      revalidateOnFocus: true,
      refreshInterval: 3000,
      errorRetryCount: 1
    }}
  >
    {children}
  </SWRConfig>
)

export default SWRProvider
