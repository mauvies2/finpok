import { RequestHandler, Router, Request, Response } from 'express'
import { IOwnedCrypto, ITransaction, RemoveTransactionPayload } from 'finpoq-core/types'
import { ICryptoRepo } from '../../cryptos/repository/crypto.repository'
import { formatNewOwnedCrypto } from '../mappers/owned-crypto.mapper'
import { formatTransaction } from '../mappers/transaction.mapper'
import { IPortfolioRepo } from '../repository/portfolio.repository'
import GetCryptoUseCase from '../use-cases/get-crypto'
import GetPortfolioResourceUseCase from '../use-cases/get-portfolio-resource'
import UpdatePortfolioUseCase from '../use-cases/update-portfolio'

export default class PortfolioController {
  public readonly router: Router = Router()

  constructor(private portfolioRepo: IPortfolioRepo, private cryptoRepo: ICryptoRepo) {
    this.router.get('/', this.getPortfolio)
    this.router.post('/cryptocurrency', this.addTransaction)
    this.router.patch('/cryptocurrency', this.updateTransaction)
    this.router.delete('/cryptocurrency/:id', this.removeCrypto)
    this.router.post('/cryptocurrency/remove', this.removeTransaction)
  }

  private getPortfolio: RequestHandler = async (req: Request, res: Response) => {
    const userId: string = req.body.userId

    try {
      const getPortfolioResourceUseCase = new GetPortfolioResourceUseCase(this.portfolioRepo, this.cryptoRepo)
      const portfolioResource = await getPortfolioResourceUseCase.getPortfolioResource(userId)

      console.log({ domain: 'Api', msg: 'Portfolio' })
      return res.status(200).json({ status: 200, msg: 'portfolio', data: portfolioResource })
    } catch (error) {
      console.error({ domain: 'Api', error })
      return res.status(200).json({ status: 500, msg: 'Server error' })
    }
  }

  private addTransaction: RequestHandler = async (req: Request, res: Response) => {
    const transaction: ITransaction = req.body
    const symbol: string = req.body.symbol
    const userId: string = req.body.userId

    try {
      const getCryptoUseCase = new GetCryptoUseCase(this.cryptoRepo)
      const crypto = await getCryptoUseCase.get(symbol)

      const transactionFormatted = formatTransaction(transaction)
      const newOwnedCrypto: IOwnedCrypto = formatNewOwnedCrypto(crypto, transactionFormatted)

      const updatePortfolioUseCase = new UpdatePortfolioUseCase(this.portfolioRepo)
      await updatePortfolioUseCase.addTransaction(userId, symbol, newOwnedCrypto)

      console.log({ domain: 'Api', msg: 'Transaction was successfully added to portfolio' })
      return res.json({ status: 200, msg: 'Transaction was successfully added to portfolio' })
    } catch (error) {
      console.error({ status: 500, error: error.message })
      return res.json({ status: 500, error: 'Server error' })
    }
  }

  updateTransaction: RequestHandler = async (req: Request, res: Response) => {
    const transactionPayload: ITransaction = req.body
    const symbol: string = req.body.symbol
    const userId: string = req.body.userId

    try {
      const updatePortfolioUseCase = new UpdatePortfolioUseCase(this.portfolioRepo)
      await updatePortfolioUseCase.updateTransaction(userId, symbol, transactionPayload)

      console.log({ domain: 'Api', msg: 'Transaction was successfully updated' })
      return res.json({ status: 200, msg: 'Transaction was successfully updated' })
    } catch (error) {
      console.error({ status: 500, error })
      return res.json({ status: 500, error: 'Server error' })
    }
  }

  removeTransaction: RequestHandler = async (req: Request, res: Response) => {
    const { cryptoSymbol: symbol, transactionId }: RemoveTransactionPayload = req.body
    const userId: string = req.body.userId

    try {
      const updatePortfolioUseCase = new UpdatePortfolioUseCase(this.portfolioRepo)
      await updatePortfolioUseCase.removeTransaction(userId, symbol, transactionId)

      console.log({ domain: 'Api', msg: 'Transaction was successfully updated' })
      return res.json({ status: 200, msg: 'Transaction was successfully updated' })
    } catch (error) {
      console.error({ status: 500, error })
      return res.json({ status: 500, error: 'Server error' })
    }
  }

  removeCrypto: RequestHandler = async (req: Request, res: Response) => {
    const userId: string = req.body.userId

    try {
      const updatePortfolioUseCase = new UpdatePortfolioUseCase(this.portfolioRepo)
      await updatePortfolioUseCase.removeCrypto(userId, req.params.id)

      console.log({ domain: 'Api', msg: 'Cryptorrency was successfully removed from portfolio' })
      return res.json({ status: 200, msg: 'Cryptorrency was successfully removed from portfolio' })
    } catch (error) {
      console.error({ status: 500, error })
      return res.json({ status: 500, error: 'Server error' })
    }
  }
}
