export interface AuthInterface {
  sessionId: string
  isLogged: boolean
}

export interface LoginSuccessful {
  userId: string
  sessionId: string
  message: string
}

export interface LogoutSuccessful {
  message: string
}
