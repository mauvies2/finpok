import { RequestHandler, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

import User from '../users/User'
import config from '../../config/default'
import { encryptPassword, validatePassword } from '../users/users.engine'
import { IUserSession } from 'finpoq/types'

type UserRegisterData = {
  name: string
  password: string
  email: string
}

export const validateToken: RequestHandler = async (req: Request, res: Response) =>
  res.status(200).json(!!req.body.user)

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  const { email, password, name }: UserRegisterData = req.body

  try {
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) throw new Error(`User with email ${email} already exists`)

    const encryptedPassword = await encryptPassword(password)
    const user = new User({ name, email, password: encryptedPassword })
    await user.save()

    return res.json({ status: 200, msg: 'User registered', data: user })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ status: 400, error: 'User could not be registered' })
  }
}

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw Error('Email is not registered')

    const validPassword = await validatePassword(req.body.password, user.password)
    if (!validPassword) throw new Error('User or password is incorrect')

    const { _id, name, email } = user
    const token = jwt.sign({ _id, email }, config.jwt, { expiresIn: '2 days' })

    return res.status(200).header('auth-token', token).json({
      _id,
      name,
      email,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ status: 400, error: error.message })
  }
}

export const handleGoogleAuth: RequestHandler = async (req: Request, res: Response) => {
  const { email, name, token, imageUrl }: IUserSession = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      const newUser = new User({ name, email, imageUrl })
      await newUser.save()
    }

    return res.status(200).header('auth-token', token).json({ name, email, token, imageUrl })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ status: 400, error: error.message })
  }
}
