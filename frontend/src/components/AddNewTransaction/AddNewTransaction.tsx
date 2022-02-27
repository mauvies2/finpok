import { FC, FormEvent, useEffect, useState } from 'react'
import formatNumber from 'finpok-core/utils/formatNumber'
import formatDate from 'finpok-core/utils/formatDate'
import Button from '../Shared/Button'
import FormInput from '../Shared/FormInput/FormInput'
import TabSelect from '../Shared/TabSelect/TabSelect'
import { useAddTransaction } from 'finpok/hooks/useApi'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import { TransacionPayload } from 'finpok-core/domain'
import { useGetCurrentCrypto } from 'finpok/store/ui/UiSelectors'
import { useFormErrorHandleling } from '../../hooks/useFormErrorHandleling'

const AddNewTransaction: FC = () => {
  // computed
  const { clearSelectedCrypto, closeModal } = useUiDispatch()
  const addTransaction = useAddTransaction()
  const currentCrypto = useGetCurrentCrypto()
  const transactionDate = formatDate()

  // local state
  const [extraFields, setExtraFields] = useState({ date: false, fee: false, notes: false })
  const [transactionPayload, setTransactionPayload] = useState<TransacionPayload>({
    type: 'buy',
    symbol: '',
    amount: '',
    price: '',
    notes: '',
    fee: '',
    time: new Date(),
  })

  useEffect(() => {
    if (currentCrypto && !transactionPayload.price && !transactionPayload.symbol) {
      setTransactionPayload({
        ...transactionPayload,
        price: parseFloat(currentCrypto.quote.USD.price.toFixed(2)),
        symbol: currentCrypto.symbol,
      })
    }
  }, [currentCrypto, transactionPayload])

  const { formData, errorValidation } = useFormErrorHandleling([
    { name: 'amount', type: 'numeric', value: transactionPayload.amount, required: true },
    { name: 'price', type: 'numeric', value: transactionPayload.price, required: true },
    { name: 'fee', type: 'numeric', value: transactionPayload.fee },
    { name: 'notes', type: 'text', value: transactionPayload.notes },
  ])

  if (!currentCrypto || !transactionPayload) return null

  // methods
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    errorValidation()

    if (!formData.amount.isValid && !formData.price.isValid) {
      addTransaction.mutate(transactionPayload)
      closeModal()
      clearSelectedCrypto()
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

  const addField = (field: string) => {
    setExtraFields({ ...extraFields, [field]: true })
  }

  const transactionTotal = ((transactionPayload.price as number) || 0) * ((transactionPayload.amount as number) || 0)

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div className="flex-1">
        <TabSelect tabs={['buy', 'sell']} value={transactionPayload.type} onClick={selectTransactionType} />

        <div className="select select-bordered w-full max-w-xs mb-4 cursor-pointer">
          <div className="flex py-2 pl-3 items-center  rounded-lg my-1  cursor-pointer">
            <div>
              <img src={currentCrypto.logoUrl} className="mr-3" width="17" alt="logo" />
            </div>
            <div className="mr-3 font-bold text-sm">{currentCrypto.name === 'XRP' ? 'Ripple' : currentCrypto.name}</div>
            <div className="text-xs font-bold text-gray-400">{currentCrypto.symbol}</div>
          </div>
        </div>

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

        <div className="flex mb-4">
          <Button className="btn btn-light">{transactionDate}</Button>
          {!extraFields.fee && (
            <Button className="btn btn-light ml-2" onClick={() => addField('fee')}>
              Fee
            </Button>
          )}
          {!extraFields.notes && (
            <Button className="btn btn-light ml-2" onClick={() => addField('notes')}>
              Notes
            </Button>
          )}
        </div>

        <div className="bg-gray-100 rounded-lg items-center p-4 text-xs">
          <label className="text-sm font-semibold">Total spent</label>
          <div className="form-control relative ">
            <div placeholder="0.00" className="input mt-2 border bg-gray-100  pl-6 text-xl font-bold h-8">
              {formatNumber(transactionTotal)}
            </div>
            <p className="absolute  top-[10px] left-2 text-xl font-bold">$</p>
          </div>
        </div>
      </div>

      <Button className="btn btn-secondary w-full md:w-auto mt-8" height="l">
        Add transaction
      </Button>
    </form>
  )
}

export default AddNewTransaction
