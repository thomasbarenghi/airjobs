import { Header, Footer } from '@/components'

const BusinessLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default BusinessLayout
