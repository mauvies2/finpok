import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import { useAuthState } from 'finpoq/store/auth/auth-provider'
import ProtectedRoute from 'finpoq/components/shared/protected-route'
import TransactionDetail from 'finpoq/components/transaction-detail'
import EditTransaction from 'finpoq/components/edit-transaction'
import Modal from 'finpoq/components/shared/modal/modal'
import Home from 'finpoq/screens/home'
import Login from 'finpoq/screens/login'
import Register from 'finpoq/screens/register'
import Portfolio from 'finpoq/screens/portfolio'
import PortfolioCryptoIndex from 'finpoq/components/portfolio-crypto-index/portfolio-crypto-index'
import OwnedCryptoDetail from 'finpoq/screens/owned-crypto'
import AddNewSearch from 'finpoq/components/add-new-search'
import AddNewTransaction from 'finpoq/components/add-new-transaction'
import Page404 from 'finpoq/screens/404'

export const Router = () => {
  const { isLoggedIn } = useAuthState()
  const location = useLocation()
  const { pathname } = useLocation()

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/portfolio" state={{ from: location }} replace /> : <Home />}
        />
        <Route
          path="login"
          element={isLoggedIn ? <Navigate to="/portfolio" state={{ from: location }} replace /> : <Login />}
        />
        <Route
          path="register"
          element={isLoggedIn ? <Navigate to="/portfolio" state={{ from: location }} replace /> : <Register />}
        />
        <Route path="portfolio" element={<ProtectedRoute children={<Portfolio />} redirectTo="/login" />}>
          <Route path="" element={<PortfolioCryptoIndex />}>
            <Route path="transaction-operation" element={<Modal goBack={pathname.includes('select') ? 1 : 2} />}>
              <Route path="select" element={<AddNewSearch />} />
              <Route path=":symbol" element={<AddNewTransaction goBack={2} />} />
            </Route>
            <Route path="add-new-transaction" element={<Modal />}>
              <Route path=":symbol" element={<AddNewTransaction />} />
            </Route>
          </Route>
          <Route path=":symbol" element={<OwnedCryptoDetail />}>
            <Route path="transaction-operation" element={<Modal />}>
              <Route index element={<AddNewTransaction />} />
            </Route>
            <Route path="transaction-detail/:id" element={<Modal goBack={pathname.includes('edit') ? 2 : 1} />}>
              <Route index element={<TransactionDetail />} />
              <Route path="edit" element={<EditTransaction />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}
