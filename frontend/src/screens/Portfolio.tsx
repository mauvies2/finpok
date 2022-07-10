import { ReactChild } from 'react'
import { usePortfolio } from 'finpoq/hooks/useApi'
import { formatNumber } from 'finpoq/utils/formatNumber'
import Head from 'finpoq/components/Shared/Head'

interface Props {
  children: ReactChild
}

const Portfolio = ({ children }: Props) => {
  const { data: portfolio } = usePortfolio()

  if (!portfolio) return null

  return (
    <>
      <Head title="Portfolio" />
      <div className="lg:mt-6 lg:flex">
        <section className="my-10 ml-4 flex items-center lg:my-0 lg:ml-0 lg:w-[25%] lg:items-start">
          <div className="avatar placeholder mr-4">
            <div className="text-neutral-content dark:bg-dark dark:text-dark-text dark:border-dark-line h-12 w-12 rounded-full bg-gray-300 dark:border">
              <span className="text-lg">MX</span>
            </div>
          </div>
          <div>
            <p className="font-bold">My Main Portfolio</p>
            <p>{formatNumber(portfolio.total || 0, { fractionDigits: 2, symbol: '$' })}</p>
          </div>
        </section>
        <div className="mt-10 flex-1 md:mt-0">
          <section>
            <p className="mb-2">Current balance</p>
            <div className="mb-1 mt-3 flex justify-between">
              <p className="text-3xl font-bold">
                {formatNumber(portfolio.total || 0, {
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
