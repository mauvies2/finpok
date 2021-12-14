import { RequestHandler, Response, Request } from 'express'
import Crypto from './Crypto'
import { updateCryptosPrice } from 'finpok/components/cryptos/cryptos.engine'

export const getCryptos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const cryptos = await Crypto.find()

    return res.json({
      status: 200,
      msg: 'Cryptocurrencies fetched successfully',
      data: cryptos,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const updateCryptos: RequestHandler = async (req: Request, res: Response) => {
  try {
    await updateCryptosPrice()

    return res.json({
      status: 200,
      msg: 'Cryptocurrencies fetched successfully',
    })
  } catch (error) {
    throw Error(error)
  }
}
