import { ICrypto } from 'finpoq-core/types'
import { FetchedCrypto, FetchedCryptos } from '../../services/fetchApi'

export const formatCryptos = (cryptos: FetchedCryptos): ICrypto[] =>
  cryptos.map((crypto: FetchedCrypto) => ({
    cmcId: crypto.id,
    name: crypto.name,
    symbol: crypto.symbol,
    slug: crypto.slug,
    logoUrl: `https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/coins/32x32/${crypto.id}.png`,
    max_supply: crypto.max_supply,
    circulating_supply: crypto.circulating_supply,
    total_supply: crypto.total_supply,
    rank: crypto.rank,
    quote: crypto.quote,
  }))

export const formatCrypto = (crypto: FetchedCrypto): ICrypto => ({
  cmcId: crypto.id,
  name: crypto.name,
  symbol: crypto.symbol,
  slug: crypto.slug,
  logoUrl: `https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/coins/32x32/${crypto.id}.png`,
  max_supply: crypto.max_supply,
  circulating_supply: crypto.circulating_supply,
  total_supply: crypto.total_supply,
  rank: crypto.rank,
  quote: crypto.quote,
})
