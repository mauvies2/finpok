import PortfolioCrypto from 'finpoq/components/PortfolioCrypto/PortfolioCrypto'
import useGetPortfolio from 'finpoq/store/server/selectors/useGetPortfolio'
import Button from 'finpoq/components/Shared/Button'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'
import Add from 'finpoq/assets/icons/Add'

const PortfolioCryptoIndex = () => {
  // computed
  const portfolio = useGetPortfolio()
  const { openModal } = useUiDispatch()

  const handleSelect = () => {
    openModal('/portfolio/transaction-operation/select')
  }

  // methods
  if (!portfolio) return null

  return (
    <>
      <section className="my-8 flex items-center justify-between">
        <p className="text-lg font-bold">Your assets</p>
        <Button icon={<Add />} height="s" onClick={handleSelect}>
          Add new
        </Button>
      </section>
      <section>
        {portfolio.cryptocurrencies && portfolio.cryptocurrencies.length ? (
          <>
            <div className="dark:border-dark-line flex border-b border-t py-2 font-bold">
              <div className="flex flex-1">Name</div>
              <div className="flex flex-1 justify-end">Price</div>
              <div className="hidden flex-1 justify-end md:flex">24H</div>
              <div className="flex flex-1 justify-end">Holdings</div>
              <div className="hidden flex-1 justify-end md:flex">Avg. Buy Price</div>
              <div className="hidden justify-end md:flex md:w-24">Actions</div>
            </div>
            {portfolio.cryptocurrencies.map((ownedCrypto) => (
              <PortfolioCrypto key={ownedCrypto._id} ownedCrypto={ownedCrypto} />
            ))}
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
