export interface IPortfolio {
  currency?: []
  business?: []
  realState?: []
  bonds?: []
  stocks?: []
  commodities?: []
  cryptocurrencies?: IOwnedCrypto[]
  other?: []
  total: number
  createdAt?: string
  updatedAt?: string
}

export interface ITransaction {
  _id?: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  notes?: string
  fee?: number
  time: Date
  createdAt?: string
  updatedAt?: string
}

export interface IOwnedCrypto {
  _id?: string
  name: string
  symbol: string
  slug: string
  logoUrl: string
  amount: number
  buyAvgPrice: number
  transactions: ITransaction[]
  price?: Quote
  createdAt?: string
  updatedAt?: string
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

export type Cryptos = Crypto[]

export type TransacionPayload = {
  type: 'buy' | 'sell'
  symbol: string
  amount: number | string
  price: number | string
  fee: number | string
  notes: string
  time: Date
}

export type EditTransactionPayload = TransacionPayload & {
  id: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  portfolio: IPortfolio
  createdAt: string
  updatedAt: string
}

export type RemoveTransactionPayload = {
  cryptoSymbol: string
  transactionId: string
}

export interface IUserSession {
  _id: string
  name: string
  email: string
  imageUrl: string
  token: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterUserCredentials = LoginCredentials & { name: string }
