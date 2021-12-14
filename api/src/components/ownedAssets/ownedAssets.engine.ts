import { IOwnedCrypto, ITransaction } from 'finpok-core/domain'
import { CryptoModel } from '../cryptos/Crypto'

export const formatNewOwnedCrypto = (crypto: CryptoModel, transaction: ITransaction): IOwnedCrypto => ({
  _id: crypto._id,
  name: crypto.name,
  symbol: crypto.symbol,
  slug: crypto.slug,
  amount: transaction.amount,
  buyAvgPrice: transaction.price,
  transactions: [transaction],
})
