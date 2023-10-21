import type { CompanyInterface } from './company.interface'

export interface JobInterface {
  title: string
  description: string
  country: string
  seniority: 'Junior' | 'Mid' | 'Senior'
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary'
  location: 'Remote' | 'On-site' | 'Hybrid'
  salary: number
  currency: string
  company: CompanyInterface
  createdAt: Date
  updatedAt: Date
  _id: string
}
