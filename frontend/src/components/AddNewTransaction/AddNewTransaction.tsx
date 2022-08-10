import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatNumber } from 'finpoq/utils/formatNumber'
import formatDate from 'finpoq/utils/formatDate'
import Button from 'finpoq/components/Shared/Button'
import FormInput from 'finpoq/components/Shared/FormInput/FormInput'
import TabSelect from 'finpoq/components/Shared/TabSelect/TabSelect'
import { useAddTransaction } from 'finpoq/hooks/useApi'
import { useUiDispatch, useUiState } from 'finpoq/store/ui/UiProvider'
import { TransacionPayload } from 'finpoq-core/types'
import { useFormErrorHandleling } from 'finpoq/hooks/useFormErrorHandleling'

interface Props {
  goBack?: number
}

const AddNewTransaction = ({ goBack = 1 }: Props) => {
  const [showExtraFields, setShowExtraFields] = useState({ date: false, fee: false, notes: false })
  const [transactionPayload, setTransactionPayload] = useState<TransacionPayload>({
    type: 'buy',
    symbol: '',
    amount: '',
    price: '',
    notes: '',
    fee: '',
    time: new Date(),
  })

  const { clearSelectedCrypto, closeModal } = useUiDispatch()
  const { selectedCrypto } = useUiState().portfolio

  const addTransaction = useAddTransaction()
  const navigate = useNavigate()
  const transactionDate = formatDate()

  const { formData, validateForm } = useFormErrorHandleling([
    { name: 'amount', type: 'numeric', value: transactionPayload.amount, required: true },
    { name: 'price', type: 'numeric', value: transactionPayload.price, required: true },
    { name: 'fee', type: 'numeric', value: transactionPayload.fee },
    { name: 'notes', type: 'text', value: transactionPayload.notes },
  ])

  // methods
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isFormValid = validateForm()

    if (isFormValid) {
      addTransaction.mutate(transactionPayload)
      clearSelectedCrypto()
      closeModal(goBack)
    }
  }

  const handleNumber = (value: string) => {
    return isNaN(parseFloat(value)) ? '' : parseFloat(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionPayload({
      ...transactionPayload,
      [e.target.name]: e.target.type === 'text' ? e.target.value : handleNumber(e.target.value),
    })
  }

  const selectTransactionType = (type: TransacionPayload['type']) => {
    setTransactionPayload({ ...transactionPayload, type })
  }

  const addExtraField = (field: string) => {
    setShowExtraFields({ ...showExtraFields, [field]: true })
  }

  const transactionTotal = (Number(transactionPayload.price) || 0) * (Number(transactionPayload.amount) || 0)

  useEffect(() => {
    if (selectedCrypto && !transactionPayload.price && !transactionPayload.symbol) {
      setTransactionPayload({
        ...transactionPayload,
        price: parseFloat(selectedCrypto.price.toFixed(2)),
        symbol: selectedCrypto.symbol,
      })
    }
  }, [selectedCrypto, transactionPayload])

  if (!selectedCrypto) return null

  return (
    <form className="flex min-h-full flex-col justify-between" onSubmit={handleSubmit}>
      <div className="flex-1">
        <TabSelect tabs={['buy', 'sell']} value={transactionPayload.type} onClick={selectTransactionType} />

        <div
          className="select dark:bg-dark-modal dark:border-dark-line dark:text-dark-text mb-4 h-10 w-full max-w-xs cursor-pointer rounded-full border border-gray-200 dark:border"
          onClick={() => navigate(-1)}
        >
          <div className="my-1 flex cursor-pointer items-center  rounded-lg py-2  pl-3">
            <div>
              <img src={selectedCrypto.logoUrl} className="mr-3" width="17" alt="logo" />
            </div>
            <div className="mr-3 text-sm font-bold">{selectedCrypto.name}</div>
            <div className="text-xs font-bold text-gray-400">{selectedCrypto.symbol}</div>
          </div>
        </div>

        <FormInput
          id="transaction-amount"
          name="amount"
          label="Quantity"
          labelOnError="Quantity is required"
          placeholder="0.00"
          min="0.00"
          step=".00001"
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

        {showExtraFields.fee && (
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

        {showExtraFields.notes && (
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

        <div className="hide-scrollbar mb-4 flex overflow-auto">
          <Button btnType="light" height="s">
            {transactionDate}
          </Button>
          {!showExtraFields.fee && (
            <Button className="ml-2" btnType="light" height="s" onClick={() => addExtraField('fee')}>
              Fee
            </Button>
          )}
          {!showExtraFields.notes && (
            <Button className="ml-2" btnType="light" height="s" onClick={() => addExtraField('notes')}>
              Notes
            </Button>
          )}
        </div>

        <div className="dark:bg-dark-modal dark:border-dark-line dark:text-dark-text items-center rounded-lg bg-gray-100 p-4 text-xs dark:border">
          <label className="text-sm font-semibold">Total spent</label>
          <div className="form-control relative">
            <div placeholder="0.00" className="mt-2 h-8  pl-6 text-xl font-bold">
              {formatNumber(transactionTotal)}
            </div>
            <p className="absolute  top-[10px] left-2 text-xl font-bold">$</p>
          </div>
        </div>
      </div>

      <Button className="mt-6 w-full md:w-auto" type="submit">
        Add transaction
      </Button>
    </form>
  )
}

export default AddNewTransaction
