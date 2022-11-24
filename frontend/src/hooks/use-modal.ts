import { useNavigate } from 'react-router-dom'

export const useModal = () => {
  const navigate = useNavigate()

  const openModal = (route: string) => {
    navigate(route)
  }

  const closeModal = (goBack: number) => {
    navigate(-goBack)
  }

  return { openModal, closeModal }
}
