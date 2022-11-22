import { AxiosResponse } from 'axios'
import { LoginCredentials, IUserSession } from 'finpoq-core/types'
import { GET, POST } from './http'

export const auth = {
  _user: (): IUserSession | undefined => {
    const auth = localStorage.getItem('auth')
    if (!auth) return

    return JSON.parse(auth).authUser
  },

  googleLogin: async (googleCredentials: IUserSession): Promise<IUserSession> => {
    const response = await POST<IUserSession>('/auth/google-login', googleCredentials)
    return response.data
  },

  login: async (credentials: LoginCredentials): Promise<IUserSession> => {
    const response = await POST<LoginCredentials, AxiosResponse<IUserSession>>('/auth/login', credentials)
    return response.data
  },

  isLoggedIn: async (token: string): Promise<boolean> =>
    await GET('/auth/validate', {
      headers: {
        authorization: token,
      },
    }),
}
