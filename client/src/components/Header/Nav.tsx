import { NavbarContent, NavbarItem } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { itemsNav } from './lib/itemsNav'

const HeaderNav = () => {
  const pathname = usePathname()
  return (
    <NavbarContent className='hidden gap-8 p-0 lg:flex' justify='center'>
      {itemsNav.map(
        (item, index) =>
          item.visible && (
            <Link href={item.href} key={index}>
              <NavbarItem isActive={pathname === item.href} className='text-black'>
                {item.name}
              </NavbarItem>
            </Link>
          )
      )}
    </NavbarContent>
  )
}

export default HeaderNav
