/* eslint-disable class-methods-use-this */
import { IOwnedCrypto, ITransaction } from 'finpoq-core/types'
import User from 'finpoq/components/users/user.model'
import OwnedCrypto from '../domain/owned-crypto.domain'
import Portfolio from '../domain/portfolio.domain'

export interface IPortfolioRepo {
  getPortfolio(userId: string): Promise<Portfolio>
  getOwnedCrypto(userId: string, symbol: string): Promise<OwnedCrypto | null>
  addOwnedCrypto(userId: string, payload: IOwnedCrypto): Promise<void>
  addTransaction(userId: string, symbol: string, payload: ITransaction): Promise<void>
  updateTransaction(userId: string, symbol: string, payload: ITransaction): Promise<void>
  removeTransaction(userId: string, symbol: string, transactionId: string): Promise<void>
  removeCrypto(userId: string, ownedCryptoId: string): Promise<void>
}

export default class PortfolioRepo implements IPortfolioRepo {
  async getPortfolio(userId: string): Promise<Portfolio> {
    const user = await User.findOne({ _id: userId })
    return new Portfolio({ cryptocurrencies: user.portfolio.cryptocurrencies })
  }

  async getOwnedCrypto(userId: string, symbol: string): Promise<OwnedCrypto | null> {
    const user = await User.findOne({ _id: userId })
    const ownedCrypto = user.portfolio.cryptocurrencies.find((crypto) => crypto.symbol === symbol)
    if (!ownedCrypto) return null
    return new OwnedCrypto({ ...ownedCrypto, price: ownedCrypto.price })
  }

  async addOwnedCrypto(userId: string, payload: IOwnedCrypto): Promise<void> {
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $push: { 'portfolio.cryptocurrencies': payload } }
    )
  }

  async addTransaction(userId: string, symbol: string, payload: ITransaction): Promise<void> {
    await User.findOneAndUpdate(
      {
        _id: userId,
        'portfolio.cryptocurrencies.symbol': symbol,
      },
      { $push: { 'portfolio.cryptocurrencies.$.transactions': payload } }
    )
  }

  async updateTransaction(userId: string, symbol: string, payload: ITransaction): Promise<void> {
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].amount': payload.amount,
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].price': payload.price,
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].type': payload.type,
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].notes': payload.notes,
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].fee': payload.fee,
          'portfolio.cryptocurrencies.$[symbol].transactions.$[transaction].time': payload.time,
        },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { arrayFilters: [{ 'symbol.symbol': symbol }, { 'transaction._id': payload.id }] }
    )
  }

  async removeTransaction(userId: string, symbol: string, transactionId: string): Promise<void> {
    await User.findOneAndUpdate(
      {
        _id: userId,
        'portfolio.cryptocurrencies.symbol': symbol,
      },
      {
        $pull: {
          'portfolio.cryptocurrencies.$.transactions': { _id: transactionId },
        },
      }
    )
  }

  async removeCrypto(userId: string, ownedCryptoId: string): Promise<void> {
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          'portfolio.cryptocurrencies': { _id: ownedCryptoId },
        },
      }
    )
  }
}
