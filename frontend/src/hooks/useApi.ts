/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  addNewTransaction,
  updateTransaction,
  fetchCryptos,
  fetchPortfolio,
  removeAsset,
  removeTransaction,
} from 'finpoq/services/ApiService'
import {
  IPortfolio,
  ICrypto,
  TransacionPayload,
  EditTransactionPayload,
  RemoveTransactionPayload,
  IOwnedCrypto,
} from 'finpoq/types'

export const useCryptos = () => useQuery<ICrypto[], Error>('cryptocurrencies', fetchCryptos)

export const usePortfolio = () => useQuery<IPortfolio, Error>('portfolio', fetchPortfolio)

export const useAddTransaction = () => {
  const queryCache = useQueryClient()

  return useMutation((transaction: TransacionPayload) => addNewTransaction(transaction), {
    onMutate: (payload) => {
      const portfolio = queryCache.getQueryData<IPortfolio>('portfolio')
      const cryptos = queryCache.getQueryData<ICrypto[]>('cryptocurrencies')
      const crypto = cryptos?.find((crypto) => crypto.symbol === payload.symbol)

      if (!portfolio || !crypto || !cryptos) return

      const { type, amount, price, notes, fee, time } = payload as {
        type: 'buy' | 'sell'
        amount: number
        price: number
        notes: string
        fee: number
        time: Date
      }

      const transaction = {
        _id: Math.random().toString(),
        type,
        amount: type === 'buy' ? amount : -amount,
        price,
        notes,
        fee,
        time,
        createdAt: new Date().toString(),
      }

      const newOwnedCrypto = {
        _id: crypto._id,
        name: crypto.name,
        symbol: crypto.symbol,
        slug: crypto.slug,
        amount: transaction.amount,
        buyAvgPrice: transaction.price,
        transactions: [transaction],
      }

      const portfolioUpdated = { ...portfolio }

      let owned = false
      const ownedCryptos = portfolioUpdated.cryptocurrencies
      // don't have cryptocurrencies yet
      if (!ownedCryptos) {
        portfolioUpdated.cryptocurrencies = [newOwnedCrypto]
        owned = true
      }

      // check if it's already owned and just add transaction
      if (ownedCryptos) {
        if (!owned) {
          ownedCryptos.forEach((ownedCrypto: IOwnedCrypto) => {
            if (ownedCrypto.symbol === newOwnedCrypto.symbol) {
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
          ownedCryptos.push(newOwnedCrypto)
        }
      }

      let total = 0

      if (ownedCryptos) {
        total = ownedCryptos
          .map((ownedCrypto) => {
            const crypto = cryptos.find((crypto) => ownedCrypto.symbol === crypto.symbol)
            if (!crypto) return 0
            return crypto.quote.USD.price * ownedCrypto.amount
          })
          .reduce((a = 0, b = 0) => a + b, 0)
      }
      portfolioUpdated.total = total

      queryCache.setQueryData('portfolio', () => portfolioUpdated)

      return () => queryCache.setQueryData('portfolio', portfolio)
    },
    onSuccess: () => {
      queryCache.invalidateQueries('portfolio')
      // queryCache.invalidateQueries('cryptocurrencies')
    },
  })
}

export const useEditTransaction = () => {
  const queryCache = useQueryClient()
  return useMutation((transaction: EditTransactionPayload) => updateTransaction(transaction), {
    onSuccess: () => {
      queryCache.invalidateQueries('portfolio')
      // queryCache.invalidateQueries('cryptocurrencies')
    },
  })
}

export const useRemoveTransaction = () => {
  const queryCache = useQueryClient()
  return useMutation((transaction: RemoveTransactionPayload) => removeTransaction(transaction), {
    onSuccess: () => {
      queryCache.invalidateQueries('portfolio')
    },
  })
}

export const useRemoveAsset = () => {
  const queryCache = useQueryClient()

  return useMutation((id: string) => removeAsset(id), {
    onSuccess: () => {
      // queryCache.invalidateQueries('cryptocurrencies')
      queryCache.invalidateQueries('portfolio')
    },
  })
}
