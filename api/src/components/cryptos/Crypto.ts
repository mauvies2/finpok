import mongoose, { model, Schema } from 'mongoose'
import { ICrypto } from 'finpoq/types'

const CryptoSchema: Schema = new mongoose.Schema(
  {
    cmcId: {
      type: String,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    slug: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    max_supply: {
      type: Number,
    },
    circulating_supply: {
      type: Number,
    },
    total_supply: {
      type: Number,
    },
    rank: {
      type: Number,
    },
    quote: {
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export type CryptoModel = ICrypto & mongoose.Document

export default model<CryptoModel>('Crypto', CryptoSchema)
