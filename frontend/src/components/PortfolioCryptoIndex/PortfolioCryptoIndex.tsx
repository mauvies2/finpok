import { FC } from 'react'
import PortfolioCrypto from 'finpok/components/PortfolioCrypto/PortfolioCrypto'
import useGetCryptos from 'finpok/store/server/selectors/useGetCryptos'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import Button from '../Shared/Button'
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
              <div className="flex flex-1">Name</div>
              <div className="flex flex-1 justify-end">Price</div>
              <div className="hidden flex-1 justify-end md:flex">24H</div>
              <div className="flex flex-1 justify-end">Holdings</div>
              <div className="hidden flex-1 justify-end md:flex">Avg. Buy Price</div>
              <div className="hidden justify-end md:flex md:w-24">Actions</div>
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
