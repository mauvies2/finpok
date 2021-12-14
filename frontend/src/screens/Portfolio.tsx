import { FC } from 'react'
import PortfolioCryptoIndex from 'finpok/components/PortfolioCryptoIndex'
import BreadCrumbs from 'finpok/components/BreadCrumbs/BreadCrumbs'
import AddNewSearch from 'finpok/components/AddNewSearch'
import AddNewTransaction from 'finpok/components/AddNewTransaction'
import PortfolioCryptoDetail from './OwnedCryptoDetail'
import Modal from 'finpok/components/Shared/Modal/Modal'
import { useUiState } from 'finpok/store/ui/UiProvider'
import { useCryptos, usePortfolio } from 'finpok/hooks/useApi'
import useBlockScroll from 'finpok/hooks/useBlockScroll'

const Portfolio: FC = () => {
  const {
    portfolio: { isPortfolioCryptoDetailSection },
    modal,
  } = useUiState()

  const { isLoading: isLoadingPortfolio } = usePortfolio()
  const { isLoading: isLoadingCryptos } = useCryptos()

  useBlockScroll(!!modal)

  return (
    <div>
      <div className="p-4 text-sm">
        <BreadCrumbs />

        {!isPortfolioCryptoDetailSection ? (
          <PortfolioCryptoIndex
            isLoadingPortfolio={isLoadingPortfolio}
            isLoadingCryptos={isLoadingCryptos}
          />
        ) : (
          <PortfolioCryptoDetail />
        )}

        {/* Modals */}
        <Modal section="add-new-search">
          <AddNewSearch />
        </Modal>
        <Modal section="add-transaction">
          <AddNewTransaction />
        </Modal>
      </div>
    </div>
  )
}

export default Portfolio
