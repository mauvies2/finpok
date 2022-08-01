import { model, Schema, Document, Types } from 'mongoose'
import { IPortfolio, portfolioSchema } from 'finpoq/components/portfolio/schemas/portfolio.schema'

export interface IDoc {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  _id: string
  name: string
  email: string
  imageUrl: string
  password?: string
  portfolio: IPortfolio
}

export type UserDoc = IUser & IDoc
export type UserModel = IUser & Document<Types.ObjectId, { _id: Types.ObjectId | string; email: string }, UserDoc>

const userSchema = new Schema<IUser>(
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
