import { ITransaction } from 'finpoq-core/types'

export const formatTransaction = ({ type, amount, price, notes, fee, time }: ITransaction): ITransaction => ({
  type,
  amount: type === 'buy' ? amount : -amount,
  price,
  notes,
  fee,
  time,
})
