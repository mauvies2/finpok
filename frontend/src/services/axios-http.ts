import axios from 'axios'

export const axiosHttp = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://finpoq.com/api' : 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
  },
})

axiosHttp.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // eslint-disable-next-line
      location.reload()
    }
    throw error
  }
)
