import React, { useCallback, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactChild
  redirectTo: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
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
