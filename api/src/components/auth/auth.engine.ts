import jwt from 'jsonwebtoken'

export const getUserEmail = (token: string | undefined): string | undefined => {
  if (!token) return

  const user = jwt.decode(token)

  if (typeof user === 'object') {
    return user.email
  }
}
