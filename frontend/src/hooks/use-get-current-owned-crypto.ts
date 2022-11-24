import { IOwnedCrypto, IPortfolio } from 'finpoq/types'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

export const useGetCurrentOwnedCrypto = (): IOwnedCrypto | undefined => {
  const queryClient = useQueryClient()
  const params = useParams()
  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  return portfolio?.cryptocurrencies?.find((ownedCrypto) => ownedCrypto.symbol === params.symbol)
}
