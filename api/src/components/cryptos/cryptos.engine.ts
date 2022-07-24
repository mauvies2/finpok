import Crypto from './model/crypto.model'
import { fetchCryptos } from '../../services/fetchApi'
import { formatCryptos } from './mappers/cryptos.mapper'

export const updateCryptosPrice = async (): Promise<void> => {
  const fetchedCryptos = await fetchCryptos()
  if (!fetchedCryptos) throw new Error('CMC Cryptos could not be fetched')

  const cryptos = await Crypto.find()
  if (!cryptos) throw new Error('DB Crypto collection could not be found')

  cryptos.forEach(async (crypto) => {
    fetchedCryptos.forEach(async (fetchedCrypto) => {
      if (crypto.cmcId === fetchedCrypto.id) {
        crypto.quote = fetchedCrypto.quote
        await crypto.save()
      }
    })
  })

  console.log({
    domain: 'Api',
    msg: 'Cryptocurrencies prices have been updated',
  })
}

export const fetchAndSaveInDb = async (): Promise<void> => {
  const fetchedCryptos = await fetchCryptos()
  if (!fetchedCryptos) throw new Error()

  await Crypto.deleteMany()
  console.log({ domain: 'Api', msg: 'Cryptocurrencies deleted' })

  const cryptosFormatted = await formatCryptos(fetchedCryptos)
  console.log({ domain: 'Api', msg: 'Cryptocurrencies formatted' })

  await Crypto.create(cryptosFormatted)
  console.log({ domain: 'Api', msg: 'Cryptocurrencies collection created and successfully stored in the database' })
}
