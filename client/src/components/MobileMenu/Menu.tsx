/* eslint-disable @typescript-eslint/indent */
'use client'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import MobileMenuNav from './Nav'

interface Props {
  isOpen: boolean
  toggle: () => void
}

const Menu = ({ isOpen, toggle }: Props) => (
  <>
    {isOpen &&
      createPortal(
        <div className='section-padding-x-1 fixed left-0 top-0 z-50 flex h-screen w-screen flex-col gap-14 bg-white py-8'>
          <div className='flex w-full items-center justify-between'>
            <Image src='/icon/logo-blue.svg' alt='logo' width={75} height={30} />
            <div className='flex cursor-pointer items-center gap-1' onClick={toggle}>
              <p className='text-black'>Close</p>
              <Image src='/icon/cross-black.svg' alt='logo' width={40} height={40} />
            </div>
          </div>
          <MobileMenuNav toggle={toggle} />
        </div>,
        document.body
      )}
  </>
)

export default Menu
