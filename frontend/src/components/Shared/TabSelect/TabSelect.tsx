import { TransacionPayload } from 'finpok-core/domain'
import { FC } from 'react'

type TabSelectProps = {
  value: string
  tabs: Array<string>
  onClick: (type: TransacionPayload['type']) => void
}

const TabSelect: FC<TabSelectProps> = ({ tabs, value, onClick }) => {
  return (
    <div className="tabs tabs-boxed mb-6 w-full justify-between bg-gray-100 text-xs">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab flex-1 cursor-pointer text-xs font-bold capitalize text-gray-700 ${
            value === tab && 'rounded-lg bg-white'
          }`}
          onClick={() => onClick(tab as TransacionPayload['type'])}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

export default TabSelect
