import { FC, ReactChild } from 'react'
import BreadCrumbs from 'finpok/components/BreadCrumbs/BreadCrumbs'
import { useCryptos, usePortfolio } from 'finpok/hooks/useApi'

interface PortfolioProps {
  children: ReactChild
}

const Portfolio: FC<PortfolioProps> = ({ children }) => {
  usePortfolio()
  useCryptos()

  return (
    <div>
      <div className="p-4 text-sm">
        <BreadCrumbs />

        {children}
      </div>
    </div>
  )
}

export default Portfolio
