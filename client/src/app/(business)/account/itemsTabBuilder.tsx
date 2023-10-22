import type { UserInterface } from '@/interfaces/user.interface'

interface TabBarItemProps {
  title: string
  content: JSX.Element
  visible?: boolean
}

export const itemsTabBuilder = (
  loggedUser: UserInterface
): TabBarItemProps[] => [
  {
    title: 'Applied Jobs',
    content: <></>,
    visible: loggedUser?.role === 'aspirant'
  },
  {
    title: 'Posted Jobs',
    content: <></>,
    visible: loggedUser?.role === 'aspirant'
  },
  {
    title: 'Reviews',
    content: <>Feature in development</>,
    visible: true
  }
]
