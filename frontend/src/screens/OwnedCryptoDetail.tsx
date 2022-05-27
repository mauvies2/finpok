import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'
import useGetCrypto from 'finpoq/store/server/selectors/useGetCrypto'
import { useRemoveAsset } from 'finpoq/hooks/useApi'
import { formatNumber } from 'finpoq-core/utils/formatNumber'
import useGetPortfolio from 'finpoq/store/server/selectors/useGetPortfolio'
import Button from 'finpoq/components/Shared/Button'
import Transaction from 'finpoq/components/Transaction'
import { useGetCurrentOwnedCrypto } from 'finpoq/store/ui/UiSelectors'
import useClickOutside from 'finpoq/hooks/useClickOutside'

const OwnedCryptoDetail = () => {
  const removeAssetOption = useRef<HTMLDivElement | null>(null)
  const [isRemoveAssetPromptOpen, setIsRemoveAssetPromptOpen] = useState(false)

  const portfolio = useGetPortfolio()
  const removeAsset = useRemoveAsset()
  const navigate = useNavigate()
  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const { selectCrypto, openModal } = useUiDispatch()
  const crypto = useGetCrypto(currentOwnedCrypto?.symbol)
  useClickOutside(removeAssetOption, () => setIsRemoveAssetPromptOpen(false))

  // methods
  const handleRemoveAsset = () => {
    if (currentOwnedCrypto) {
      removeAsset.mutate(currentOwnedCrypto._id || '')
    }
    navigate(-1)
  }

  const handleAddTransaction = () => {
    if (currentOwnedCrypto && crypto) {
      selectCrypto(currentOwnedCrypto.symbol)
    }
    openModal(`/portfolio/${currentOwnedCrypto?.symbol}/transaction-operation`)
  }

  if (!currentOwnedCrypto || !crypto || !portfolio) return null

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
              className="menu dropdown-content bg-base-100 min-w-40 absolute top-12 right-8 cursor-pointer rounded-lg p-3 text-center font-extralight text-red-500 shadow hover:bg-gray-50"
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
          <img src={crypto.logoUrl.replace('16x16', '32x32')} className="mr-3 w-10 flex-shrink-0" alt="logox" />
          {
            <p className="text-3xl font-bold text-black">
              {formatNumber(currentOwnedCrypto.amount * crypto.quote.USD.price, {
                fractionDigits: 2,
                symbol: '$',
                sign: currentOwnedCrypto.amount > 0,
                noPositiveSign: true,
              })}
            </p>
          }
        </div>
      </section>

      <section className="mt-10 text-xs">
        <ul>
          <li className="flex justify-between border-b border-gray-100 py-5">
            <p>Quantity</p>
            <p className="text-sm font-semibold">
              {currentOwnedCrypto.amount} {currentOwnedCrypto.symbol}
            </p>
          </li>
          <li className="flex justify-between border-gray-100 py-5">
            <p>Avg. buy price</p>
            <p className="text-sm font-semibold">{formatNumber(currentOwnedCrypto.buyAvgPrice, { symbol: '$' })}</p>
          </li>
        </ul>
      </section>

      <section className="mb-6 mt-10 flex items-center justify-between">
        <p className="text-lg font-bold text-black">Transactions</p>
        <Button icon="+" onClick={handleAddTransaction}>
          Add transaction
        </Button>
      </section>

      <section className="my-5">
        <ul className="flex justify-between border-b border-t py-2 font-bold">
          <li>Type</li>
          <li>Amount</li>
        </ul>

        <ul>
          {portfolio.cryptocurrencies
            ?.find((crypto) => crypto._id === currentOwnedCrypto._id)
            ?.transactions.map(
              (transaction) =>
                transaction && (
                  <Transaction
                    key={transaction._id}
                    transaction={transaction}
                    cryptoSymbol={currentOwnedCrypto.symbol}
                  />
                )
            )}
        </ul>
      </section>
    </>
  )
}

export default OwnedCryptoDetail
