import axios, { AxiosResponse } from 'axios'
import { IUserSession } from 'finpok-core/domain'
import { AuthCredentials } from 'finpok/store/auth/AuthContext'

export const auth = {
  user: (user?: IUserSession): IUserSession | undefined => {
    if (typeof user !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))

      return
    }

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    return JSON.parse(storedUser)
  },

  login: async (credentials: AuthCredentials): Promise<IUserSession | null> => {
    const user = await axios
      .post<AuthCredentials, AxiosResponse<{ error: any; data: IUserSession }>>(
        'http://localhost:5000/auth/login',
        credentials
      )
      .then((res) => res.data.data)
    if (user) {
      auth.user(user)
      return user
    }

    return null
  },

  logout: (): void => {
    localStorage.removeItem('user')
  },

  isLoggedIn: async (): Promise<boolean> => {
    try {
      const user = auth.user()
      if (!user) return false

      return await axios
        .get<any>('http://localhost:5000/auth/validate', {
          headers: { authorization: user.token },
        })
        .then((res) => res.data)
    } catch (e) {
      return false
    }
  },
}
