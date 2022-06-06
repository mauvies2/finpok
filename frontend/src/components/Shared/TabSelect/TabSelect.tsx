import { TransacionPayload } from 'finpoq-core/types'
import { FC } from 'react'

type TabSelectProps = {
  value: string
  tabs: Array<string>
  onClick: (type: TransacionPayload['type']) => void
}

const TabSelect: FC<TabSelectProps> = ({ tabs, value, onClick }) => {
  return (
    <div className="tabs tabs-boxed dark:bg-dark-modal dark:text-dark-text mb-6 w-full justify-between bg-gray-100 text-xs">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab flex-1 cursor-pointer rounded-lg text-xs font-bold capitalize ${
            value === tab && 'dark:bg-dark rounded-lg bg-white'
          }`}
          tabIndex={0}
          onClick={() => onClick(tab as TransacionPayload['type'])}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

export default TabSelect
