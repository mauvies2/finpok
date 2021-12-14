import { FC } from 'react'
import PortfolioCrypto from 'finpok/components/PortfolioCrypto/PortfolioCrypto'
import useGetCryptos from 'finpok/store/server/selectors/useGetCryptos'
import useGetPortfolio from 'finpok/store/server/selectors/useGetPortfolio'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import Button from '../Shared/Button'
import formatNumber from 'finpok-core/utils/formatNumber'

interface PortfolioCryptoIndexProps {
  isLoadingPortfolio: boolean
  isLoadingCryptos: boolean
}

const PortfolioCryptoIndex: FC<PortfolioCryptoIndexProps> = ({ isLoadingPortfolio, isLoadingCryptos }) => {
  // computed
  const portfolio = useGetPortfolio()
  const cryptos = useGetCryptos()

  // methods
  const { openModal } = useUiDispatch()

  if (!portfolio || !cryptos) return null

  return (
    <>
      <section className='flex items-center ml-4 my-10'>
        <div className='avatar placeholder  mr-4'>
          <div className='bg-gray-300 text-neutral-content rounded-full w-12 h-12'>
            <span className='text-lg'>MX</span>
          </div>
        </div>
        <div>
          <p className='font-bold'>My Main Portfolio</p>
          <p>={formatNumber(portfolio.total, { fractionDigits: 2, symbol: '$' })}</p>
        </div>
      </section>
      <section>
        <p className='mb-2'>Current balance</p>
        <div className='flex justify-between mb-1 mt-3'>
          <p className='font-bold text-3xl text-black'>
            {formatNumber(portfolio.total, { fractionDigits: 2, symbol: '$' })}
          </p>
          <div className='bg-green-400 rounded-lg flex items-center p-2 text-white font-bold'>1.11%</div>
        </div>
        <div className='flex items-center'>
          <p className='text-green-400 font-bold'>+ $147.69</p>
          <p className='bg-light-gray ml-2 p-1'>24h</p>
        </div>
      </section>
      {isLoadingCryptos || isLoadingPortfolio ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className='flex justify-between items-center my-8'>
            <p className='font-bold text-black text-lg'>Your assets</p>
            <Button className='btn btn-secondary' onClick={() => openModal('add-new-search')} icon='+' height='s'>
              Add new
            </Button>
          </section>
          <section>
            <div className='flex border-b border-t py-2 font-bold'>
              <div className='flex-1 flex '>Name</div>
              <div className='flex-1 flex justify-end'>Price</div>
              <div className='flex-1 flex justify-end'>Holdings</div>
            </div>

            {portfolio.cryptocurrencies?.map(ownedCrypto => {
              const crypto = cryptos.find(crypto => ownedCrypto.symbol === crypto.symbol)
              return <PortfolioCrypto key={ownedCrypto._id} ownedCrypto={ownedCrypto} crypto={crypto} />
            })}
          </section>
        </>
      )}
    </>
  )
}

export default PortfolioCryptoIndex
