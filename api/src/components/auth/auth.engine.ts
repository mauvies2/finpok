import jwt from 'jsonwebtoken'

export const getUserId = (token: string | undefined): string | undefined => {
  if (token) {
    const user: string | { [key: string]: string } | null = jwt.decode(token)
    if (user && typeof user === 'object') {
      return user._id
    }
  }
}
