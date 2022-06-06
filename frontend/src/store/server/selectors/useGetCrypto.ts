import { useQueryClient } from 'react-query'
import { ICrypto } from 'finpoq-core/types'

const useGetCrypto = (symbol: string | undefined) => {
  const queryClient = useQueryClient()
  const cryptos = queryClient.getQueryData<ICrypto[]>(['cryptocurrencies'])

  if (cryptos && symbol) {
    return cryptos.find((crypto) => crypto.symbol === symbol.toUpperCase())
  }
}

export default useGetCrypto
