import { IPortfolio, ITransaction } from 'finpoq-core/types'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

export const useGetCurrentTransaction = (): ITransaction | undefined => {
  const queryClient = useQueryClient()
  const params = useParams()

  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  return portfolio?.cryptocurrencies
    ?.find((ownedCrypto) => ownedCrypto.symbol === params.symbol)
    ?.transactions.find((t) => t._id === params.id)
}
