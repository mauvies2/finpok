import jwt from 'jsonwebtoken'

export const getUserId = (token: string | undefined): string | undefined => {
  if (!token) return

  const user = jwt.decode(token)

  if (typeof user === 'object') {
    return user._id
  }
}
