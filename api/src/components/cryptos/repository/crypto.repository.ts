import { ICrypto } from 'finpoq-core/types'
import Crypto from '../model/crypto.model'

export interface ICryptoRepo {
  getCryptos(): Promise<ICrypto[]>
  getCrypto(symbol: string): Promise<ICrypto>
}

export default class CryptoRepo implements ICryptoRepo {
  // eslint-disable-next-line class-methods-use-this
  async getCryptos(): Promise<ICrypto[]> {
    return []
  }

  // eslint-disable-next-line class-methods-use-this
  async getCrypto(symbol: string): Promise<ICrypto> {
    return await Crypto.findOne({ symbol })
  }
}
