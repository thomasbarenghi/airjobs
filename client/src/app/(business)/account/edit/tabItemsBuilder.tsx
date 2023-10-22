import type { UserInterface } from '@/interfaces/user.interface'
import UserTab from './components/UserTab'
import CompanyTab from './components/CompanyTab'
import SecurityTab from './components/SecurityTab'

interface TabBarItemProps {
  title: string
  content: JSX.Element
  visible?: boolean
}

export const tabItemsBuilder = (
  loggedUser: UserInterface
): TabBarItemProps[] => [
  {
    title: 'Personal Info',
    content: <UserTab loggedUser={loggedUser} />,
    visible: true
  },
  {
    title: 'Security Info',
    content: <SecurityTab loggedUser={loggedUser} />,
    visible: true
  },
  {
    title: 'Company Info',
    content: <CompanyTab loggedUser={loggedUser} />,
    visible: loggedUser?.role === 'company'
  }
]
