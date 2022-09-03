import { ICrypto } from 'finpoq-core/types'
import { request } from './http'

export type FetchedCrypto = Omit<ICrypto, 'rank'> & { id: string } & {
  [name: string]: string | number | boolean | null
} & { cmc_rank: number }

export type FetchedCryptos = FetchedCrypto[]

export const fetchCryptos = (limit?: number): Promise<FetchedCryptos> => request.getCryptos(limit)

export const fetchGlobalMetrics = (): Promise<Record<string, unknown>> => request.getGlobalMetrics()
