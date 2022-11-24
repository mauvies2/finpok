import { usePortfolio } from 'finpoq/hooks/api/use-api'
import { formatNumber } from 'finpoq/utils/format-number'
import Head from 'finpoq/components/shared/head'
import { Outlet } from 'react-router-dom'

const Portfolio = () => {
  const { data: portfolio } = usePortfolio()

  if (!portfolio) return null

  return (
    <>
      <Head title="Portfolio" />
      <div className="lg:mt-6 lg:flex">
        <div className="mt-4 flex-1">
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
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Portfolio
