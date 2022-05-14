import { formatNumber } from 'finpok-core/utils/formatNumber'
import Button from 'finpok/components/Shared/Button'
import FormInput from 'finpok/components/Shared/FormInput/FormInput'
import TabSelect from 'finpok/components/Shared/TabSelect/TabSelect'
import { FormEvent, useState, useEffect } from 'react'
import { EditTransactionPayload, TransacionPayload } from 'finpok-core/domain'
import { useEditTransaction } from 'finpok/hooks/useApi'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'
import { useGetCurrentOwnedCrypto } from 'finpok/store/ui/UiSelectors'
import { useFormErrorHandleling } from '../../hooks/useFormErrorHandleling'
import formatDate from 'finpok-core/utils/formatDate'

const EditTransaction = () => {
  const [extraFields, setExtraFields] = useState({ date: false, fee: false, notes: false })
  const [transactionPayload, setTransactionPayload] = useState<EditTransactionPayload | null>(null)

  const { currentTransaction } = useUiState().portfolio
  const { clearSelectedCrypto, closeModal } = useUiDispatch()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const updateTransaction = useEditTransaction()
  const transactionDate = formatDate()

  const { formData, validateForm } = useFormErrorHandleling([
    { name: 'amount', type: 'numeric', value: transactionPayload?.amount, required: true },
    { name: 'price', type: 'numeric', value: transactionPayload?.price, required: true },
    { name: 'fee', type: 'numeric', value: transactionPayload?.fee },
    { name: 'notes', type: 'text', value: transactionPayload?.notes },
  ])

  // methods
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormvalid = validateForm()

    if (transactionPayload) {
      if (isFormvalid) {
        updateTransaction.mutate(transactionPayload)
        clearSelectedCrypto()
        closeModal(2)
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

  const addField = (field: string) => {
    setExtraFields({ ...extraFields, [field]: true })
  }

  const selectTransactionType = (type: TransacionPayload['type']) => {
    if (transactionPayload) {
      setTransactionPayload({ ...transactionPayload, type })
    }
  }

  useEffect(() => {
    if (currentOwnedCrypto && currentTransaction && currentTransaction._id && !transactionPayload) {
      setTransactionPayload({
        id: currentTransaction._id,
        symbol: currentOwnedCrypto.symbol,
        amount: Math.abs(currentTransaction.amount),
        price: currentTransaction.price,
        type: currentTransaction.type,
        notes: '',
        fee: 0,
        time: new Date(),
      })
    }
  }, [currentOwnedCrypto, currentTransaction, transactionPayload])

  if (!currentOwnedCrypto || !transactionPayload || !currentTransaction) return null

  return (
    <form className="flex h-full flex-col justify-between overflow-y-scroll" onSubmit={handleSubmit}>
      <div>
        <TabSelect tabs={['buy', 'sell']} value={transactionPayload?.type} onClick={selectTransactionType} />
        <FormInput
          id="transaction-amount"
          name="amount"
          label="Quantity"
          labelOnError="Quantity is required"
          placeholder="0.00"
          min="0.00"
          step=".01"
          value={transactionPayload.amount}
          shouldShowError={formData.amount.shouldShow}
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
          shouldShowError={formData.price.shouldShow}
          onChange={handleChange}
        />

        {extraFields.fee && (
          <FormInput
            id="transaction-fee"
            name="fee"
            inputClass="pl-6"
            label="Transaction fee"
            labelOnError="Fee is required"
            placeholder="0.00"
            symbol="$"
            min="0.00"
            step=".01"
            value={transactionPayload.fee}
            shouldShowError={formData.fee.shouldShow}
            onChange={handleChange}
          />
        )}

        {extraFields.notes && (
          <FormInput
            id="transaction-notes"
            name="notes"
            type="text"
            label="Notes"
            labelOnError="Notes is required"
            placeholder="Write your note here"
            value={transactionPayload.notes}
            shouldShowError={formData.notes.shouldShow}
            onChange={handleChange}
          />
        )}

        <div className="mb-4 flex">
          {!extraFields.fee && (
            <Button className="mr-2" btnType="light" onClick={() => addField('fee')}>
              Fee
            </Button>
          )}
          {!extraFields.notes && (
            <Button className="mr-2" btnType="light" onClick={() => addField('notes')}>
              Notes
            </Button>
          )}
          <Button className="cursor-default" btnType="light">
            {transactionDate}
          </Button>
        </div>

        <div className="items-center rounded-lg bg-gray-100 p-4 text-xs">
          <label className="text-sm font-semibold">Total spent</label>
          <div className="form-control relative ">
            <div placeholder="0.00" className="mt-2 h-8 bg-gray-100 pl-2 text-xl font-bold">
              {formatNumber(currentTransaction.price * currentTransaction.amount, { symbol: '$' })}
            </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <Button className="mt-8 mb-4 w-full md:w-auto" type="submit">
          Edit transaction
        </Button>
      </div>
    </form>
  )
}

export default EditTransaction
