import { formatNumber } from 'finpoq/utils/format-number'
import Button from 'finpoq/components/shared/button'
import FormInput from 'finpoq/components/shared/form-input/form-input'
import TabSelect from 'finpoq/components/shared/tab-select/tab-select'
import { FormEvent, useState, useEffect } from 'react'
import { EditTransactionPayload, TransacionPayload } from 'finpoq-core/types'
import { useEditTransaction } from 'finpoq/hooks/use-api'
import { useFormErrorHandleling } from 'finpoq/hooks/use-form-error-handleling'
import formatDate from 'finpoq/utils/format-date'
import { useModal } from 'finpoq/hooks/use-modal'
import { useGetCurrentTransaction } from 'finpoq/hooks/use-get-current-transaction'
import { useGetCurrentOwnedCrypto } from 'finpoq/hooks/use-get-current-owned-crypto'

const EditTransaction = () => {
  const [extraFields, setExtraFields] = useState({ date: false, fee: false, notes: false })
  const [transactionPayload, setTransactionPayload] = useState<EditTransactionPayload | null>(null)

  const currentTransaction = useGetCurrentTransaction()
  const { closeModal } = useModal()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const updateTransaction = useEditTransaction()
  const transactionDate = formatDate()

  const { formData, isFormValid } = useFormErrorHandleling([
    { name: 'amount', type: 'numeric', value: transactionPayload?.amount, required: true },
    { name: 'price', type: 'numeric', value: transactionPayload?.price, required: true },
    { name: 'fee', type: 'numeric', value: transactionPayload?.fee },
    { name: 'notes', type: 'text', value: transactionPayload?.notes },
  ])

  // methods
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (transactionPayload && isFormValid()) {
      updateTransaction.mutate(transactionPayload)
      closeModal(2)
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
        fee: '',
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
            onChange={(e) => setTransactionPayload({ ...transactionPayload, notes: e.target.value })}
          />
        )}

        <div className="hide-scrollbar mb-4 flex overflow-auto">
          <Button className="mr-2 cursor-default" btnType="light">
            {transactionDate}
          </Button>
          {!extraFields.fee && (
            <Button className="mr-2" btnType="light" onClick={() => addField('fee')}>
              Fee
            </Button>
          )}
          {!extraFields.notes && (
            <Button btnType="light" onClick={() => addField('notes')}>
              Notes
            </Button>
          )}
        </div>

        <div className="dark:bg-dark-modal dark:border-dark-line dark:text-dark-text items-center rounded-lg bg-gray-100 p-4 text-xs">
          <label className="text-sm font-semibold">Total spent</label>
          <div className="form-control relative ">
            <div placeholder="0.00" className="mt-2 h-8 pl-2 text-xl font-bold">
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
