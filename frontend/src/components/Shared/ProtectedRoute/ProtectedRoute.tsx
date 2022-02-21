import React, { useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactChild
  redirectTo: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
  const { checkAuth } = useAuthDispatch()
  const { isLoggedIn } = useAuthState()

  const isAuth = useCallback(async () => {
    await checkAuth()
  }, [checkAuth])

  useEffect(() => {
    isAuth()
  }, [isAuth])

  return <>{isLoggedIn ? children : <Navigate to={redirectTo} />}</>
}

export default ProtectedRoute
