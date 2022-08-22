import { IPortfolio } from 'finpoq/types'
import { useQueryClient } from 'react-query'

const useGetPortfolio = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<IPortfolio>('portfolio')
}

export default useGetPortfolio
