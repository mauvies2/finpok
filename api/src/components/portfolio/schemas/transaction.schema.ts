import { ITransaction } from 'finpoq-core/types'
import { Schema } from 'mongoose'

export const transactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    fee: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
