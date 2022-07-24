import { ITransaction } from 'finpoq-core/types'
import { formatNumber } from 'finpoq/utils/formatNumber'
import formatDate from 'finpoq/utils/formatDate'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'

interface Props {
  transaction: ITransaction
  cryptoSymbol: string
}

const Transaction = ({ transaction, cryptoSymbol }: Props) => {
  const { selectCurrentTransaction, openModal } = useUiDispatch()

  const openTransactionDetail = () => {
    selectCurrentTransaction(transaction)
    openModal(`/portfolio/${cryptoSymbol}/transaction-detail`)
  }

  if (!transaction) return null

  const transactionStyle = transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'
  const transactionValue = transaction.amount * transaction.price
  const transactionDate = formatDate(transaction.createdAt)

  return (
    <li
      className="dark:border-dark-line flex cursor-pointer justify-between border-b py-5"
      onClick={openTransactionDetail}
    >
      <div className="flex flex-1 items-center">
        <img
          src={`https://s2.coinmarketcap.com/static/cloud/img/portfolio/${transaction.type}.svg?_=e3a8309`}
          className="mr-3"
          width="17"
          alt="Transaction type logo"
        />
        <div>
          <p className="font-semibold capitalize">{transaction.type}</p>
          <p className="text-xs">{transactionDate}</p>
        </div>
      </div>
      <div className="flex-1 justify-end text-right ">
        <p className="mb-1 font-semibold">
          {formatNumber(transactionValue, {
            symbol: '$',
            sign: transaction.type === 'buy',
            fractionDigits: 2,
          })}
        </p>
        <p className={`text-xs' ${transactionStyle}`}>
          {formatNumber(transaction.amount, {
            fractionDigits: 2,
            sign: transaction.type === 'buy',
            unit: cryptoSymbol,
          })}
        </p>
      </div>
    </li>
  )
}

export default Transaction
