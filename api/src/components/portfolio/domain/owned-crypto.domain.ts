import { ITransaction, Quote } from 'finpoq-core/types'

type OwnedCryptoParams = {
  _id?: string
  name: string
  symbol: string
  slug: string
  logoUrl: string
  transactions: ITransaction[]
  price: Quote
}

export default class OwnedCrypto {
  _id: string

  name: string

  symbol: string

  slug: string

  logoUrl: string

  transactions: ITransaction[]

  price: Quote

  constructor(ownedCryptoParams: OwnedCryptoParams) {
    this._id = ownedCryptoParams._id
    this.name = ownedCryptoParams.name
    this.symbol = ownedCryptoParams.symbol
    this.slug = ownedCryptoParams.slug
    this.logoUrl = ownedCryptoParams.logoUrl
  }
}
