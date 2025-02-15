import type { ICompany } from './company'
import type { IJob } from './job'

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  birthday: Date
  email: string
  role: RoleEnum
  password: string
  username: string
  profileImage: string
  company: ICompany
  jobs: JobsEnum
}

interface JobsEnum {
  created: IJob[]
  applied: IJob[]
}

export type RoleEnum = 'company' | 'aspirant'
