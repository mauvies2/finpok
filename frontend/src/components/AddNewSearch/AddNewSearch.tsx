import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import { useUiDispatch } from 'finpoq/store/ui/UiProvider'
import { fetchCryptos } from 'finpoq/services/ApiService'
import { ICrypto } from 'finpoq-core/types'
import Search from 'finpoq/assets/icons/Search'

const AddNewSearch = () => {
  const [searchInput, setSearchInput] = useState('')
  const [cryptos, setCryptos] = useState<ICrypto[] | null>(null)

  const { selectCrypto, openModal } = useUiDispatch()

  const handleSubmit = (e: MouseEvent<HTMLDivElement>, crypto: ICrypto) => {
    e.preventDefault()

    selectCrypto({
      symbol: crypto.symbol,
      name: crypto.name,
      logoUrl: crypto.logoUrl,
      price: crypto.quote.USD.price,
    })

    openModal(`/portfolio/transaction-operation/${crypto.symbol}`)
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

  useEffect(() => {
    const controller = new AbortController()

    const timeout = setTimeout(
      async () => {
        const cryptos = await fetchCryptos(
          {
            limit: 20,
            value: searchInput,
          },
          { signal: controller.signal }
        )

        setCryptos(cryptos)
      },
      searchInput ? 400 : 0
    )

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [searchInput])

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
            className="dark:bg-dark-modal dark:border-dark-line h-10 w-full rounded-full border border-gray-200 pl-10  focus:outline-none"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <div className="absolute pl-3 pt-[0.6rem] text-gray-400" tabIndex={-1}>
            <Search />
          </div>
        </div>
      </form>
      <div className="h-full overflow-y-scroll">
        {cryptos?.map((crypto, index) => (
          <div
            id={`item-${index}`}
            key={`${index}-${crypto.symbol}`}
            className="dark:hover:bg-dark-modal dark:focus-visible:bg-dark-modal my-[2px] flex cursor-pointer items-center rounded-lg py-3 pl-3 hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none"
            onClick={(e) => handleSubmit(e, crypto)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            tabIndex={-1}
          >
            <img src={crypto.logoUrl} className="mr-3" width="17" alt={crypto.slug} />
            <div className="mr-3 text-sm font-bold">{crypto.name}</div>
            <div className="text-xs font-bold text-gray-400">{crypto.symbol}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AddNewSearch
