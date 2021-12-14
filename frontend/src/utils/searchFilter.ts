interface Item {
  name: string
  symbol: string
}

const searchFilter = <T extends Item>(list: T[] | undefined, input: string) => {
  const filteredCryptos: T[] | null = []

  list?.forEach((item) => {
    if (item.name === 'XRP') item.name = 'Ripple'

    if (item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input)) {
      filteredCryptos.push(item)
    }
  })

  return filteredCryptos
}

export default searchFilter
