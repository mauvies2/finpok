import { ICrypto } from 'finpoq-core/types'
import { request } from 'finpoq/services/http'
import { FetchedCrypto, FetchedCryptos } from '../../../services/fetchApi'

export const formatCryptos = async (cryptos: FetchedCryptos): Promise<ICrypto[]> => {
  return await Promise.all(
    cryptos.map(async (crypto: FetchedCrypto) => {
      const isLogoUrlValid = await request.isLogoUrlValid(crypto.id)

      return {
        cmcId: crypto.id,
        name: crypto.name === 'XRP' ? 'Ripple' : crypto.name,
        symbol: crypto.symbol,
        slug: crypto.slug,
        logoUrl: `https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/${
          isLogoUrlValid ? `coins/32x32/${crypto.id}.png` : 'coins/dummy/coin_32x32.png'
        }`,
        max_supply: crypto.max_supply,
        circulating_supply: crypto.circulating_supply,
        total_supply: crypto.total_supply,
        rank: crypto.cmc_rank,
        quote: crypto.quote,
      }
    })
  )
}
