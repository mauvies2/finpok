import mongoose, { Schema } from 'mongoose'
import { IPortfolio } from 'finpok-core/domain'
import { OwnedCryptoModel, ownedCryptoSchema } from '../ownedAssets/OwnedCrypto'

export const portfolioSchema: Schema = new mongoose.Schema(
  {
    currency: {
      type: Array,
      default: undefined,
    },
    business: {
      type: Array,
      default: undefined,
    },
    realState: {
      type: Array,
      default: undefined,
    },
    bonds: {
      type: Array,
      default: undefined,
    },
    stocks: {
      type: Array,
      default: undefined,
    },
    commodities: {
      type: Array,
      default: undefined,
    },
    cryptocurrencies: {
      type: [ownedCryptoSchema],
      default: undefined,
    },
    other: {
      type: Array,
      default: undefined,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
)

export type PortfolioModel = IPortfolio & mongoose.Document & Cryptocurrencies & Omit<IPortfolio, 'cryptocurrencies'>

interface Cryptocurrencies {
  cryptocurrencies: mongoose.Types.Array<OwnedCryptoModel>
}
