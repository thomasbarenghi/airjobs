/* eslint-disable @typescript-eslint/indent */
'use client'
import { itemsNav } from '../Header/lib/itemsNav'
import { TextElement } from '@/components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  toggle: () => void
}

const MobileMenuNav = ({ toggle }: Props) => {
  const pathname = usePathname()
  const activeClass = (href: string) => (pathname === href ? '!font-semibold' : '!font-light')

  return (
    <div className='flex flex-col gap-5'>
      {itemsNav.map((item, index) => (
        <div key={index} className='flex h-full flex-col items-start justify-center' onClick={toggle}>
          <Link href={item.href}>
            <TextElement as='p' type='t1' className={`text-black ${activeClass(item.href)}`}>
              {item.name}
            </TextElement>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MobileMenuNav
