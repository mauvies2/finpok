/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  addNewTransaction,
  updateTransaction,
  fetchCryptos,
  fetchPortfolio,
  removeAsset,
  removeTransaction,
} from 'finpok/services/ApiService'
import {
  IPortfolio,
  ICrypto,
  TransacionPayload,
  EditTransactionPayload,
  RemoveTransactionPayload,
} from 'finpok-core/domain'

export const useCryptos = () => useQuery<ICrypto[], Error>('cryptocurrencies', fetchCryptos)

export const usePortfolio = () => useQuery<IPortfolio, Error>('portfolio', fetchPortfolio)

export const useAddTransaction = () => {
  const queryCache = useQueryClient()

  return useMutation((transaction: TransacionPayload) => addNewTransaction(transaction), {
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
