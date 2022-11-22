import { Outlet } from 'react-router-dom'
import PortfolioCrypto from 'finpoq/components/portfolio-crypto/portfolio-crypto'
import useGetPortfolio from 'finpoq/store/server/selectors/use-get-portfolio'
import Button from 'finpoq/components/shared/button'
import { useUiDispatch } from 'finpoq/store/ui/ui-provider'
import Add from 'finpoq/assets/icons/add'

const PortfolioCryptoIndex = () => {
  const portfolio = useGetPortfolio()
  const { openModal } = useUiDispatch()

  const handleSelect = () => {
    openModal('/portfolio/transaction-operation/select')
  }

  if (!portfolio) return null

  return (
    <>
      <section className="my-8 flex items-center justify-between">
        <p className="text-lg">Your assets</p>
        <Button icon={<Add />} height="s" onClick={handleSelect}>
          Add
        </Button>
      </section>
      <section>
        {portfolio.cryptocurrencies && portfolio.cryptocurrencies.length ? (
          <>
            <div className="dark:border-dark-line flex border-b border-t py-2 text-sm">
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
        <Outlet />
      </section>
    </>
  )
}

export default PortfolioCryptoIndex
