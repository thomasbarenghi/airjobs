/* eslint-disable @typescript-eslint/indent */
'use client'
import Image from 'next/image'
import { ProfileAction } from '@/components'
import { itemsNav } from './lib/itemsNav'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import NextLink from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'
import Routes from '@/utils/constants/routes.const'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'

interface Props {
  theme?: 'light' | 'transparent'
  layout?: 'simple' | 'full'
}

const Header = ({ theme = 'transparent', layout = 'full' }: Props) => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logo = '/icon/logo-blue.svg'
  const bgColor = isScrolled ? 'bg-[#FFFFFFF1]' : 'bg-transparent'
  const blur = isScrolled
  const stylesNavbar = clsx('section-padding-1 fixed py-6', bgColor)

  const textColor = isScrolled
    ? 'text-black'
    : theme === 'transparent'
    ? 'text-white'
    : 'text-black'

  const handleScroll = (position: number) => {
    setIsScrolled(position > 0)
  }

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={stylesNavbar}
      classNames={{
        wrapper:
          'p-0 h-auto w-full max-w-full flex justify-between  2xl:container',
        base: 'bg-transparent min-h-[95px]',
        content: 'w-auto !grow-0',
        brand: 'max-w-[185px] ',
        item: `data-[active=true]:font-semibold font-light ${textColor}`
      }}
      isBlurred={blur}
      shouldHideOnScroll={false}
      onScrollPositionChange={(position) => {
        handleScroll(position)
      }}
    >
      <div className='flex gap-3'>
        <MobileMenu
          isOpen={isMenuOpen}
          toggle={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
          theme={theme}
          isScrolled={isScrolled}
        />
        <NextLink href={Routes.HOME}>
          <NavbarBrand>
            <Image src={logo} alt='Logo' width={75} height={30} />
          </NavbarBrand>
        </NextLink>
      </div>
      {layout === 'full' && (
        <div className='flex items-center justify-end gap-10'>
          <NavbarContent className=' hidden gap-8 p-0 lg:flex' justify='center'>
            {itemsNav.map(
              (item, index) =>
                item.visible && (
                  <NextLink href={item.href} key={index}>
                    <NavbarItem
                      isActive={pathname === item.href}
                      className='text-black'
                    >
                      {item.name}
                    </NavbarItem>
                  </NextLink>
                )
            )}
          </NavbarContent>
          <NavbarContent>
            <NavbarItem className='flex items-center gap-2'>
              <ProfileAction />
            </NavbarItem>
          </NavbarContent>
        </div>
      )}
    </Navbar>
  )
}

export default Header
