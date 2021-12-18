import { useState } from 'react'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import useGetCrypto from 'finpok/store/server/selectors/useGetCrypto'

import { useRemoveAsset } from 'finpok/hooks/useApi'
import formatNumber from 'finpok-core/utils/formatNumber'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import Button from 'finpok/components/Shared/Button'
import Transaction from '../components/Transaction'
import TransactionDetail from '../components/TransactionDetail'
import Modal from '../components/Shared/Modal'
import classNames from 'classnames'
import EditTransaction from 'finpok/components/EditTransaction'
import { useGetCurrentOwnedCrypto } from 'finpok/store/ui/UiSelectors'

const OwnedCryptoDetail = () => {
  // local state
  const [isRemoveAssetPromptOpen, setIsRemoveAssetPromptOpen] = useState<boolean>(false)

  // computed
  const portfolio = useGetPortfolio()
  const removeAsset = useRemoveAsset()

  const currentOwnedCrypto = useGetCurrentOwnedCrypto()
  const { closeOwnedCryptoDetail, openModal, selectCrypto } = useUiDispatch()
  const crypto = useGetCrypto(currentOwnedCrypto?.symbol)

  // methods
  const handleRemoveAsset = () => {
    if (currentOwnedCrypto) {
      removeAsset.mutate(currentOwnedCrypto._id || '')
    }
    closeOwnedCryptoDetail()
  }

  const handleAddTransaction = () => {
    if (currentOwnedCrypto && crypto) {
      selectCrypto(currentOwnedCrypto.symbol)
    }
    openModal('add-transaction')
  }

  if (!currentOwnedCrypto || !crypto || !portfolio) return null

  const balancePorcentage =
    ((currentOwnedCrypto.buyAvgPrice * currentOwnedCrypto.amount) /
      (currentOwnedCrypto.amount * crypto.quote.USD.price)) *
    100

  const balance =
    currentOwnedCrypto.amount * crypto.quote.USD.price - currentOwnedCrypto.buyAvgPrice * currentOwnedCrypto.amount
  const profitTextColor = balance > 0 ? 'text-green-400' : 'text-red-400'

  return (
    <>
      <section className="flex justify-between mt-8">
        <Button className="btn btn-light" onClick={() => closeOwnedCryptoDetail()} icon="<-">
          Back
        </Button>
        <div className="relative">
          <Button
            className="btn btn-light relative"
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

      <p className="mt-8 text-xs">
        {currentOwnedCrypto.name} {`(${currentOwnedCrypto.symbol})`} Balance oo
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <img src={crypto.logoUrl.replace('16x16', '32x32')} className="mr-3 flex-shrink-0 w-10" alt="logox" />
          {crypto.quote.USD.price && currentOwnedCrypto && (
            <p className="font-bold text-3xl text-black">
              {formatNumber(currentOwnedCrypto.amount * crypto.quote.USD.price, { symbol: '$' })}
            </p>
          )}
        </div>
        <div className="bg-green-400 rounded-lg flex items-center p-2 text-white font-bold">1.11%</div>
      </div>

      <div className="mt-10 text-xs">
        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Quantity</p>
          <p className="font-semibold text-sm">
            {currentOwnedCrypto.amount} {currentOwnedCrypto.symbol}
          </p>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Avg. buy price</p>
          <p className="font-semibold text-sm">{formatNumber(currentOwnedCrypto.buyAvgPrice, { symbol: '$' })}</p>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-5">
          <p>Total profit / loss</p>
          <p className={classNames(profitTextColor, 'font-semibold text-sm')}>
            {formatNumber(balancePorcentage, {
              symbol: '%',
              symbolPosition: 'after',
              sign: balancePorcentage > 0,
              fractionDigits: 2,
            })}
            &nbsp;
            {formatNumber(balance, {
              symbol: '$',
              parenthesis: true,
              sign: balance > 0,
              fractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center my-8">
          <p className="font-bold text-black text-lg">Transactions</p>
          <Button className="btn btn-secondary" icon={'+'} onClick={handleAddTransaction}>
            Add transaction
          </Button>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex justify-between border-b border-t py-2 font-bold">
          <div>Type</div>
          <div>Amount</div>
        </div>

        {portfolio.cryptocurrencies
          .find((crypto) => crypto._id === currentOwnedCrypto._id)
          ?.transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} cryptoSymbol={currentOwnedCrypto.symbol} />
          ))}
      </section>

      <Modal section="transaction-detail" modalTitle="Transaction details" closeModalIcon={false}>
        <TransactionDetail />
      </Modal>

      <Modal section="edit-transaction" modalTitle="Edit transaction" closeModalIcon={false}>
        <EditTransaction />
      </Modal>
    </>
  )
}

export default OwnedCryptoDetail
