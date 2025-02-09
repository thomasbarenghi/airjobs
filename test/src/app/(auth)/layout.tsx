import { Header } from '@/components'

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header layout='simple' />
    <main>{children}</main>
  </>
)

export default AuthLayout
