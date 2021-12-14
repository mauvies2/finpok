import { FC } from 'react'
import formatDate from 'finpok-core/utils/formatDate'
import formatNumber from 'finpok-core/utils/formatNumber'
import { useRemoveTransaction } from 'finpok/hooks/useApi'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'
import { useGetCurrentOwnedCrypto } from 'finpok/store/ui/UiSelectors'

const TransactionDetail: FC = () => {
  const { currentTransaction } = useUiState().portfolio
  const { openModal, closeModal } = useUiDispatch()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const removeTransaction = useRemoveTransaction()

  if (!currentTransaction || !currentOwnedCrypto) return null

  const handleRemoveTransaction = () => {
    removeTransaction.mutate({
      cryptoSymbol: currentOwnedCrypto.symbol,
      transactionId: currentTransaction._id || '',
    })
    closeModal()
  }

  const { type, createdAt, price, amount, fee, notes } = currentTransaction

  return (
    <div className="flex flex-col justify-between h-full p-2">
      <div>
        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Type</p>
          <p className="font-semibold text-sm capitalize">{type}</p>
        </div>

        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Date</p>
          {formatDate(createdAt)}
        </div>

        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Price per coin</p>
          {formatNumber(price, { symbol: '$', fractionDigits: 2 })}
        </div>

        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Quantity</p>
          <p>
            {amount}
            {}
          </p>
        </div>

        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Fees</p>
          {fee ? formatNumber(fee, { symbol: '$', fractionDigits: 2 }) : 'No fee'}
        </div>

        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Total spent</p>
          {formatNumber(price * amount, { symbol: '$', fractionDigits: 2 })}
        </div>

        <div className="border-b border-gray-100 py-5">
          <p>Notes</p>
          <p>{notes || '--'}</p>
        </div>
      </div>

      <div>
        <button
          className="btn btn-secondary w-full md:w-auto"
          onClick={() => openModal('edit-transaction')}
        >
          Edit transaction
        </button>

        <button
          className="btn bg-white border-none text-red-500 w-full mt-2 md:w-auto hover:bg-gray-50 hover:text-gray-800"
          onClick={handleRemoveTransaction}
        >
          Remove transaction
        </button>
      </div>
    </div>
  )
}

export default TransactionDetail
