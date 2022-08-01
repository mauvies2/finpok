import mongoose, { model, Schema } from 'mongoose'

export type Quote = {
  price: number
  volume_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
}
export interface ICrypto {
  _id?: string
  cmcId: string
  name: string
  symbol: string
  slug: string
  logoUrl: string
  max_supply: number
  circulating_supply: number
  total_supply: number
  rank: number
  quote: {
    USD: Quote
  }
  createdAt?: string
  updatedAt?: string
}

export type Cryptos = Crypto[]

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
