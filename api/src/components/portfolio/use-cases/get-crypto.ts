import { ICrypto } from 'finpoq-core/types'
import { ICryptoRepo } from 'finpoq/components/cryptos/repository/crypto.repository'

export default class GetCryptoUseCase {
  constructor(private cryptoRepo: ICryptoRepo) {}

  async get(symbol: string): Promise<ICrypto> {
    return await this.cryptoRepo.getCrypto(symbol)
  }
}
