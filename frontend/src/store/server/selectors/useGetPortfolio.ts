import { useQueryClient } from 'react-query'
import { IPortfolio } from 'finpok-core/domain'

const useGetPortfolio = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<IPortfolio>('portfolio')
}

export default useGetPortfolio
