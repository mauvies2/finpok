import { ICrypto } from 'finpoq-core/types'
import { fetchCryptos } from 'finpoq/services/portfolio-service'
import { useEffect, useState } from 'react'

const useSearchCryptos = (searchInput: string) => {
  const [cryptos, setCryptos] = useState<ICrypto[] | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const timeout = setTimeout(
      async () => {
        const cryptos = await fetchCryptos({ limit: 20, value: searchInput }, { signal: controller.signal })
        setCryptos(cryptos)
      },
      searchInput ? 400 : 0
    )

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [searchInput])

  return cryptos
}

export default useSearchCryptos
