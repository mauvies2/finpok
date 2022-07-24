import { ITransaction } from 'finpoq-core/types'
import { ICryptoRepo } from 'finpoq/components/cryptos/repository/crypto.repository'
import { IPortfolioRepo } from '../repository/portfolio.repository'

export interface PortfolioResource {
  total: number
  cryptocurrencies: {
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
  }[]
}

export default class GetPortfolioResourceUseCase {
  constructor(private portfolioRepo: IPortfolioRepo, private cryptoRepo: ICryptoRepo) {}

  async getPortfolioResource(userId: string): Promise<PortfolioResource> {
    const portfolio = await this.portfolioRepo.getPortfolio(userId)
    const portfolioResource = await portfolio.getMainResource(this.cryptoRepo.getCrypto)
    return portfolioResource
  }
}
