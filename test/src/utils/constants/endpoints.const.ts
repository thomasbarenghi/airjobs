const Endpoints = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/users',
  ALL_JOBS: '/api/jobs',
  ALL_USERS: '/api/users',
  INDIVIDUAL_JOB: (id: string) => `/api/jobs/${id}`,
  USER_BY_EMAIL: (email: string) => `/api/users/${email}`,
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  APPLY_JOB: (id: string) => `/api/jobs/${id}/apply`,
  CREATE_JOB: '/api/jobs',
  UNAPPLY_JOB: (id: string) => `/api/jobs/${id}/unapply`,
  EDIT_USER: (id: string) => `/api/users/${id}`,
  EDIT_COMPANY: (id: string) => `/api/users/${id}/edit-company-details`,
  EDIT_PASSWORD: (id: string) => `/api/users/${id}/edit-password`,
  EDIT_JOB: (id: string) => `/api/jobs/${id}`,
  DELETE_JOB: (id: string) => `/api/jobs/${id}`,
  ADD_COMPANY: (id: string) => `/api/users/${id}/add-company-details`,
  UPDATE_APPLICANT: (id: string) => `/api/jobs/${id}/update-applicant`
}

export default Endpoints
