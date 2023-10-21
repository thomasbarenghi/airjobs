import { Header, Footer } from '@/components'

const GeneralLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default GeneralLayout
