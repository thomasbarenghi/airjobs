import { TextElement } from '.'

const Footer = () => (
  <footer className='w-full bg-primary min-h-[250px] flex justify-center items-center'>
    <TextElement type='base' as='p' className='text-white'>
      ©2023 a Thomas Barenghi challenge for Beekin.
    </TextElement>
  </footer>
)

export default Footer
