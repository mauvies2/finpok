import axios, { AxiosResponse } from 'axios'
import { LoginCredentials, IUserSession } from 'finpoq-core/domain'

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

  googleLogin: async (googleCredentials: IUserSession): Promise<IUserSession | null> =>
    await axios
      .post<IUserSession, AxiosResponse<IUserSession>>('http://localhost:5000/auth/google-login', googleCredentials)
      .then((res) => {
        auth._user(res.data)
        return res.data
      }),

  login: async (credentials: LoginCredentials): Promise<IUserSession | null> =>
    await axios
      .post<LoginCredentials, AxiosResponse<IUserSession>>('http://localhost:5000/auth/login', credentials)
      .then((res) => {
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

      return await axios
        .get<boolean>('http://localhost:5000/auth/validate', {
          headers: { authorization: user.token },
        })
        .then((res) => res.data)
    } catch (e) {
      return false
    }
  },
}
