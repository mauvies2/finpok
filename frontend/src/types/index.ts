export interface IPortfolio {
  total: number
  cryptocurrencies: IOwnedCrypto[]
}

export interface IOwnedCrypto {
  _id: string
  name: string
  symbol: string
  slug: string
  logoUrl: string
  amount: number
  buyAvgPrice: number
  transactions: ITransaction[]
  price: {
    current: number
    change24h: number
  }
}

export interface ITransaction {
  _id: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  notes?: string
  fee?: number
  time: Date
}

export type Quote = {
  price: number
  volume_24h: number
  market_cap: number
}
