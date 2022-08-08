import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://finpoq.com' : 'http://localhost:5000',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      // eslint-disable-next-line
      location.reload()
    }
    throw error
  }
)
