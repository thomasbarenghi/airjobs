export interface UserForm {
  firstName: string
  lastName: string
  birthday: string
  email: string
  username: string
  profileImage: any
}

export interface SecurityForm {
  oldPassword: string
  newPassword: string
}

export interface CompanyForm {
  name: string
  description: string
  website: string
  logo: any
  email: string
}
