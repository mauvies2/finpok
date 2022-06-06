import { useCallback, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpoq/store/auth/AuthProvider'

interface Props {
  children: React.ReactChild
  redirectTo: string
}

const ProtectedRoute = ({ children, redirectTo }: Props) => {
  const { checkAuth } = useAuthDispatch()
  const { isLoggedIn } = useAuthState()
  const location = useLocation()

  const isAuth = useCallback(async () => {
    await checkAuth()
  }, [checkAuth])

  useEffect(() => {
    isAuth()
  }, [isAuth])

  return <>{isLoggedIn ? children : <Navigate to={redirectTo} state={{ from: location }} replace />}</>
}

export default ProtectedRoute
