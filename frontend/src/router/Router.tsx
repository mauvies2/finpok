import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import { useAuthState } from 'finpoq/store/auth/AuthProvider'
import ProtectedRoute from '../components/Shared/ProtectedRoute'
import TransactionDetail from '../components/TransactionDetail'
import EditTransaction from 'finpoq/components/EditTransaction'
import Modal from 'finpoq/components/Shared/Modal/Modal'
import Home from 'finpoq/screens/Home'
import Login from 'finpoq/screens/Login'
import Register from 'finpoq/screens/Register'
import Portfolio from 'finpoq/screens/Portfolio'
import PortfolioCryptoIndex from 'finpoq/components/PortfolioCryptoIndex/PortfolioCryptoIndex'
import OwnedCryptoDetail from 'finpoq/screens/OwnedCryptoDetail'
import AddNewSearch from 'finpoq/components/AddNewSearch'
import AddNewTransaction from 'finpoq/components/AddNewTransaction'
import Page404 from 'finpoq/screens/404'

export const Router = () => {
  const { isLoggedIn } = useAuthState()
  const location = useLocation()

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
        <Route
          path="portfolio/*"
          element={
            <ProtectedRoute redirectTo="/login">
              <Portfolio>
                <PortfolioRoutes />
              </Portfolio>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

const PortfolioRoutes = () => {
  const { pathname } = useLocation()

  return (
    <Routes>
      <Route index element={<PortfolioCryptoIndex />} />
      <Route
        path="transaction-operation/*"
        element={
          <>
            <PortfolioCryptoIndex />
            <Modal goBack={pathname.includes('select') ? 1 : 2}>
              <Routes>
                <Route path="select" element={<AddNewSearch />} />
                <Route path=":symbol" element={<AddNewTransaction goBack={2} />} />
              </Routes>
            </Modal>
          </>
        }
      />
      <Route
        path="add-new-transaction/:symbol"
        element={
          <>
            <PortfolioCryptoIndex />
            <Modal>
              <AddNewTransaction />
            </Modal>
          </>
        }
      />
      <Route path=":symbol/*" element={<OwnedCryptoRoutes />} />
    </Routes>
  )
}

const OwnedCryptoRoutes = () => {
  const { pathname } = useLocation()
  return (
    <>
      <OwnedCryptoDetail />
      <Routes>
        <Route
          path="transaction-operation"
          element={
            <Modal>
              <AddNewTransaction />
            </Modal>
          }
        />

        <Route
          path="transaction-detail/*"
          element={
            <Modal goBack={pathname.includes('edit') ? 2 : 1}>
              <Routes>
                <Route index element={<TransactionDetail />} />
                <Route path="edit" element={<EditTransaction />} />
              </Routes>
            </Modal>
          }
        />
      </Routes>
    </>
  )
}
