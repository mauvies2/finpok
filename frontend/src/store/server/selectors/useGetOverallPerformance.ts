import { useQueryClient } from 'react-query'
import { useMemo } from 'react'
import { IPortfolio } from 'finpoq/types'

const useGetOverallPerformance = () => {
  const queryClient = useQueryClient()
  const portfolio = queryClient.getQueryData<IPortfolio>(['portfolio'])

  const balance = useMemo(() => {
    if (!portfolio) return 0

    return portfolio.cryptocurrencies.reduce(
      (total, ownedCrypto) =>
        total + ownedCrypto.amount * ownedCrypto.price.current - ownedCrypto.buyAvgPrice * ownedCrypto.amount,
      0
    )
  }, [portfolio])

  const balancePercentage = useMemo(() => {
    if (!portfolio) return 0

    return portfolio?.cryptocurrencies?.reduce(
      (total, ownedCrypto) =>
        total +
        ((ownedCrypto.amount * ownedCrypto.price.current - ownedCrypto.buyAvgPrice * ownedCrypto.amount) /
          (ownedCrypto.amount * ownedCrypto.price.current)) *
          100,
      0
    )
  }, [portfolio])

  return { balance, balancePercentage }
}

export default useGetOverallPerformance
