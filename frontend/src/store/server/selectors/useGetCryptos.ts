import { useQueryClient } from 'react-query'
import { ICrypto } from 'finpoq-core/domain'

const useGetCryptos = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<ICrypto[]>('cryptocurrencies')
}

export default useGetCryptos
