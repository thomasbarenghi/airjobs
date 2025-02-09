import { TextElement } from '.'

const Footer = () => (
  <footer className='flex min-h-[250px] w-full items-center justify-center bg-primary'>
    <TextElement type='base' as='p' className='text-white'>
      ©2023 Thomas Barenghi | thomasbarenghi@gmail.com | www.thomasbarenghi.com
    </TextElement>
  </footer>
)

export default Footer
