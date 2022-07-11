import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DotsVertical from 'finpoq/assets/icons/DotsVertical'
import Add from 'finpoq/assets/icons/Add'
import { formatNumber } from 'finpoq/utils/formatNumber'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'
import { useRemoveAsset } from 'finpoq/hooks/useApi'
import useClickOutside from 'finpoq/hooks/useClickOutside'
import { IOwnedCrypto } from 'finpoq/types'

interface Props {
  ownedCrypto: IOwnedCrypto
}

const PortfolioCrypto = ({ ownedCrypto }: Props) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const { selectOwnedCryptoDetail, openModal, selectCrypto } = useUiDispatch()
  const removeAsset = useRemoveAsset()
  useClickOutside(menuRef, () => setIsMenuOpened(false))

  const handleRemoveAsset = () => {
    if (ownedCrypto) {
      removeAsset.mutate(ownedCrypto._id || '')
    }
  }

  const handleAddTransaction = () => {
    selectCrypto({
      symbol: ownedCrypto.symbol,
      name: ownedCrypto.name,
      logoUrl: ownedCrypto.logoUrl,
      price: ownedCrypto.price.current,
    })

    openModal(`/portfolio/add-new-transaction/${ownedCrypto.symbol}`)
  }

  if (!ownedCrypto) return null

  const change24hStyle = ownedCrypto.price.change24h > 0 ? 'text-green-400' : 'text-red-400'
  const change24h = formatNumber(ownedCrypto.price.change24h, {
    symbol: '%',
    symbolPosition: 'after',
    sign: ownedCrypto.price.change24h > 0,
    fractionDigits: 2,
  })

  return (
    <div className="dark:border-dark-line flex border-b">
      <Link
        className="flex flex-1 py-5"
        to={`/portfolio/${ownedCrypto.symbol}`}
        onClick={() => selectOwnedCryptoDetail(ownedCrypto.symbol)}
      >
        <div className="flex flex-1 items-center">
          <img src={ownedCrypto.logoUrl} className="mr-3" width="20" alt="logo" />
          <div>
            <p className="font-bold">{ownedCrypto.name}</p>
            <p>{ownedCrypto.symbol}</p>
          </div>
        </div>
        <div className="flex-1 items-center justify-end text-right font-semibold">
          <p className="mb-1">{formatNumber(ownedCrypto.price.current, { symbol: '$', fractionDigits: 2 })}</p>
          <p className={`${change24hStyle} lg:hidden`}>{change24h}</p>
        </div>
        <div className="hidden flex-1  text-right font-semibold md:block">
          <p className={change24hStyle}>{change24h}</p>
        </div>

        <div className="flex-1 cursor-pointer text-right">
          <p className="mb-1 font-semibold">
            {ownedCrypto.price.current
              ? formatNumber(ownedCrypto.amount * ownedCrypto.price.current, {
                  symbol: '$',
                  fractionDigits: 2,
                  sign: ownedCrypto.amount > 0 ? undefined : false,
                  abs: true,
                })
              : 0}
          </p>
          <p className="text-xs">
            {formatNumber(ownedCrypto.amount, {
              maximumSignificantDigits: 4,
              unit: ownedCrypto.symbol,
              sign: ownedCrypto.amount > 0 ? undefined : false,
            })}
          </p>
        </div>
        <div className="hidden flex-1 text-right font-semibold md:block">
          <p className="mb-1">{formatNumber(ownedCrypto.buyAvgPrice, { symbol: '$', fractionDigits: 2 })}</p>
        </div>
      </Link>
      <div className="hidden items-center justify-end text-right font-semibold md:flex md:w-24">
        <div onClick={handleAddTransaction}>
          <Add />
        </div>
        <div onClick={() => setIsMenuOpened(!isMenuOpened)} ref={menuRef} className="relative">
          <DotsVertical />
          {isMenuOpened && (
            <div
              className="dropdown-content dark:bg-dark-modal dark:border-dark-line dark:text-dark-text bg-base-100  min-w-40 absolute top-5 right-2 cursor-pointer rounded-lg p-3 text-center text-sm font-extralight text-red-500 shadow-xl hover:bg-gray-50 dark:border"
              onClick={handleRemoveAsset}
            >
              <p>Remove</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioCrypto
