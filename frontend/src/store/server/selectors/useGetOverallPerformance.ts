import { useQueryClient } from 'react-query'
import { ICrypto, IPortfolio } from 'finpoq-core/domain'
import { useMemo } from 'react'

const useGetOverallPerformance = () => {
  const queryClient = useQueryClient()
  const cryptos = queryClient.getQueryData<ICrypto[]>(['cryptocurrencies'])
  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  const balance = useMemo(
    () =>
      portfolio?.cryptocurrencies?.reduce((total, ownedCrypto) => {
        const crypto = cryptos?.find((coin) => coin.symbol === ownedCrypto.symbol)
        if (!crypto) return 0

        return total + ownedCrypto.amount * crypto.quote.USD.price - ownedCrypto.buyAvgPrice * ownedCrypto.amount
      }, 0),
    [cryptos, portfolio?.cryptocurrencies]
  )

  const balancePercentage = useMemo(
    () =>
      portfolio?.cryptocurrencies?.reduce((total, ownedCrypto) => {
        const crypto = cryptos?.find((coin) => coin.symbol === ownedCrypto.symbol)
        if (!crypto) return 0

        return (
          total +
          ((ownedCrypto.amount * crypto.quote.USD.price - ownedCrypto.buyAvgPrice * ownedCrypto.amount) /
            (ownedCrypto.amount * crypto.quote.USD.price)) *
            100
        )
      }, 0),
    [cryptos, portfolio?.cryptocurrencies]
  )

  return { balance, balancePercentage }
}

export default useGetOverallPerformance
