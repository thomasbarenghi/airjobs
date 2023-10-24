import type { CompanyInterface } from './company.interface'
import type { JobInterface } from './job.interface'

export interface UserInterface {
  _id: string
  firstName: string
  lastName: string
  birthday: Date
  email: string
  role: RoleEnum
  password: string
  username: string
  profileImage: string
  company: CompanyInterface
  jobs: JobsEnum
}

interface JobsEnum {
  created: JobInterface[]
  applied: JobInterface[]
}

export type RoleEnum = 'company' | 'aspirant'
