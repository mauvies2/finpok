import { FC } from 'react'

const InfoBar: FC = () => {
  return (
    <section className="scrollbar-hide flex w-full flex-shrink-0 overflow-x-scroll border-b p-3 text-xs">
      <div className="mr-4 flex flex-nowrap">
        <dl className="mr-2 w-max">Market Cap:</dl>
        <dd className="text-blue-600">$2,000,000,000,000</dd>
      </div>
      <div className="mr-4 flex">
        <dl className="mr-2 w-max">24h Vol:</dl>
        <dd className="text-blue-600">$87,000,000,000,000</dd>
      </div>
      <div className="mr-4 flex">
        <dl className="mr-2 w-max">Dominance:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
      <div className="mr-4 flex">
        <dl className="mr-2 w-max">ETH Gas:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
      <div className="mr-4 flex">
        <dl className="mr-2 w-max">Market Cap:</dl>
        <dd className="text-blue-600">$2.000</dd>
      </div>
    </section>
  )
}

export default InfoBar
