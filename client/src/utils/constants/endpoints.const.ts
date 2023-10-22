const Endpoints = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/users',
  ALL_JOBS: '/api/jobs',
  ALL_USERS: '/api/users',
  INDIVIDUAL_JOB: (id: string) => `/api/jobs/${id}`,
  USER_BY_EMAIL: (email: string) => `/api/users/${email}`,
  USER_BY_ID: (id: string) => `/api/users/${id}`
}

export default Endpoints
