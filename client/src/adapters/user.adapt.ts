import type { IUser } from '@/interfaces/user.interface'

export const userAdapter = (user: IUser) => {
  const { _id, email, username, role } = user
  return { _id, email, username, role }
}
