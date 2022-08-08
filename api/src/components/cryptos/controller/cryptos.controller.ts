import { RequestHandler, Response, Request, Router } from 'express'

import Crypto from 'finpoq/components/cryptos/model/crypto.model'
import { fetchAndSaveInDb, updateCryptosPrice } from 'finpoq/components/cryptos/cryptos.engine'
import { ICryptoRepo } from '../repository/crypto.repository'

export default class CryptoController {
  public readonly router: Router = Router()

  constructor(private cryptoRepo: ICryptoRepo) {
    this.router.get('/', this.getCryptos)
    this.router.get('/update', this.updateCryptos)
    this.router.get('/fetch', this.fetchAndSaveCryptos)
  }

  private getCryptos: RequestHandler = async (req: Request, res: Response) => {
    const { limit, value } = req.query

    const limitAsNumber = Number(limit)
    const valueAsString = String(value)

    if (!limit || !Number.isInteger(limitAsNumber) || limitAsNumber < 0 || limitAsNumber > 1000) {
      throw new Error('Limit must be an integer between 0 and 1000')
    }

    try {
      const cryptos = await Crypto.find({
        ...(value && {
          $or: [{ symbol: { $regex: valueAsString.toUpperCase() } }, { slug: { $regex: valueAsString.toLowerCase() } }],
        }),
      })
        .limit(limitAsNumber)
        .sort({ rank: 1 })

      return res.json({ status: 200, msg: 'Cryptocurrencies fetched successfully', data: cryptos })
    } catch (error) {
      console.error({ status: 500, error: error.message })
      return res.json({ status: 500, error: 'Server error' })
    }
  }

  private updateCryptos: RequestHandler = async (req: Request, res: Response) => {
    try {
      await updateCryptosPrice()

      return res.json({ status: 200, msg: 'Cryptocurrencies updated successfully' })
    } catch (error) {
      console.error({ status: 500, error: error.message })
      return res.json({ status: 500, error: 'Server error' })
    }
  }

  private fetchAndSaveCryptos: RequestHandler = async (req: Request, res: Response) => {
    try {
      await fetchAndSaveInDb()

      return res.json({ status: 200, msg: 'Cryptocurrencies fetched successfully' })
    } catch (error) {
      console.error({ status: 500, error: error.message })
      return res.json({ status: 500, error: 'Server error' })
    }
  }
}
