const Routes = {
  ABOUT: '/about',
  HOME: '/',
  FIND_JOBS: '/',
  EMPLOYERS: '/employers',
  SINGIN: '/signin',
  SINGUP: '/signup',
  INDIVIDUAL_JOB: (id: string) => `/job/${id}`,
  ACCOUNT: '/account',
  ADD_JOB: '/job/create-job',
  EDIT_ACCOUNT: '/account/edit',
  EDIT_JOB: (id: string) => `/job/edit-job/${id}`,
  APPLICANTS: (id: string) => `/job/${id}/applicants/`,
  ONBOARDING_COMPANY: '/onboarding-company'
}

export default Routes
