import axios, { AxiosResponse } from 'axios'
import { AuthCredentials, IUserSession } from 'finpok-core/domain'

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

  login: async (credentials: AuthCredentials): Promise<IUserSession | null> => {
    const user = await axios
      .post<AuthCredentials, AxiosResponse<IUserSession>>('http://localhost:5000/auth/login', credentials)
      .then((res) => res.data)
    if (user) {
      auth._user(user)
      return user
    }

    return null
  },

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
