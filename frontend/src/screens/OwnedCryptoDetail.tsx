import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import useGetCrypto from 'finpok/store/server/selectors/useGetCrypto'
import { useRemoveAsset } from 'finpok/hooks/useApi'
import formatNumber from 'finpok-core/utils/formatNumber'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import Button from 'finpok/components/Shared/Button'
import Transaction from '../components/Transaction'
import { useGetCurrentOwnedCrypto } from 'finpok/store/ui/UiSelectors'

const OwnedCryptoDetail = () => {
  // local state
  const [isRemoveAssetPromptOpen, setIsRemoveAssetPromptOpen] = useState<boolean>(false)
  // computed
  const portfolio = useGetPortfolio()
  const removeAsset = useRemoveAsset()
  const navigate = useNavigate()

  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const { selectCrypto, openModal } = useUiDispatch()
  const crypto = useGetCrypto(currentOwnedCrypto?.symbol)

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
      <section className="flex justify-between mt-8">
        <Link to="/portfolio">
          <Button className="btn btn-light" icon="<-">
            Back
          </Button>
        </Link>
        <div className="relative">
          <Button
            className="btn btn-light"
            onClick={() => setIsRemoveAssetPromptOpen(!isRemoveAssetPromptOpen)}
            icon={'...'}
          >
            More
          </Button>
          {isRemoveAssetPromptOpen && (
            <div
              className="absolute text-center cursor-pointer text-red-500  font-bold top-10 right-0 p-3 shadow menu dropdown-content bg-base-100 rounded-lg min-w-40"
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

      <section className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <img src={crypto.logoUrl.replace('16x16', '32x32')} className="mr-3 flex-shrink-0 w-10" alt="logox" />
          {
            <p className="font-bold text-3xl text-black">
              {formatNumber(currentOwnedCrypto.amount * crypto.quote.USD.price, {
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
            <p className="font-semibold text-sm">
              {currentOwnedCrypto.amount} {currentOwnedCrypto.symbol}
            </p>
          </li>
          <li className="flex justify-between border-gray-100 py-5">
            <p>Avg. buy price</p>
            <p className="font-semibold text-sm">{formatNumber(currentOwnedCrypto.buyAvgPrice, { symbol: '$' })}</p>
          </li>
        </ul>
      </section>

      <section className="flex justify-between items-center mb-6 mt-10">
        <p className="font-bold text-black text-lg">Transactions</p>
        <Button className="btn btn-secondary" icon={'+'} onClick={handleAddTransaction}>
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
