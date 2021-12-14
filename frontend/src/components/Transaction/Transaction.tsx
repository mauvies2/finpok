import { FC } from 'react'
import classNames from 'classnames'
import { ITransaction } from 'finpok-core/domain'
import formatNumber from 'finpok-core/utils/formatNumber'
import formatDate from 'finpok-core/utils/formatDate'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'

interface TransactionProps {
  transaction: ITransaction
  cryptoSymbol: string
}

const Transaction: FC<TransactionProps> = ({ transaction, cryptoSymbol }) => {
  const { openModal, selectCurrentTransaction } = useUiDispatch()
  const {
    portfolio: { currentOwnedCrypto },
  } = useUiState()

  const openTransactionDetails = () => {
    selectCurrentTransaction(transaction)
    openModal('transaction-detail')
  }

  const transactionStyle = transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'

  if (!transaction || !transaction.createdAt) return null

  const transactionValue = transaction.amount * transaction.price
  const transactionDate = formatDate(transaction.createdAt)

  return (
    <div className='flex border-b py-5 justify-between cursor-pointer' onClick={openTransactionDetails}>
      <div className='flex-1 flex items-center'>
        <img
          src={`https://s2.coinmarketcap.com/static/cloud/img/portfolio/${transaction.type}.svg?_=e3a8309`}
          className='mr-3'
          width='17'
        />
        <div>
          <p className='font-semibold capitalize'>{transaction.type}</p>
          <p className='text-xs'>{transactionDate}</p>
        </div>
      </div>
      <div className='flex-1 text-right justify-end '>
        <p className='font-semibold mb-1'>
          {formatNumber(transactionValue, {
            symbol: '$',
            sign: transaction.type === 'buy',
            fractionDigits: 2,
          })}
        </p>
        <p className={classNames('text-xs', transactionStyle)}>
          {formatNumber(transaction.amount, {
            fractionDigits: 2,
            sign: transaction.type === 'buy',
            unit: cryptoSymbol,
          })}
        </p>
      </div>
    </div>
  )
}

export default Transaction
