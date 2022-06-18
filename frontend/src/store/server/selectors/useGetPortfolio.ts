import { useQueryClient } from 'react-query'
import { IPortfolio } from 'finpoq-core/types'

const useGetPortfolio = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<IPortfolio>('portfolio')
}

export default useGetPortfolio
