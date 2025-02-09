import type { IUser } from '@/interfaces/user.interface'
import Routes from '@/utils/constants/routes.const'

export interface ItemNavInterface {
  label: string
  key: string
  href: string
  visible: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default' | undefined
}

export const itemsNavBuilder = (currentUser: IUser): ItemNavInterface[] => [
  {
    key: Routes.HOME,
    label: 'Home',
    href: Routes.HOME,
    visible: true
  },
  {
    key: Routes.ACCOUNT,
    label: 'My account',
    href: Routes.ACCOUNT,
    visible: true
  },
  {
    key: Routes.FIND_JOBS,
    label: 'Find jobs',
    href: Routes.FIND_JOBS,
    visible: true
  }
]
