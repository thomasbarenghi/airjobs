'use client'
import { TabBar } from '@/components'
import { tabItemsBuilder } from '../tabItemsBuilder'
import useSWR from 'swr'
import Endpoints from '@/utils/constants/endpoints.const'
import type { UserInterface } from '@/interfaces/user.interface'

interface TabBarItemProps {
  user: UserInterface
}

const TabsSection = ({ user }: TabBarItemProps) => {
  console.log('user', user)
  const { data: loggedUser, mutate } = useSWR(Endpoints.USER_BY_EMAIL(user?.email ?? ''), {
    fallbackData: user,
    revalidateIfStale: false
  })

  const items = tabItemsBuilder(loggedUser, mutate)
  return (
    <div className='flex flex-col gap-2'>
      <TabBar
        items={items}
        variant='light'
        tabClassName='bg-primary-foreground'
        tabContentClassName='group-data-[selected=true]:text-white px-4 text-primary'
        cursorClassName='group-data-[selected=true]:bg-primary '
      />
    </div>
  )
}

export default TabsSection
