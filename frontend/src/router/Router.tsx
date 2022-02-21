import { lazy, Suspense } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import { useAuthState } from 'finpok/store/auth/AuthProvider'
import ProtectedRoute from '../components/Shared/ProtectedRoute'
import TransactionDetail from '../components/TransactionDetail'
import EditTransaction from 'finpok/components/EditTransaction'
import Modal from 'finpok/components/Shared/Modal/Modal'

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>

const Home = lazy(() => import('finpok/screens/Home'))
const Login = lazy(() => import('finpok/screens/Login'))
const Register = lazy(() => import('finpok/screens/Register'))
const Portfolio = lazy(() => import('finpok/screens/Portfolio'))
const Page404Screen = lazy(() => import('finpok/screens/404'))
const PortfolioCryptoIndex = lazy(() => import('finpok/components/PortfolioCryptoIndex'))
const OwnedCryptoDetail = lazy(() => import('finpok/screens/OwnedCryptoDetail'))
const AddNewSearch = lazy(() => import('finpok/components/AddNewSearch'))
const AddNewTransaction = lazy(() => import('finpok/components/AddNewTransaction'))

export const Router = () => {
  const { isLoggedIn } = useAuthState()

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={isLoggedIn ? <Navigate to="/portfolio" /> : <Login />} />
        <Route path="register" element={isLoggedIn ? <Navigate to="/portfolio" /> : <Register />} />
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

        <Route path="*" element={<Page404Screen />} />
      </Routes>
    </Suspense>
  )
}

const PortfolioRoutes = () => (
  <Routes>
    <Route index element={<PortfolioCryptoIndex />} />

    <Route
      path="transaction-operation/*"
      element={
        <PortfolioCryptoIndex>
          <Modal>
            <TransactionOperationRoutes />
          </Modal>
        </PortfolioCryptoIndex>
      }
    />

    <Route path=":symbol/*" element={<OwnedCryptoRoutes />} />
  </Routes>
)

const TransactionOperationRoutes = () => (
  <Routes>
    <Route path="select" element={<AddNewSearch />} />
    <Route path=":symbol" element={<AddNewTransaction />} />
  </Routes>
)

const OwnedCryptoRoutes = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <OwnedCryptoDetail>
          <Routes>
            <Route
              path="transaction-detail/*"
              element={
                <Modal closeModalIcon={false}>
                  <TransactionRoutes />
                </Modal>
              }
            />

            <Route
              path="transaction-operation"
              element={
                <Modal>
                  <AddNewTransaction />
                </Modal>
              }
            />
          </Routes>
        </OwnedCryptoDetail>
      }
    />
  </Routes>
)

const TransactionRoutes = () => (
  <Routes>
    <Route index element={<TransactionDetail />} />
    <Route path="edit" element={<EditTransaction />} />
  </Routes>
)
