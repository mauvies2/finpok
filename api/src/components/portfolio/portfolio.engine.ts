import { EditTransactionPayload, IOwnedCrypto, ITransaction, IUser } from 'finpoq/types'

export const addAssetOrTransaction = (user: IUser, newCryptoToOwned: IOwnedCrypto, transaction: ITransaction): void => {
  let owned = false
  const hasOwnedCryptos = user.portfolio.cryptocurrencies

  // don't have cryptocurrencies yet
  if (!hasOwnedCryptos) {
    user.portfolio.cryptocurrencies = [newCryptoToOwned]
    owned = true
  }

  // check if it's already owned and just add transaction
  if (!owned) {
    user.portfolio.cryptocurrencies.forEach((ownedCrypto: IOwnedCrypto) => {
      if (ownedCrypto.symbol === newCryptoToOwned.symbol) {
        owned = true
        ownedCrypto.amount += transaction.amount
        ownedCrypto.buyAvgPrice =
          (ownedCrypto.buyAvgPrice * ownedCrypto.transactions.length + transaction.price) /
          (ownedCrypto.transactions.length + 1)
        ownedCrypto.transactions.push(transaction)
      }
    })
  }

  // add new crypto and transaction
  if (!owned) {
    user.portfolio.cryptocurrencies.push(newCryptoToOwned)
  }
}

export const updateCryptoTransaction = (user: IUser, editTransactionPayload: EditTransactionPayload): void => {
  const { id, symbol, amount, fee, notes, price, time, type } = editTransactionPayload
  const correctAmount = type === 'buy' ? amount : -amount

  user.portfolio.cryptocurrencies.forEach((ownedCrypto: IOwnedCrypto) => {
    if (ownedCrypto.symbol === symbol) {
      let newAmount = 0
      let transactionPrice = 0

      ownedCrypto.transactions.forEach((transaction: ITransaction) => {
        const transactionId = transaction._id.toString()

        if (transactionId === id) {
          transactionPrice += Number(price)
          newAmount += Number(correctAmount)

          transaction.amount = Number(correctAmount)
          transaction.price = Number(price)
          transaction.fee = Number(fee)
          transaction.notes = notes
          transaction.time = time
          transaction.type = type
        } else {
          transactionPrice += transaction.price
          newAmount += transaction.amount
        }
      })

      ownedCrypto.amount = newAmount
      ownedCrypto.buyAvgPrice = transactionPrice / ownedCrypto.transactions.length || 0
    }
  })
}
