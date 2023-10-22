import type { UserInterface } from './user.interface'

export interface JobInterface {
  title: string
  description: string
  country: string
  seniority: 'Junior' | 'Mid' | 'Senior'
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary'
  location: 'Remote' | 'On-site' | 'Hybrid'
  salary: number
  currency: string
  owner: UserInterface
  createdAt: string
  updatedAt: string
  _id: string
  active: boolean
  applicants: ApplicantsEnum[]
  maxApplicants: number
}

export interface ApplicantsEnum {
  user: UserInterface
  status: 'Under review' | 'Interested company' | 'Obtained' | 'Rejected'
}
