import { IOwnedCrypto, ITransaction } from 'finpoq-core/types'
import { IPortfolioRepo } from '../repository/portfolio.repository'

export default class UpdatePortfolioUseCase {
  constructor(private portfolioRepo: IPortfolioRepo) {}

  async addTransaction(userId: string, symbol: string, payload: IOwnedCrypto): Promise<void> {
    const ownedCrypto = await this.portfolioRepo.getOwnedCrypto(userId, symbol)

    if (!ownedCrypto) {
      await this.portfolioRepo.addOwnedCrypto(userId, payload)
    } else {
      await this.portfolioRepo.addTransaction(userId, symbol, payload.transactions.pop())
    }
  }

  async updateTransaction(userId: string, symbol: string, payload: ITransaction): Promise<void> {
    await this.portfolioRepo.updateTransaction(userId, symbol, payload)
  }

  async removeTransaction(userId: string, symbol: string, transactionId: string): Promise<void> {
    await this.portfolioRepo.removeTransaction(userId, symbol, transactionId)
  }

  async removeCrypto(userId: string, ownedCryptoId: string): Promise<void> {
    await this.portfolioRepo.removeCrypto(userId, ownedCryptoId)
  }

  // async removeCrypto(userId: string): Promise<void> {
  //   await this.portfolioRepo.removeCrypto(userId)
  // }

  // async removeTransaction(userId: string): Promise<void> {
  //   await this.portfolioRepo.updatePortfolio(userId)
  // }
}
