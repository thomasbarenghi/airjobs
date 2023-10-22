/* eslint-disable @typescript-eslint/ban-types */
'use client'
import { SWRConfig } from 'swr'
import { fetcher } from '@/services/fetcher.service'

const SWRProvider = ({ children }: React.PropsWithChildren<{}>) => (
  <SWRConfig
    value={{
      provider: () => new Map(),
      fetcher,
      revalidateOnFocus: true,
      errorRetryCount: 1
    }}
  >
    {children}
  </SWRConfig>
)

export default SWRProvider
