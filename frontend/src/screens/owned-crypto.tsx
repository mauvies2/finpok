import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUiDispatch } from 'finpoq/store/ui/ui-provider'
import { useRemoveAsset } from 'finpoq/hooks/use-api'
import { formatNumber } from 'finpoq/utils/format-number'
import useGetPortfolio from 'finpoq/store/server/selectors/use-get-portfolio'
import Button from 'finpoq/components/shared/button'
import Transaction from 'finpoq/components/transaction'
import { useGetCurrentOwnedCrypto } from 'finpoq/store/ui/ui-selectors'
import useClickOutside from 'finpoq/hooks/use-click-outside'
import Add from 'finpoq/assets/icons/add'

const OwnedCryptoDetail = () => {
  const removeAssetOption = useRef<HTMLDivElement | null>(null)
  const [isRemoveAssetPromptOpen, setIsRemoveAssetPromptOpen] = useState(false)

  const portfolio = useGetPortfolio()
  const removeAsset = useRemoveAsset()
  const navigate = useNavigate()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const { selectCrypto, openModal } = useUiDispatch()
  useClickOutside(removeAssetOption, () => setIsRemoveAssetPromptOpen(false))

  // methods
  const handleRemoveAsset = () => {
    if (currentOwnedCrypto) {
      removeAsset.mutate(currentOwnedCrypto._id || '')
    }
    navigate(-1)
  }

  const handleAddTransaction = () => {
    if (currentOwnedCrypto) {
      selectCrypto({
        symbol: currentOwnedCrypto.symbol,
        name: currentOwnedCrypto.name,
        logoUrl: currentOwnedCrypto.logoUrl,
        price: currentOwnedCrypto.price.current,
      })
    }
    openModal(`/portfolio/${currentOwnedCrypto?.symbol}/transaction-operation`)
  }

  if (!currentOwnedCrypto || !portfolio) return null

  return (
    <>
      <section className="mt-8 flex justify-between">
        <Button btnType="light" icon="<-" onClick={() => navigate(-1)}>
          Back
        </Button>
        <div
          className="relative"
          onClick={() => setIsRemoveAssetPromptOpen(!isRemoveAssetPromptOpen)}
          ref={removeAssetOption}
        >
          <Button btnType="light" icon={'...'}>
            More
          </Button>
          {isRemoveAssetPromptOpen && (
            <div
              className="menu dark:bg-dark-modal dark:border-dark-line dark:text-dark-text dropdown-content bg-base-100 min-w-40 absolute top-12 right-8 cursor-pointer rounded-lg p-3 text-center text-sm font-extralight text-red-500 shadow hover:bg-gray-50 dark:border"
              onClick={handleRemoveAsset}
            >
              <p>Remove asset</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="mt-8 text-xs">
          {currentOwnedCrypto.name} {`(${currentOwnedCrypto.symbol})`} Balance oo
        </p>
      </section>

      <section className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src={currentOwnedCrypto.logoUrl} className="mr-3 w-10 flex-shrink-0" alt="logox" />
          {
            <p className="text-3xl font-bold ">
              {formatNumber(currentOwnedCrypto.amount * currentOwnedCrypto.price.current, {
                fractionDigits: 2,
                symbol: '$',
                sign: currentOwnedCrypto.amount > 0,
                noPositiveSign: true,
              })}
            </p>
          }
        </div>
      </section>

      <section className="mt-10 text-sm">
        <ul>
          <li className="dark:border-dark-line flex justify-between border-b border-gray-100 py-5">
            <p>Quantity</p>
            <p className="text-sm font-semibold">
              {currentOwnedCrypto.amount} {currentOwnedCrypto.symbol}
            </p>
          </li>
          <li className="flex justify-between border-gray-100 py-5">
            <p>Avg. buy price</p>
            <p className="text-sm font-semibold">
              {formatNumber(currentOwnedCrypto.buyAvgPrice || 0, { symbol: '$' })}
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-6 mt-10 flex items-center justify-between">
        <p className="text-lg">Transactions</p>
        <Button icon={<Add />} onClick={handleAddTransaction}>
          Add
        </Button>
      </section>

      <section className="my-5">
        <ul className="dark:border-dark-line flex justify-between border-b border-t py-2 text-sm">
          <li>Type</li>
          <li>Amount</li>
        </ul>

        <ul>
          {currentOwnedCrypto.transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} cryptoSymbol={currentOwnedCrypto.symbol} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default OwnedCryptoDetail
