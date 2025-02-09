import type { CurrencyEnum, LocationEnum, SeniorityEnum, TypeEnum } from '@/interfaces/job.interface'

export interface JobForm {
  title: string
  description: string
  country: string
  seniority: SeniorityEnum
  type: TypeEnum
  location: LocationEnum
  salary: number
  currency: CurrencyEnum
  ownerId: string
  active: boolean
  maxApplicants: number
  deadline: string
}
