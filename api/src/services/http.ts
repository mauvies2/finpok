import axios, { AxiosResponse } from 'axios'
import config from '../config/default'
import { FetchedCrypto, FetchedCryptos } from './fetchApi'

const cryptoInstance = axios.create({
  baseURL: config.api.cryptocurrencies.url,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'X-CMC_PRO_API_KEY': config.api.cryptocurrencies.key,
    'Accept-Encoding': 'deflate, gzip',
  },
})

export const request = {
  getCrypto: async (): Promise<FetchedCrypto> => {
    try {
      const response: AxiosResponse = await cryptoInstance.get('/cryptocurrency/listings/latest')
      return response.data.data.slice(0, 1)
    } catch (error) {
      throw new Error(`The API request failed: ${error}`)
    }
  },

  getCryptos: async (): Promise<FetchedCryptos> => {
    try {
      const response: AxiosResponse = await cryptoInstance.get(
        '/cryptocurrency/listings/latest?limit=1000&sort=market_cap_strict'
      )
      return response.data.data
    } catch (error) {
      throw new Error(`The API request failed: ${error}`)
    }
  },

  getCryptosIdMap: async (): Promise<Record<string, unknown>[]> => {
    try {
      const response: AxiosResponse = await cryptoInstance.get('/cryptocurrency/map')
      return response.data.data
    } catch (error) {
      throw new Error(`The API request failed: ${error}`)
    }
  },

  getGlobalMetrics: async (): Promise<Record<string, unknown>> => {
    try {
      const response: AxiosResponse = await cryptoInstance.get('/global-metrics/quotes/latest')
      return response.data.data
    } catch (error) {
      throw new Error(`The API request failed: ${error}`)
    }
  },

  isLogoUrlValid: async (id: string): Promise<boolean> => {
    try {
      await axios.get(`https://raw.githubusercontent.com/coinwink/cryptocurrency-logos/master/coins/32x32/${id}.png`)
      return true
    } catch (error) {
      return false
    }
  },
}
