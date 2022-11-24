import formatDate from 'finpoq/utils/format-date'
import { formatNumber } from 'finpoq/utils/format-number'
import { useRemoveTransaction } from 'finpoq/hooks/use-api'
import Button from '../shared/button'
import { useModal } from 'finpoq/hooks/use-modal'
import { useGetCurrentTransaction } from 'finpoq/hooks/use-get-current-transaction'
import { useGetCurrentOwnedCrypto } from 'finpoq/hooks/use-get-current-owned-crypto'

const TransactionDetail = () => {
  const { openModal, closeModal } = useModal()
  const currentTransaction = useGetCurrentTransaction()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const removeTransaction = useRemoveTransaction()

  if (!currentTransaction || !currentOwnedCrypto) return null

  const handaleEditTransaction = () => {
    openModal(`/portfolio/${currentOwnedCrypto.symbol}/transaction-detail/${currentTransaction._id}/edit`)
  }

  const handleRemoveTransaction = () => {
    removeTransaction.mutate({
      cryptoSymbol: currentOwnedCrypto.symbol,
      transactionId: currentTransaction._id || '',
    })
    closeModal(1)
  }

  const { type, createdAt, price, amount, fee, notes } = currentTransaction

  return (
    <div className="flex h-full flex-col justify-between text-sm">
      <div>
        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Type</p>
          <p className="text-sm capitalize">{type}</p>
        </div>

        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Date</p>
          {formatDate(createdAt)}
        </div>

        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Price per coin</p>
          {formatNumber(price, { symbol: '$', fractionDigits: 2 })}
        </div>

        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Quantity</p>
          <p>
            {amount}
            {}
          </p>
        </div>

        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Fees</p>
          {fee ? formatNumber(fee, { symbol: '$', fractionDigits: 2 }) : 'No fee'}
        </div>

        <div className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
          <p>Total spent</p>
          {formatNumber(price * amount, { symbol: '$', fractionDigits: 2 })}
        </div>

        <div className="mb-6 py-5">
          <p>Notes</p>
          <p>{notes || '--'}</p>
        </div>
      </div>

      <div className="w-full text-right">
        <Button className="w-full md:w-auto" btnType="secondary" onClick={handaleEditTransaction}>
          Edit transaction
        </Button>

        <Button className="mt-3 w-full md:mt-0 md:ml-2 md:w-auto" onClick={handleRemoveTransaction}>
          Remove transaction
        </Button>
      </div>
    </div>
  )
}

export default TransactionDetail
