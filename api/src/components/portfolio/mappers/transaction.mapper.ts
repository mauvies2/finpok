import { ITransaction } from 'finpoq-core/types'

export const formatTransaction = ({ _id, type, amount, price, notes, fee, time }: ITransaction): ITransaction => ({
  _id,
  type,
  amount: type === 'buy' ? amount : -amount,
  price,
  notes,
  fee,
  time,
})
