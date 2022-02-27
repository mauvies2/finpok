import { FC } from 'react'
import formatNumber from 'finpok-core/utils/formatNumber'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import { ICrypto, IOwnedCrypto } from 'finpok-core/domain'
import { Link } from 'react-router-dom'

interface PortfolioCryptoProps {
  ownedCrypto: IOwnedCrypto
  crypto: ICrypto | undefined
}

const PortfolioCrypto: FC<PortfolioCryptoProps> = ({ ownedCrypto, crypto }) => {
  const { selectOwnedCryptoDetail } = useUiDispatch()

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
    <div className="flex border-b py-5 ">
      <div className="flex-1 flex  items-center">
        <img src={crypto.logoUrl} className="mr-3" width="20" alt="logo" />
        <div>
          <p className="font-bold">{ownedCrypto.name}</p>
          <p>{ownedCrypto.symbol}</p>
        </div>
      </div>
      <div className="flex-1 text-right justify-end font-semibold">
        <p className="mb-1">{formatNumber(cryptoPrices.price, { symbol: '$', fractionDigits: 2 })}</p>
        <p className={change24hStyle}>{change24h}</p>
      </div>
      <Link
        to={`/portfolio/${ownedCrypto.symbol}`}
        className="flex-1 text-right justify-end cursor-pointer"
        onClick={() => selectOwnedCryptoDetail(ownedCrypto.symbol)}
      >
        <p className="font-semibold mb-1">
          {cryptoPrices.price
            ? formatNumber(ownedCrypto.amount * cryptoPrices.price, {
                symbol: '$',
                fractionDigits: 2,
                sign: ownedCrypto.amount > 0 ? undefined : false,
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
      </Link>
    </div>
  )
}

export default PortfolioCrypto
