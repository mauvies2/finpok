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
      <section className="my-10 ml-4 flex items-center">
        <div className="avatar placeholder  mr-4">
          <div className="text-neutral-content h-12 w-12 rounded-full bg-gray-300">
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
        <div className="mb-1 mt-3 flex justify-between">
          <p className="text-3xl font-bold text-black">
            {formatNumber(portfolio.total, {
              fractionDigits: 2,
              symbol: '$',
              sign: portfolio.total === 0 ? undefined : portfolio.total > 0,
              noPositiveSign: true,
            })}
          </p>
        </div>
      </section>

      <section className="my-8 flex items-center justify-between">
        <p className="text-lg font-bold text-black">Your assets</p>
        <Button className="btn btn-secondary" icon="+" height="s" onClick={handleSelect}>
          Add new
        </Button>
      </section>
      <section>
        {portfolio.cryptocurrencies && portfolio.cryptocurrencies.length ? (
          <>
            <div className="flex border-b border-t py-2 font-bold">
              <div className="flex flex-1 ">Name</div>
              <div className="flex flex-1 justify-end">Price</div>
              <div className="flex flex-1 justify-end">Holdings</div>
            </div>
            {portfolio.cryptocurrencies.map((ownedCrypto) => {
              const crypto = cryptos.find((crypto) => ownedCrypto.symbol === crypto.symbol)
              return <PortfolioCrypto key={ownedCrypto._id} ownedCrypto={ownedCrypto} crypto={crypto} />
            })}
          </>
        ) : (
          <div className="mt-20">
            <div className="flex w-full justify-center font-bold">Your portfolio is empty</div>
            <div className="flex w-full justify-center">Start adding some coins</div>
          </div>
        )}
      </section>
    </>
  )
}

export default PortfolioCryptoIndex
