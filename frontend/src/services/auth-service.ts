import { AxiosResponse } from 'axios'
import { LoginCredentials, IUserSession } from 'finpoq-core/types'
import { GET, POST } from './http'

export const auth = {
  _user: (user?: IUserSession): IUserSession | undefined => {
    if (typeof user !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
      return
    }

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    return JSON.parse(storedUser)
  },

  googleLogin: async (googleCredentials: IUserSession): Promise<IUserSession> =>
    await POST<IUserSession, AxiosResponse<IUserSession>>('/auth/google-login', googleCredentials).then((res) => {
      auth._user(res.data)
      return res.data
    }),

  login: async (credentials: LoginCredentials): Promise<IUserSession> =>
    await POST<LoginCredentials, AxiosResponse<IUserSession>>('/auth/login', credentials).then((res) => {
      auth._user(res.data)
      return res.data
    }),

  logout: (): void => {
    localStorage.removeItem('user')
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const user = auth._user()
      if (!user) return false

      return await GET<boolean>('/auth/validate', {
        headers: { authorization: user.token },
      }).then((res) => res.data)
    } catch (e) {
      return false
    }
  },
}
