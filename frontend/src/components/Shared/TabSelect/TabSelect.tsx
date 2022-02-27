import { TransacionPayload } from 'finpok-core/domain'
import { FC } from 'react'

type TabSelectProps = {
  value: string
  tabs: Array<string>
  onClick: (type: TransacionPayload['type']) => void
}

const TabSelect: FC<TabSelectProps> = ({ tabs, value, onClick }) => {
  return (
    <div className="tabs tabs-boxed w-full justify-between bg-gray-100 text-xs mb-6">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab text-gray-700 text-xs font-bold flex-1 cursor-pointer capitalize ${
            value === tab && 'bg-white rounded-lg'
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
