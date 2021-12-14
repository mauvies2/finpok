import { Request, RequestHandler, Response } from 'express'
import Crypto from '../cryptos/Crypto'
import { UserModel } from '../users/User'
import { OwnedCryptoModel } from '../ownedAssets/OwnedCrypto'
import { formatTransaction } from '../transactions/Transaction'
import { addAssetOrTransaction, updateCryptoTransaction } from './portfolio.engine'
import { formatNewOwnedCrypto } from '../ownedAssets/ownedAssets.engine'
import {
  IPortfolio,
  ITransaction,
  TransacionPayload,
  RemoveTransactionPayload,
  IOwnedCrypto,
  EditTransactionPayload,
} from 'finpok-core/domain'

export const getPortfolio: RequestHandler = async (req: Request, res: Response) => {
  const { portfolio }: { portfolio: IPortfolio } = req.body.user
  const cryptos = await Crypto.find()
  let total = 0

  if (portfolio.cryptocurrencies) {
    total = portfolio.cryptocurrencies
      .map(ownedCrypto => {
        const crypto = cryptos?.find(crypto => ownedCrypto.symbol === crypto.symbol)
        if (crypto) return crypto.quote.USD.price * ownedCrypto.amount
      })
      .reduce((a = 0, b = 0) => a + b, 0)
  }

  portfolio.total = total

  console.log({ domain: 'Api', msg: 'Portoflio' })
  return res.status(200).json({ status: 200, msg: 'portfolio', data: portfolio })
}

export const addTransaction: RequestHandler = async (req: Request, res: Response) => {
  const { type, symbol, amount, price, notes, fee, time }: TransacionPayload = req.body
  const { user }: { user: UserModel } = req.body

  try {
    const crypto = await Crypto.findOne({ symbol })
    if (!crypto) return new Error('Cryptocurrency was not found')

    const transaction: ITransaction = formatTransaction(
      type,
      amount as number,
      price as number,
      notes,
      fee as number,
      time
    )
    const newOwnedCrypto: IOwnedCrypto = formatNewOwnedCrypto(crypto, transaction)

    addAssetOrTransaction(user, newOwnedCrypto, transaction)

    const successfullyUpdated = await user.save()

    if (successfullyUpdated) {
      console.log({ domain: 'Api', msg: 'Transaction was successfully added to portfolio' })
      return res.json({ status: 200, msg: 'Transaction was successfully added to portfolio' })
    }
  } catch (error) {
    console.error({ status: 500, error: error.message })
    return res.json({ status: 500, error: 'Server error' })
  }
}

export const updateTransaction: RequestHandler = async (req: Request, res: Response) => {
  const editTransactionPayload: EditTransactionPayload = req.body
  const { user }: { user: UserModel } = req.body

  try {
    updateCryptoTransaction(user, editTransactionPayload)

    const successfullyUpdated = await user.save()

    if (successfullyUpdated) {
      console.log({ domain: 'Api', msg: 'Transaction was successfully updated' })
      return res.json({ status: 200, msg: 'Transaction was successfully updated' })
    }
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}

export const removeTransaction: RequestHandler = async (req: Request, res: Response) => {
  const { cryptoSymbol, transactionId }: RemoveTransactionPayload = req.body
  const { user }: { user: UserModel } = req.body

  let amount = 0
  let price = 0

  try {
    user.portfolio.cryptocurrencies.forEach((cryptocurrency: OwnedCryptoModel) => {
      if (cryptocurrency.symbol == cryptoSymbol) {
        cryptocurrency.transactions.forEach(transaction => {
          if (transaction._id != transactionId) {
            amount += transaction.amount
            price += transaction.price
          }
        })

        cryptocurrency.transactions.pull(transactionId)

        cryptocurrency.amount = amount
        cryptocurrency.buyAvgPrice = price / cryptocurrency.transactions.length || 0
      }
    })

    await user.save()

    console.log({ domain: 'Api', msg: 'Transaction was successfully removed from portfolio' })
    return res.json({ status: 200, msg: 'Transaction was successfully removed from portfolio' })
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}

export const removeCrypto: RequestHandler = async (req: Request, res: Response) => {
  const { user }: { user: UserModel } = req.body
  try {
    await user.portfolio.cryptocurrencies.pull(req.params.id)
    await user.save()

    console.log({ domain: 'Api', msg: 'Cryptorrency was successfully removed from portfolio' })
    return res.json({ status: 200, msg: 'Cryptorrency was successfully removed from portfolio' })
  } catch (error) {
    console.error({ status: 500, error })
    return res.json({ status: 500, error })
  }
}
