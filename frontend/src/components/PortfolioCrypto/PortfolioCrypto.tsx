import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusLg } from '@styled-icons/bootstrap/PlusLg'
import { MoreVertical } from '@styled-icons/fluentui-system-regular'

import { formatNumber } from 'finpoq/utils/formatNumber'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'
import { ICrypto, IOwnedCrypto } from 'finpoq/types'
import { useRemoveAsset } from 'finpoq/hooks/useApi'
import useClickOutside from 'finpoq/hooks/useClickOutside'

interface PortfolioCryptoProps {
  ownedCrypto: IOwnedCrypto
  crypto: ICrypto | undefined
}

const PortfolioCrypto: FC<PortfolioCryptoProps> = ({ ownedCrypto, crypto }) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const { selectOwnedCryptoDetail, openModal } = useUiDispatch()
  const removeAsset = useRemoveAsset()
  useClickOutside(menuRef, () => setIsMenuOpened(false))

  const handleRemoveAsset = () => {
    if (ownedCrypto) {
      removeAsset.mutate(ownedCrypto._id || '')
    }
  }

  if (!ownedCrypto || !crypto) return null

  const cryptoPrices = crypto.quote.USD
  const change24hStyle = cryptoPrices.percent_change_24h > 0 ? 'text-green-400' : 'text-red-400'
  const change24h = formatNumber(cryptoPrices.percent_change_24h, {
    symbol: '%',
    symbolPosition: 'after',
    sign: cryptoPrices.percent_change_24h > 0,
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
          <img src={crypto.logoUrl} className="mr-3" width="20" alt="logo" />
          <div>
            <p className="font-bold">{ownedCrypto.name}</p>
            <p>{ownedCrypto.symbol}</p>
          </div>
        </div>
        <div className="flex-1 items-center justify-end text-right font-semibold">
          <p className="mb-1">{formatNumber(cryptoPrices.price, { symbol: '$', fractionDigits: 2 })}</p>
          <p className={`${change24hStyle} lg:hidden`}>{change24h}</p>
        </div>
        <div className="hidden flex-1  text-right font-semibold md:block">
          <p className={change24hStyle}>{change24h}</p>
        </div>

        <div className="flex-1 cursor-pointer text-right">
          <p className="mb-1 font-semibold">
            {cryptoPrices.price
              ? formatNumber(ownedCrypto.amount * cryptoPrices.price, {
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
        <PlusLg
          className="h-[15px] w-[15px] cursor-pointer text-gray-400"
          onClick={() => openModal(`/portfolio/add-new-transaction/${ownedCrypto.symbol}`)}
        />
        <div onClick={() => setIsMenuOpened(!isMenuOpened)} ref={menuRef} className="relative">
          <MoreVertical className="ml-3 h-[21px] w-[21px] cursor-pointer text-gray-400" />
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
