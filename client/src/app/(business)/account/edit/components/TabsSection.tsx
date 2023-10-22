'use client'
import { TabBar } from '@/components'
import { tabItemsBuilder } from '../tabItemsBuilder'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Endpoints from '@/utils/constants/endpoints.const'

const TabsSection = () => {
  const { data: session } = useSession()
  const { data: loggedUser } = useSWR(
    Endpoints.USER_BY_EMAIL(session?.user?.email ?? '')
  )

  const items = tabItemsBuilder(loggedUser)
  return (
    <div className='flex flex-col gap-2'>
      <TabBar
        items={items}
        variant='light'
        tabClassName='bg-primary-foreground'
        tabContentClassName='group-data-[selected=true]:text-white px-4 text-primary'
        cursorClassName='group-data-[selected=true]:bg-primary '
        tabListClassName='text-default-500'
      />
    </div>
  )
}

export default TabsSection
