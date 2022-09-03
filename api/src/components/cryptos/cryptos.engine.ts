import Crypto from './model/crypto.model'
import { fetchCryptos, FetchedCrypto } from '../../services/fetchApi'
import { formatCryptos } from './mappers/cryptos.mapper'

export const updateCryptosPrice = async (): Promise<void> => {
  const fetchedCryptos = await fetchCryptos(200)
  const cryptos = await Crypto.find()

  const map = new Map<string, FetchedCrypto>()
  fetchedCryptos.forEach((fc) => {
    map.set(fc.symbol, fc)
  })

  cryptos.forEach(async (crypto) => {
    const matchedCrypto = map.get(crypto.symbol)
    if (matchedCrypto) {
      crypto.quote = matchedCrypto.quote
      await crypto.save()
    }
  }, [])

  console.log({
    domain: 'Api',
    msg: 'Cryptocurrencies prices have been updated',
  })
}

export const fetchAndSaveInDb = async (): Promise<void> => {
  const fetchedCryptos = await fetchCryptos()
  if (!fetchedCryptos) throw new Error()

  await Crypto.deleteMany()
  const cryptosFormatted = await formatCryptos(fetchedCryptos)
  await Crypto.create(cryptosFormatted)

  console.log({ domain: 'Api', msg: 'Cryptocurrencies collection created and successfully stored in the database' })
}
