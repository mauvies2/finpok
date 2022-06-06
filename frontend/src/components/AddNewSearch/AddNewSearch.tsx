import { FC, KeyboardEvent, MouseEvent, useState } from 'react'
import searchFilter from 'finpoq/utils/searchFilter'
import useGetCryptos from 'finpoq/store/server/selectors/useGetCryptos'
import { ICrypto } from 'finpoq/types'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'

const AddNewSearch: FC = () => {
  const [searchInput, setSearchInput] = useState('')

  const cryptos = useGetCryptos()
  const filteredCryptos = searchFilter<ICrypto>(cryptos, searchInput)
  const { selectCrypto, openModal } = useUiDispatch()

  // methods
  const handleSubmit = (e: MouseEvent<HTMLDivElement>, cryptoSymbol: string) => {
    e.preventDefault()
    selectCrypto(cryptoSymbol)
    openModal(`/portfolio/transaction-operation/${cryptoSymbol}`)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const firstListItem = document.getElementById('item-0')
    if (firstListItem && e.key === 'ArrowDown') {
      e.preventDefault()
      firstListItem.focus()
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    if (e.key === 'ArrowDown') {
      const nextListItem = document.getElementById(`item-${index + 1}`)
      nextListItem?.focus()
    }
    if (e.key === 'ArrowUp') {
      if (index === 0) {
        const input = document.getElementById('addNewSearch')
        input?.focus()
      }
      const previousListItem = document.getElementById(`item-${index - 1}`)
      previousListItem?.focus()
    }
    if (e.key === 'Enter' || e.key === ' ') {
      const listItem = document.getElementById(`item-${index}`)
      listItem?.click()
    }
  }

  return (
    <>
      <form className="pb-2 md:w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input
            id="addNewSearch"
            name="addNewSearch"
            type="text"
            value={searchInput}
            placeholder="Search"
            autoFocus
            autoComplete="off"
            className="focus:shadow-input dark:bg-dark-modal dark:border-dark-line  h-10 w-full rounded-full border border-gray-200 pl-10 focus:outline-none"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <div className="absolute pl-3 pt-[0.5rem] text-gray-400" tabIndex={-1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </form>
      <div className="h-full overflow-y-scroll md:max-h-[30rem]">
        {filteredCryptos.map((crypto, index) => (
          <div
            id={`item-${index}`}
            key={`${index}-${crypto.symbol}`}
            className="dark:hover:bg-dark-modal dark:focus-visible:bg-dark-modal my-[2px] flex cursor-pointer items-center rounded-lg py-3 pl-3 hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none"
            onClick={(e) => handleSubmit(e, crypto.symbol)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            tabIndex={-1}
          >
            <img src={crypto.logoUrl} className="mr-3" width="17" alt="hola" />
            <div className="mr-3 text-sm font-bold">{crypto?.name === 'XRP' ? 'Ripple' : crypto.name}</div>
            <div className="text-xs font-bold text-gray-400">{crypto?.symbol}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AddNewSearch
