import { Header, Footer } from '@/components'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header layout='simple' />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
