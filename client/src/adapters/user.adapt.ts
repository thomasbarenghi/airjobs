import type { UserInterface } from '@/interfaces/user.interface'

export const userAdapter = (user: UserInterface) => {
  const { _id, email, username, role } = user
  return { _id, email, username, role }
}
