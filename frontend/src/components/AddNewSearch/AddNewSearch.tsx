import { FC, KeyboardEvent, MouseEvent, useState } from 'react'
import searchFilter from 'finpok/utils/searchFilter'
import useGetCryptos from 'finpok/store/server/selectors/useGetCryptos'
import { ICrypto } from 'finpok-core/domain'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'

const AddNewSearch: FC = () => {
  // local state
  const [searchInput, setSearchInput] = useState<string>('')

  // computed
  const cryptos = useGetCryptos()
  const filteredCryptos = searchFilter<ICrypto>(cryptos, searchInput)
  const { selectCrypto, openModal } = useUiDispatch()

  // methods
  const handleSubmit = (e: MouseEvent<HTMLDivElement>, cryptoSymbol: string) => {
    e.preventDefault()
    selectCrypto(cryptoSymbol)
    openModal(`/portfolio/transaction-operation/${cryptoSymbol}`)
  }

  const hanldeInputKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const firstListItem = document.getElementById('item-0')
    if (e.key === '40' && firstListItem) {
      firstListItem.focus()
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === '40') {
      const nextListItem = document.getElementById(`item-${index + 1}`)
      nextListItem?.focus()
    }
    if (e.key === '38') {
      if (index === 0) {
        const input = document.getElementById('addNewSearch')
        input?.focus()
      }
      const previousListItem = document.getElementById(`item-${index - 1}`)
      previousListItem?.focus()
    }
    if (e.key === '13') {
      const listItem = document.getElementById(`item-${index}`)
      listItem?.click()
    }
  }

  return (
    <>
      <form className="mb-1" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control relative">
          <input
            id="addNewSearch"
            name="addNewSearch"
            type="text"
            value={searchInput}
            placeholder="Search"
            autoFocus
            autoComplete="off"
            className="input bg-[#F0F0F0] rounded-lg h-10 pl-10"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={hanldeInputKeyDown}
          />
          <button className="absolute pl-3 pt-[0.5rem] text-gray-400" tabIndex={-1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="relative overflow-y-scroll h-full p-2">
        {filteredCryptos.map((crypto, index) => (
          <div
            id={`item-${index}`}
            key={`${index}-${crypto.symbol}`}
            className="flex py-2 pl-3 items-center  rounded-lg my-1 hover:bg-gray-100 cursor-pointer"
            onClick={(e) => handleSubmit(e, crypto.symbol)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            tabIndex={0}
          >
            <img src={crypto.logoUrl} className="mr-3" width="17" alt="hola" />
            <div className="mr-3 font-bold text-sm">{crypto?.name === 'XRP' ? 'Ripple' : crypto.name}</div>
            <div className="text-xs font-bold text-gray-400">{crypto?.symbol}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AddNewSearch
