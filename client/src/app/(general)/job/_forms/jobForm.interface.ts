import { CurrencyEnum, LocationEnum, SeniorityEnum, TypeEnum } from "@/types/job"


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
