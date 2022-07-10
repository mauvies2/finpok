import { ICrypto } from 'finpoq-core/types'
import { IPortfolio } from 'finpoq/types'
import { useMemo } from 'react'

const usePortfolioYield = (portfolio: IPortfolio | undefined, cryptos: ICrypto[] | undefined) => {
  return useMemo(() => {
    let transactionValue = 0
    let currentValue = 0

    if (portfolio && portfolio.cryptocurrencies && cryptos) {
      portfolio.cryptocurrencies.forEach((ownedCrypto) => {
        currentValue += Math.abs(ownedCrypto.amount) * ownedCrypto.price.current
        transactionValue += ownedCrypto.transactions.reduce(
          (total, transaction) =>
            total + transaction.amount * transaction.price * (transaction.type === 'sell' ? -1 : 1),
          0
        )
      })
    }
    const total = currentValue - transactionValue
    const totalPercentage = ((currentValue - transactionValue) / currentValue) * 100 || 0

    return { total, totalPercentage }
  }, [cryptos, portfolio])
}

export default usePortfolioYield
