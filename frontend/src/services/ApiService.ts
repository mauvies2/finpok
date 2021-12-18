import { AxiosResponse } from 'axios'
import {
  TransacionPayload,
  EditTransactionPayload,
  ICrypto,
  IPortfolio,
  RemoveTransactionPayload,
  RegisterUserCredentials,
} from 'finpok-core/domain'
import { auth } from './AuthService'
import { api } from './http'

export const register = async (credentials: RegisterUserCredentials) =>
  await api.post('/auth/register', credentials).then((res) => res.data)

export const fetchCryptos = async (): Promise<ICrypto[]> => await api.get('/cryptocurrencies').then((res) => res.data)

export const fetchPortfolio = async (): Promise<IPortfolio> => {
  const parsedUser = localStorage.getItem('user')
  const user = parsedUser && JSON.parse(parsedUser)

  return await api
    .get<IPortfolio>('/portfolio', {
      headers: {
        Authorization: user?.token || '',
      },
    })
    .then((res) => res.data)
}

export const addNewTransaction = async (transaction: TransacionPayload): Promise<TransacionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user?.token },
    })
    .then((res) => res.data)
}

export const updateTransaction = async (transaction: EditTransactionPayload): Promise<EditTransactionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .patch('/portfolio/cryptocurrency', transaction, {
      headers: { authorization: user?.token },
    })
    .then((res) => res.data)
}

export const removeTransaction = async (transaction: RemoveTransactionPayload): Promise<RemoveTransactionPayload> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .post('/portfolio/cryptocurrency/remove', transaction, {
      headers: { authorization: user?.token },
    })
    .then((res) => res.data)
}

export const removeAsset = async (id: string): Promise<never> => {
  const user = auth._user()
  if (!user) throw new Error()

  return await api
    .delete(`/portfolio/cryptocurrency/${id}`, {
      headers: { authorization: user?.token },
    })
    .then((res) => res.data)
}

// const authRequest = async <T>(
//   method: 'get' | 'post' | 'put' | 'delete',
//   url: string,
//   body?: Record<string, unknown> | string
// ): Promise<T> => {
//   const user = auth._user()
//   if (!user) throw new Error()

//   const headers = {
//     headers: { authorization: user?.token },
//   }

//   let response: AxiosResponse

//   try {
//     switch (method) {
//       case 'get':
//         response = await api.get(url, headers)
//         break

//       case 'post':
//         response = await api.post(url, body, headers)
//         break

//       case 'put':
//         response = await api.put(url, body, headers)
//         break

//       case 'delete':
//         response = await api.delete(url, headers)
//     }

//     if (!response) throw new Error()

//     return response.data
//   } catch (error) {
//     return error
//   }
// }
