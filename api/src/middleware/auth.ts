import { RequestHandler, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { getUserEmail } from '../components/auth/auth.engine'
import User from '../components/users/User'
import config from 'finpok/config/default'

const client = new OAuth2Client({ clientId: config.clientId })

const auth: RequestHandler = async (req: Request, res: Response, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' })

  try {
    const decoded = jwt.decode(token)

    if (decoded && typeof decoded !== 'string' && decoded.iss === 'accounts.google.com') {
      await client.verifyIdToken({ idToken: token })
    } else {
      jwt.verify(token, config.jwt)
    }

    const email = getUserEmail(token)
    const user = await User.findOne({ email })
    if (!user) throw new Error('User could not be found')

    req.body.user = user

    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Access denied' })
  }
}

export default auth
