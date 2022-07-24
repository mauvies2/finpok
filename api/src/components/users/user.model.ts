import { model, Schema, Document } from 'mongoose'
import { portfolioSchema } from '../portfolio/model/portfolio.model'
import { IUser } from 'finpoq-core/types'

export type UserModel = IUser & Document

const userSchema = new Schema<UserModel>(
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

userSchema.set('toObject', {
  virtuals: true,
  flattenMaps: true,
})

export default model<UserModel>('User', userSchema)
