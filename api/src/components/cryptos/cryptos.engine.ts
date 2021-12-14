import Crypto from './Crypto'
import { fetchCryptos } from '../../services/fetchApi'
// import { formatCryptos } from './cryptos.resource'
// import { request } from 'finpok/services/http'

export const updateCryptosPrice = async (): Promise<boolean> => {
  try {
    const fetchedCryptos = await fetchCryptos()
    if (!fetchedCryptos) throw new Error()

    // await Crypto.deleteMany()
    // const cryptosFormatted = formatCryptos(fetchedCryptos)
    // const cryptos = await Crypto.create(cryptosFormatted)

    const cryptos = await Crypto.find()

    cryptos.forEach(async (crypto) => {
      fetchedCryptos.forEach(async (fetchedCrypto) => {
        if (crypto.cmcId == fetchedCrypto.id) {
          crypto.quote = fetchedCrypto.quote
          await crypto.save()
        }
      })

      // try {
      //   const response = await request.isLogoUrlValid(crypto.cmcId)
      //   if(!response) throw Error
      //   crypto.logoUrl = `https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/coins/32x32/${crypto.cmcId}.png`
      // } catch (error) {
      //   crypto.logoUrl = 'https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/coins/dummy/coin_32x32.png'
      // } finally {
      //   await crypto.save()
      // }
    })

    console.log({
      domain: 'Api',
      msg: 'Cryptocurrencies has been fetched and stored in the database',
    })

    return true
  } catch (error) {
    throw Error(error)
  }
}
