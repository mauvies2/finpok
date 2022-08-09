import { IOwnedCrypto } from 'finpoq-core/types'
import { Schema } from 'mongoose'
import { transactionSchema } from './transaction.schema'

export const ownedCryptoSchema = new Schema<IOwnedCrypto>(
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
    transactions: [transactionSchema],
  },
  {
    versionKey: false,
  }
)
