'use client'
import { Tabs, Tab, Skeleton } from "@heroui/react"
import type { Key } from 'react'

interface TabBarItemProps {
  title: string
  content: JSX.Element
  visible?: boolean
}

interface TabBarProps {
  items: TabBarItemProps[]
  variant: 'underlined' | 'solid' | 'light' | 'bordered'
  onSelectionChange?: (index: Key) => void
  tabClassName?: string
  tabContentClassName?: string
  cursorClassName?: string
  isLoading?: boolean
}

const TabBar = ({
  items,
  variant,
  onSelectionChange = (index: Key) => {},
  tabClassName,
  tabContentClassName = 'p-4',
  cursorClassName,
  isLoading = false
}: TabBarProps) => (
  <>
    {isLoading ? (
      <>
        <div className='flex gap-2'>
          <Skeleton className='h-[30px] w-[100px] rounded-full' />
          <Skeleton className='h-[30px] w-[100px] rounded-full' />
        </div>
        <div>{items[0].content}</div>
      </>
    ) : (
      <Tabs
        classNames={{
          tab: tabClassName,
          tabContent: tabContentClassName,
          cursor: cursorClassName
        }}
        variant={variant}
        onSelectionChange={(index) => {
          onSelectionChange(index)
        }}
        radius='full'
      >
        {items?.map(
          ({ title, content, visible = true }, index) =>
            visible && (
              <Tab key={title} title={title} className='px-0'>
                {content}
              </Tab>
            )
        )}
      </Tabs>
    )}
  </>
)

export default TabBar
