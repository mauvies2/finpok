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
    <>
      <BreadCrumbs />
      {children}
    </>
  )
}

export default Portfolio
