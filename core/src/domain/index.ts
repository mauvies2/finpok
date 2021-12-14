export interface IPortfolio {
  currency: []
  business: []
  realState: []
  bonds: []
  stocks: []
  commodities: []
  cryptocurrencies: IOwnedCrypto[]
  other: []
  total: number
  createdAt?: string
  updatedAt?: string
}

export interface ITransaction {
  _id?: string
  type: 'buy' | 'sell' | 'transfer'
  amount: number
  price: number
  notes?: string
  fee?: number
  time: Date
  createdAt?: string
  updatedAt?: string
}

export interface IOwnedCrypto {
  _id: string
  name: string
  symbol: string
  slug: string
  amount: number
  buyAvgPrice: number
  transactions: ITransaction[]
  price?: number
  holdingsPercent?: number
  createdAt?: string
  updatedAt?: string
}

export interface ICrypto {
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
  type: 'buy' | 'sell' | 'transfer'
  symbol: string
  amount: number | string
  price: number | string
  fee: number | string
  notes: string
  time: Date
}

export type EditTransactionPayload = Omit<TransacionPayload, 'type'> & {
  id: ITransaction['_id']
  symbol: ICrypto['symbol']
  amount: ITransaction['amount']
  price: ITransaction['price']
  notes: ITransaction['notes']
  fee: number
  time: Date
}

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
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
  token: string
}

export type LoginUserCredentials = {
  email: string
  password: string
}

export type RegisterUserCredentials = {
  email: string
  password: string
  name: string
}
