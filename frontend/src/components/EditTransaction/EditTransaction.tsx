import formatDate from 'finpok-core/utils/formatDate'
import formatNumber from 'finpok-core/utils/formatNumber'
import FormInput from '../Shared/FormInput/FormInput'
import { FormEvent, useState, FC } from 'react'
import { EditTransactionPayload } from 'finpok-core/domain'
import { useEditTransaction } from 'finpok/hooks/useApi'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'
import { useGetCurrentOwnedCrypto } from 'finpok/store/ui/UiSelectors'
import { useFormErrorHandleling } from '../../hooks/useFormErrorHandleling'

const EditTransaction: FC = () => {
  const { currentTransaction } = useUiState().portfolio
  const { closeModal, clearSelectedAsset } = useUiDispatch()

  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const updateTransaction = useEditTransaction()

  // local state
  const [transactionPayload, setTransactionPayload] = useState<EditTransactionPayload | null>(
    () => {
      if (currentOwnedCrypto && currentTransaction) {
        return {
          id: currentTransaction._id,
          symbol: currentOwnedCrypto.symbol,
          amount: currentTransaction.amount,
          price: currentTransaction.price,
          notes: '',
          fee: 0,
          time: new Date(),
        }
      }
      return null
    }
  )

  const { error, errorValidation } = useFormErrorHandleling({
    field1: { name: 'amount', type: 'numeric', value: transactionPayload?.amount },
    field2: { name: 'price', type: 'numeric', value: transactionPayload?.price },
  })

  // methods
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    errorValidation()

    if (transactionPayload) {
      if (!error.amount.isValid && !error.price.isValid) {
        updateTransaction.mutate(transactionPayload)
        closeModal()
        clearSelectedAsset()
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (transactionPayload) {
      setTransactionPayload({
        ...transactionPayload,
        [e.target.name]: isNaN(parseFloat(e.target.value)) ? '' : parseFloat(e.target.value),
      })
    }
  }

  if (!currentOwnedCrypto || !transactionPayload || !currentTransaction) return null

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div>
        <FormInput
          id="transaction-amount"
          name="amount"
          label="Quantity"
          labelOnError="Quantity is required"
          placeholder="0.00"
          min="0.00"
          step=".01"
          value={transactionPayload.amount}
          shouldShowError={error.amount.shouldShow}
          onChange={handleChange}
          autoFocus
        />

        <FormInput
          id="transaction-price"
          name="price"
          inputClass="pl-6"
          label="Price per coin"
          labelOnError="Price is required"
          placeholder="0.00"
          symbol="$"
          min="0.00"
          step=".01"
          value={transactionPayload.price}
          shouldShowError={error.price.shouldShow}
          onChange={handleChange}
        />
        <div className="flex mb-4">
          <div className="bg-gray-200 rounded-lg flex items-center p-2 text-gray-500 text-xs font-semibold">
            {formatDate(currentTransaction?.createdAt)}
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center p-2 text-gray-500 text-xs font-semibold ml-2">
            Fee
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center p-2 text-gray-500 text-xs font-semibold ml-2">
            Notes
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg items-center p-4 text-xs">
          <label className="text-sm font-semibold">Total spent</label>
          <div className="form-control relative ">
            <div
              placeholder="0.00"
              className="input mt-2 border bg-gray-100  pl-2 text-xl font-bold h-8"
            >
              {formatNumber(currentTransaction.price * currentTransaction.amount, { symbol: '$' })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-secondary w-full md:w-auto">Edit transaction</button>
      </div>
    </form>
  )
}

export default EditTransaction
