import { FC } from 'react'

const InfoBar: FC = () => {
  return (
    <section className="border-b flex flex-shrink-0 text-xs p-3 w-full overflow-x-scroll scrollbar-hide">
      <div className="flex mr-4 flex-nowrap">
        <dl className="mr-2 w-max">Market Cap:</dl>
        <dd className="text-blue-600">$2,000,000,000,000</dd>
      </div>
      <div className="flex mr-4">
        <dl className="mr-2 w-max">24h Vol:</dl>
        <dd className="text-blue-600">$87,000,000,000,000</dd>
      </div>
      <div className="flex mr-4">
        <dl className="mr-2 w-max">Dominance:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
      <div className="flex mr-4">
        <dl className="mr-2 w-max">ETH Gas:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
      <div className="flex mr-4">
        <dl className="mr-2 w-max">Market Cap:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
    </section>
  )
}

export default InfoBar
