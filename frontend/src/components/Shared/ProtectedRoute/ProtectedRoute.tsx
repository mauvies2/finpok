import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactChild
  redirectTo: string
  path: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo, ...rest }) => {
  const { checkAuth } = useAuthDispatch()
  const { isLoggedIn } = useAuthState()

  const isAuth = async () => {
    await checkAuth()
  }

  useEffect(() => {
    isAuth()
  }, [])

  return <Route {...rest} render={() => (isLoggedIn ? children : <Redirect to={redirectTo} />)} />
}

export default ProtectedRoute
