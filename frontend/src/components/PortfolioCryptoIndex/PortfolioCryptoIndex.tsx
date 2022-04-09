import { FC } from 'react'
import PortfolioCrypto from 'finpok/components/PortfolioCrypto/PortfolioCrypto'
import useGetCryptos from 'finpok/store/server/selectors/useGetCryptos'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import Button from '../Shared/Button'
import formatNumber from 'finpok-core/utils/formatNumber'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'

const PortfolioCryptoIndex: FC = () => {
  // computed
  const portfolio = useGetPortfolio()
  const cryptos = useGetCryptos()
  const { openModal } = useUiDispatch()
  const handleSelect = () => {
    openModal('/portfolio/transaction-operation/select')
  }

  // methods
  if (!portfolio || !cryptos) return null

  return (
    <>
      <section className="flex items-center ml-4 my-10">
        <div className="avatar placeholder  mr-4">
          <div className="bg-gray-300 text-neutral-content rounded-full w-12 h-12">
            <span className="text-lg">MX</span>
          </div>
        </div>
        <div>
          <p className="font-bold">My Main Portfolio</p>
          <p>{formatNumber(portfolio.total, { fractionDigits: 2, symbol: '$' })}</p>
        </div>
      </section>
      <section>
        <p className="mb-2">Current balance</p>
        <div className="flex justify-between mb-1 mt-3">
          <p className="font-bold text-3xl text-black">
            {formatNumber(portfolio.total, {
              fractionDigits: 2,
              symbol: '$',
              sign: portfolio.total === 0 ? undefined : portfolio.total > 0,
              noPositiveSign: true,
            })}
          </p>
        </div>
      </section>

      <section className="flex justify-between items-center my-8">
        <p className="font-bold text-black text-lg">Your assets</p>
        <Button className="btn btn-secondary" icon="+" height="s" onClick={handleSelect}>
          Add new
        </Button>
      </section>
      <section>
        {portfolio.cryptocurrencies && portfolio.cryptocurrencies.length ? (
          <>
            <div className="flex border-b border-t py-2 font-bold">
              <div className="flex-1 flex ">Name</div>
              <div className="flex-1 flex justify-end">Price</div>
              <div className="flex-1 flex justify-end">Holdings</div>
            </div>
            {portfolio.cryptocurrencies.map((ownedCrypto) => {
              const crypto = cryptos.find((crypto) => ownedCrypto.symbol === crypto.symbol)
              return <PortfolioCrypto key={ownedCrypto._id} ownedCrypto={ownedCrypto} crypto={crypto} />
            })}
          </>
        ) : (
          <div className="mt-20">
            <div className="w-full flex justify-center font-bold">Your portfolio is empty</div>
            <div className="w-full flex justify-center">Start adding some coins</div>
          </div>
        )}
      </section>
    </>
  )
}

export default PortfolioCryptoIndex
