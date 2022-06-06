import mongoose, { model, Schema } from 'mongoose'
import { PortfolioModel, portfolioSchema } from '../portfolio/Portfolio'
import { IUser } from 'finpoq/types'

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: portfolioSchema,
      default: {},
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

interface SinglePortfolio {
  portfolio: PortfolioModel
}

export type UserModel = IUser & mongoose.Document & SinglePortfolio & Omit<IUser, 'portfolio'>

export default model<UserModel>('User', userSchema)
