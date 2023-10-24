import Image from 'next/image'
import type { Props } from './MobileMenu'

const ToggleBtn = ({ isOpen, toggle, theme, isScrolled }: Props) => {
  const logo = '/icon/menu-blue.svg'
  return (
    <Image
      src={isOpen ? '/icon/cross.svg' : logo}
      className='cursor-pointer lg:hidden'
      alt='toggle'
      width={24}
      height={24}
      onClick={toggle}
    />
  )
}

export default ToggleBtn
