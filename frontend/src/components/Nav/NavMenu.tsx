import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { FC } from 'react'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'
import useBlockScroll from 'finpok/hooks/useBlockScroll'
// import useScroll from 'finpok/hooks/useScroll'

const NavMenu: FC = () => {
  // client state
  const { isMobileMenuOpen } = useUiState()
  const { isLoggedIn } = useAuthState()

  // actions
  const { toggleMobileMenu } = useUiDispatch()
  const { logout } = useAuthDispatch()

  // computed
  const { isMobile } = useMediaQuery()
  const currentLocation = useLocation()
  const isCurrentLocation = (path: string): boolean => currentLocation.pathname === `/${path}`

  useBlockScroll(isMobileMenuOpen)

  return (
    <div
      className={classNames(
        !isMobile || (isMobile && isMobileMenuOpen)
          ? 'fixed left-0 right-0 top-0 h-screen flex flex-col z-10 md:h-16 md:z-40 pt-20 md:pt-0 bg-neutral text-white md:ml-32 md:flex-row md:justify-between'
          : 'hidden'
        // scrollingUp ? 'fixed animate-nav' : 'absolute',
      )}
    >
      <div
        className="relative md:flex md:justify-between md:w-full"
        onClick={() => toggleMobileMenu()}
      >
        <div className="flex-row justify-start items-center md:flex-1 md:flex">
          <Link
            to="/portfolio"
            className="btn btn-ghost btn-sm rounded-btn justify-start pl-6 h-16 w-full md:w-auto md:px-6"
          >
            Portfolio
          </Link>
          <Link
            to=""
            className="btn btn-ghost btn-sm rounded-btn justify-start pl-6 h-16 w-full md:w-auto md:px-6"
          >
            About
          </Link>
          <Link
            to=""
            className="btn btn-ghost btn-sm rounded-btn justify-start pl-6 h-16 w-full md:w-auto md:px-6"
          >
            Contact
          </Link>
        </div>
        <div className="px-6 mt-8 w-full md:px-0 md:mt-0 md:flex-1 md:h-16 flex flex-col md:flex-row items-center md:justify-end md:mr-4">
          {!isLoggedIn ? (
            <>
              {!isCurrentLocation('login') && (
                <Link to="/login" className="w-full md:w-auto mb-4 md:mb-0 md:mr-4">
                  <button
                    className={classNames(
                      'btn w-full',
                      isCurrentLocation('register') ? 'btn-primary' : 'btn-secondary'
                    )}
                  >
                    Login
                  </button>
                </Link>
              )}
              {!isCurrentLocation('register') && (
                <Link to="/register" className="w-full md:w-auto">
                  <button className="btn btn-primary w-full md:w-auto">Register</button>
                </Link>
              )}
            </>
          ) : (
            <button onClick={logout} className="btn btn-primary w-full md:w-auto">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavMenu
