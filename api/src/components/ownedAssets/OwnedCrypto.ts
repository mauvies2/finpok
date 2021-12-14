import mongoose, { Schema } from 'mongoose'
import { IOwnedCrypto, ITransaction } from 'finpok-core/domain'
import { transactionSchema } from '../transactions/Transaction'

export const ownedCryptoSchema: Schema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    buyAvgPrice: {
      type: Number,
      required: true,
    },
    transactions: [transactionSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

interface SingleTransaction {
  transactions: mongoose.Types.Array<ITransaction>
}

export type OwnedCryptoModel = IOwnedCrypto & mongoose.Document & Omit<IOwnedCrypto, 'transactions'> & SingleTransaction
