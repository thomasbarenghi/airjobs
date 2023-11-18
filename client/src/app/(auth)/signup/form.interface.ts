import type { UserForm } from '@/interfaces/forms.interface'
import type { RoleEnum } from '@/interfaces/user.interface'

export interface RegisterForm extends UserForm {
  password: string
  role: RoleEnum
}
