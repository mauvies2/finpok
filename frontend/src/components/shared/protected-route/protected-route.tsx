import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpoq/store/auth/auth-provider'

interface Props {
  children: React.ReactChild
  redirectTo: string
}

const ProtectedRoute = ({ children, redirectTo }: Props) => {
  const { checkAuth } = useAuthDispatch()
  const { isLoggedIn } = useAuthState()
  const location = useLocation()

  useEffect(() => {
    ;(async () => await checkAuth())()
  }, [checkAuth])

  return <>{isLoggedIn ? children : <Navigate to={redirectTo} state={{ from: location }} replace />}</>
}

export default ProtectedRoute
