import { lazy, Suspense, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import ProtectedRoute from '../components/Shared/ProtectedRoute'

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>

const Home = lazy(() => import('finpok/screens/Home'))
const Login = lazy(() => import('finpok/screens/Login'))
const Register = lazy(() => import('finpok/screens/Register'))
const Portfolio = lazy(() => import('finpok/screens/Portfolio'))
const Page404Screen = lazy(() => import('finpok/screens/404'))

export const Router = () => {
  const { clearErrors } = useAuthDispatch()
  const { isLoggedIn, error } = useAuthState()
  const history = useHistory()

  useEffect(() => {
    const unlisten = history.listen(() => {
      error && clearErrors()
    })

    return () => unlisten()
  }, [clearErrors, error, history])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login" render={() => (isLoggedIn ? <Redirect to="/portfolio" /> : <Login />)} />
        <Route path="/register" render={() => (isLoggedIn ? <Redirect to="/portfolio" /> : <Register />)} />
        <ProtectedRoute path="/portfolio" redirectTo="/login">
          <Portfolio />
        </ProtectedRoute>
        <Route path="*">
          <Page404Screen />
        </Route>
      </Switch>
    </Suspense>
  )
}
