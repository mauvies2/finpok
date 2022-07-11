import { ICrypto } from 'finpoq-core/types'
import { request } from './http'

export type FetchedCrypto = Omit<ICrypto, 'rank'> & { id: string } & {
  [name: string]: string | number | boolean | null
} & { cmc_rank: number }

export type FetchedCryptos = FetchedCrypto[]

export const fetchCrypto = (): Promise<Partial<ICrypto>> => request.getCrypto()
export const fetchCryptos = (): Promise<FetchedCryptos> => request.getCryptos()
export const fetchGlobalMetrics = (): Promise<Record<string, unknown>> => request.getGlobalMetrics()
