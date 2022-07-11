import { RequestHandler, Response, Request } from 'express'

import Crypto from 'finpoq/components/cryptos/Crypto'
import { fetchAndSaveInDb, updateCryptosPrice } from 'finpoq/components/cryptos/cryptos.engine'

export const getCryptos: RequestHandler = async (req: Request, res: Response) => {
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

export const updateCryptos: RequestHandler = async (req: Request, res: Response) => {
  try {
    await updateCryptosPrice()

    return res.json({ status: 200, msg: 'Cryptocurrencies updated successfully' })
  } catch (error) {
    console.error({ status: 500, error: error.message })
    return res.json({ status: 500, error: 'Server error' })
  }
}

export const fetchAndSaveCryptos: RequestHandler = async (req: Request, res: Response) => {
  try {
    await fetchAndSaveInDb()

    return res.json({ status: 200, msg: 'Cryptocurrencies fetched successfully' })
  } catch (error) {
    console.error({ status: 500, error: error.message })
    return res.json({ status: 500, error: 'Server error' })
  }
}
