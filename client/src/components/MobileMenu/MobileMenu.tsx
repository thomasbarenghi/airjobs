import Menu from './Menu'
import ToggleBtn from './ToggleBtn'

export interface Props {
  isOpen: boolean
  toggle: () => void
  theme: 'light' | 'transparent'
  isScrolled: boolean
}

const MobileMenu = ({ isOpen, toggle, theme, isScrolled }: Props) => (
  <>
    {!isOpen && (
      <ToggleBtn
        isOpen={isOpen}
        toggle={toggle}
        theme={theme}
        isScrolled={isScrolled}
      />
    )}
    <Menu isOpen={isOpen} toggle={toggle} />
  </>
)

export default MobileMenu
