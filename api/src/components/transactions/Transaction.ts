import mongoose, { Schema } from 'mongoose'
import { ITransaction } from 'finpoq/types'

export const transactionSchema: Schema = new mongoose.Schema(
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

export const formatTransaction = (
  type: ITransaction['type'],
  amount: ITransaction['amount'],
  price: ITransaction['price'],
  notes: ITransaction['notes'],
  fee: ITransaction['fee'],
  time: ITransaction['time']
): ITransaction => ({ type, amount: type === 'buy' ? amount : -amount, price, notes, fee, time })
