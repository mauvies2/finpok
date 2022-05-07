import { FC, ReactChild } from 'react'
import BreadCrumbs from 'finpok/components/BreadCrumbs/BreadCrumbs'
import { useCryptos, usePortfolio } from 'finpok/hooks/useApi'
import formatNumber from 'finpok-core/utils/formatNumber'

interface PortfolioProps {
  children: ReactChild
}

const Portfolio: FC<PortfolioProps> = ({ children }) => {
  const { data: portfolio } = usePortfolio()
  useCryptos()

  if (!portfolio) return null

  return (
    <>
      <BreadCrumbs />
      <div className="lg:mt-10 xl:flex">
        <section className="my-10 ml-4 flex items-center lg:my-0 lg:ml-0 lg:w-1/3 lg:items-start">
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
        <div className="flex-1 lg:mt-10 xl:mt-0">
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
          {children}
        </div>
      </div>
    </>
  )
}

export default Portfolio
