import {
  TransacionPayload,
  EditTransactionPayload,
  ICrypto,
  IPortfolio,
  RemoveTransactionPayload,
} from 'finpok-core/domain'
import { auth } from './AuthService'
import { api } from './http'

export const fetchCryptos = async () => await api.get<ICrypto[]>('/cryptocurrencies').then(res => res.data)

export const fetchPortfolio = async () => {
  const parsedUser = localStorage.getItem('user')
  const user = parsedUser && JSON.parse(parsedUser)

  return await api
    .get<IPortfolio>('/portfolio', {
      headers: {
        Authorization: user?.token || '',
      },
    })
    .then(res => res.data)
}

export const addNewTransaction = async (transaction: TransacionPayload) => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user?.token },
    })
    .then(data => data)
}

export const updateTransaction = async (transaction: EditTransactionPayload) => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .patch('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user?.token },
    })
    .then(data => data)
}

export const removeTransaction = async (transaction: RemoveTransactionPayload) => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency/remove', transaction, {
      headers: { authorization: user?.token },
    })
    .then(data => data)
}

export const removeAsset = async (id: string) => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .delete(`/portfolio/cryptocurrency/${id}`, {
      headers: { authorization: user?.token },
    })
    .then(data => data)
}
