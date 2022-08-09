/* eslint-disable class-methods-use-this */
import { IOwnedCrypto } from 'finpoq-core/types'
import { ICryptoRepo } from 'finpoq/components/cryptos/repository/crypto.repository'
import { PortfolioResource } from '../use-cases/get-portfolio-resource'

type PortfolioParams = {
  cryptocurrencies?: IOwnedCrypto[]
}

export default class Portfolio {
  cryptocurrencies?: IOwnedCrypto[]

  constructor(portfolioParams: PortfolioParams) {
    this.cryptocurrencies = portfolioParams.cryptocurrencies
  }

  async getMainResource(getCrypto: ICryptoRepo['getCrypto']): Promise<PortfolioResource> {
    if (!this.cryptocurrencies) {
      return {
        total: 0,
        cryptocurrencies: [],
      }
    }
    const cryptocurrencies = await Promise.all(
      this.cryptocurrencies?.map(async (ownedCrypto) => {
        const crypto = await getCrypto(ownedCrypto.symbol)

        return {
          _id: ownedCrypto._id,
          name: crypto.name,
          symbol: crypto.symbol,
          slug: crypto.slug,
          logoUrl: crypto.logoUrl,
          amount: this.getAmount(ownedCrypto),
          buyAvgPrice: this.getBuyAvgPrice(ownedCrypto),
          transactions: ownedCrypto.transactions,
          price: {
            current: crypto.quote.USD.price,
            change24h: crypto.quote.USD.percent_change_24h,
          },
        }
      })
    )

    const total = this.getTotal(cryptocurrencies)

    return { total, cryptocurrencies }
  }

  private getTotal(cryptocurrencies: PortfolioResource['cryptocurrencies']): number {
    return cryptocurrencies.reduce(
      (acc, cryptocurrency) => acc + cryptocurrency.amount * cryptocurrency.price.current,
      0
    )
  }

  private getAmount(ownedCrypto: IOwnedCrypto): number {
    return ownedCrypto.transactions.reduce(
      (acc, transaction) => (transaction.type === 'sell' ? acc - transaction.amount : acc + transaction.amount),
      0
    )
  }

  private getBuyAvgPrice(ownedCrypto: IOwnedCrypto): number {
    return (
      ownedCrypto.transactions.reduce((acc, transaction) => acc + transaction.price, 0) /
      ownedCrypto.transactions.length
    )
  }
}
