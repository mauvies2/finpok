import { useQueryClient } from 'react-query'
import { ICrypto, IOwnedCrypto, IPortfolio } from 'finpok-core/domain'
import { useUiState } from './UiProvider'

export const useGetCurrentOwnedCrypto = (): IOwnedCrypto | undefined => {
  const queryClient = useQueryClient()

  const { currentOwnedCrypto } = useUiState().portfolio
  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  if (!portfolio || !currentOwnedCrypto) return

  return portfolio.cryptocurrencies.find((ownedCrypto) => ownedCrypto.symbol === currentOwnedCrypto)
}

export const useGetCurrentCrypto = (): ICrypto | undefined => {
  const queryClient = useQueryClient()

  const { currentCrypto } = useUiState().portfolio
  const cryptocurrencies = queryClient.getQueryData<ICrypto[]>(['cryptocurrencies'])

  if (!cryptocurrencies || !currentCrypto) return

  return cryptocurrencies.find((crypto) => crypto.symbol === currentCrypto)
}
