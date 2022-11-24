/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  addNewTransaction,
  updateTransaction,
  fetchPortfolio,
  removeAsset,
  removeTransaction,
  fetchCryptos,
} from 'finpoq/services/portfolio-service'
import { ICrypto, TransacionPayload, EditTransactionPayload, RemoveTransactionPayload } from 'finpoq-core/types'
import { IPortfolio } from 'finpoq/types'

export const useCryptos = (queryParams?: { limit?: number; value?: string }) =>
  useQuery<ICrypto[]>(['cryptocurrencies'], () => fetchCryptos(queryParams))

export const usePortfolio = () => useQuery<IPortfolio>(['portfolio'], fetchPortfolio)

export const useAddTransaction = () => {
  const queryCache = useQueryClient()
  return useMutation((transaction: TransacionPayload) => addNewTransaction(transaction), {
    onSuccess: () => {
      queryCache.invalidateQueries('portfolio')
    },
  })
}

export const useEditTransaction = () => {
  const queryCache = useQueryClient()
  return useMutation((transaction: EditTransactionPayload) => updateTransaction(transaction), {
    onSuccess: () => {
      queryCache.invalidateQueries('portfolio')
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
      queryCache.invalidateQueries('portfolio')
    },
  })
}
