import { FC } from 'react'
import PortfolioCrypto from 'finpok/components/PortfolioCrypto/PortfolioCrypto'
import useGetCryptos from 'finpok/store/server/selectors/useGetCryptos'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import Button from '../Shared/Button'
import formatNumber from 'finpok-core/utils/formatNumber'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import usePortfolioYield from 'finpok/hooks/usePortfolioYield'

const PortfolioCryptoIndex: FC = ({ children: routes }) => {
  // computed
  const portfolio = useGetPortfolio()
  const cryptos = useGetCryptos()
  const { total, totalPercentage } = usePortfolioYield(portfolio, cryptos)
  const { openModal } = useUiDispatch()

  const handleSelect = () => {
    openModal('/portfolio/transaction-operation/select')
  }

  // methods
  if (!portfolio || !cryptos) return null

  const textColor = total > 0 ? 'text-green-400' : 'text-red-400'
  const bgColor = total > 0 ? 'bg-green-400' : 'bg-red-500'

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
            {formatNumber(portfolio.total, { fractionDigits: 2, symbol: '$' })}
          </p>
          <div className={`${bgColor} rounded-lg flex items-center p-2 text-white font-bold`}>
            {formatNumber(totalPercentage, {
              fractionDigits: 2,
              symbol: '%',
              symbolPosition: 'after',
              sign: total > 0,
            })}
          </div>
        </div>
        <div className="flex items-center">
          <p className={`font-bold ${textColor}`}>
            {formatNumber(total, { fractionDigits: 2, symbol: '$', sign: total > 0 })}
          </p>
          {/* <p className="bg-light-gray ml-2 p-1">24h</p> */}
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
