import { ICrypto, IPortfolio } from 'finpok-core/domain'
import { useMemo } from 'react'

const usePortfolioYield = (portfolio: IPortfolio | undefined, cryptos: ICrypto[] | undefined) => {
  return useMemo(() => {
    let transactionValue = 0
    let currentValue = 0

    if (portfolio && cryptos) {
      portfolio.cryptocurrencies?.forEach((ownedCrypto) => {
        const crypto = cryptos.find((crypto) => crypto.symbol === ownedCrypto.symbol)
        if (crypto) {
          currentValue += ownedCrypto.amount * crypto.quote.USD.price
          transactionValue += ownedCrypto.transactions.reduce(
            (total, transaction) =>
              total + transaction.amount * transaction.price * (transaction.type === 'sell' ? -1 : 1),
            0
          )
        }
      })
    }
    const total = currentValue - transactionValue
    const totalPercentage = ((currentValue - transactionValue) / currentValue) * 100

    return { total, totalPercentage }
  }, [cryptos, portfolio])
}

export default usePortfolioYield
