import type { IUser } from './user'

export interface IJob {
  title: string
  description: string
  country: string
  seniority: SeniorityEnum
  type: TypeEnum
  location: LocationEnum
  salary: number
  currency: CurrencyEnum
  owner: IUser
  createdAt: string
  updatedAt: string
  _id: string
  active: boolean
  applicants: ApplicantsEnum[]
  maxApplicants: number
  deadline: string
}

export interface ApplicantsEnum {
  user: IUser
  status: StatusEnum
  createdAt: string
  resume: string
}

export type StatusEnum = 'Under review' | 'Interested company' | 'Obtained' | 'Rejected'

export type LocationEnum = 'Remote' | 'On-site' | 'Hybrid'

export type TypeEnum = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary'

export type SeniorityEnum = 'Junior' | 'Mid' | 'Senior'

export type CurrencyEnum = 'USD' | 'EUR' | 'INR'

export type CountryEnum = 'United States' | 'India' | 'England'
