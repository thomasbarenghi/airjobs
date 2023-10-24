export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
export const firstNameRegex = /^[a-zA-Z]{2,}$/
export const lastNameRegex = /^[a-zA-Z]{2,}$/
export const usernameRegex = /^[a-zA-Z0-9]{2,}$/
export const titleRegex = /^[\w\s!@#$%^&*()_+-=[\]{};':"\\|,.<>/?`~]{2,50}$/
export const descriptionRegex = /^[\w\s!@#$%^&*()_+-=[\]{};':"\\|,.<>/?`~]{2,1000}$/
export const salaryRegex = /^[0-9]{1,10}$/
export const maxApplicantsRegex = /^[0-9]{1,10}$/
export const companyNameRegex = /^[\w\s!@#$%^&*()_+-=[\]{};':"\\|,.<>/?`~]{2,50}$/
export const companyDescriptionRegex = /^[\w\s!@#$%^&*()_+-=[\]{};':"\\|,.<>/?`~]{2,1000}$/
export const websiteRegex =
  /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
