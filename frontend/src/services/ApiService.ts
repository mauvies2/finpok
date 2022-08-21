import { AxiosRequestConfig } from 'axios'
import {
  TransacionPayload,
  EditTransactionPayload,
  ICrypto,
  RemoveTransactionPayload,
  RegisterUserCredentials,
} from 'finpoq-core/types'
import { IPortfolio } from 'finpoq/types'
import { auth } from './AuthService'
import { api } from './http'

export const register = async (credentials: RegisterUserCredentials) =>
  await api.post('/auth/register', credentials).then((res) => res.data)

export const fetchCryptos = async (
  queryParams?: { limit?: number; value?: string },
  options?: AxiosRequestConfig
): Promise<ICrypto[]> =>
  await api
    .get(`/cryptocurrencies?limit=${queryParams?.limit}&value=${queryParams?.value}`, options)
    .then((res) => res.data)

export const fetchPortfolio = async (): Promise<IPortfolio> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .get<IPortfolio>('/portfolio', {
      headers: { Authorization: user.token },
    })
    .then((res) => res.data)
}

export const addNewTransaction = async (transaction: TransacionPayload): Promise<TransacionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user.token },
    })
    .then((res) => res.data)
}

export const updateTransaction = async (transaction: EditTransactionPayload): Promise<EditTransactionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .patch('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user.token },
    })
    .then((res) => res.data)
}

export const removeTransaction = async (transaction: RemoveTransactionPayload): Promise<RemoveTransactionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency/remove', transaction, {
      headers: { authorization: user.token },
    })
    .then((res) => res.data)
}

export const removeAsset = async (id: string): Promise<never> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .delete(`/portfolio/cryptocurrency/${id}`, {
      headers: { authorization: user.token },
    })
    .then((res) => res.data)
}
