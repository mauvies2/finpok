import { useQueryClient } from 'react-query'
import { ICrypto, IOwnedCrypto, IPortfolio } from 'finpoq-core/types'
import { useParams } from 'react-router-dom'

export const useGetCurrentOwnedCrypto = (): IOwnedCrypto | undefined => {
  const queryClient = useQueryClient()
  const params = useParams()

  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  if (!portfolio) return

  return portfolio.cryptocurrencies?.find((ownedCrypto) => ownedCrypto.symbol === params.symbol)
}

export const useGetCurrentCrypto = (): ICrypto | undefined => {
  const queryClient = useQueryClient()
  const params = useParams()

  const cryptocurrencies = queryClient.getQueryData<ICrypto[]>(['cryptocurrencies'])

  if (!cryptocurrencies) return

  return cryptocurrencies.find((crypto) => crypto.symbol === params.symbol)
}
