import classNames from 'classnames'
// import useMediaQuery from 'finpok/hooks/useMediaQuery'
import Button from '../Shared/Button'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { useLocation, Link } from 'react-router-dom'
import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { FC } from 'react'

interface Props {
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavAuthButtons: FC<Props> = ({ toggleMobileMenu }) => {
  const { isLoggedIn } = useAuthState()
  const { logout } = useAuthDispatch()

  const currentLocation = useLocation()

  const isMobile = useMediaQuery()
  const isCurrentLocation = (path: string): boolean => currentLocation.pathname === `/${path}`

  return (
    <div
      className="md:flex md:items-center md:justify-end md:px-0 md:mt-0 md:flex-1 md:h-12 md:flex-row md:mr-4"
      onClick={() => toggleMobileMenu(false)}
    >
      {isLoggedIn ? (
        <Button onClick={logout} className="btn btn-primary w-full md:w-auto" height="m">
          Logout
        </Button>
      ) : (
        <>
          {!isCurrentLocation('login') && (
            <Link to="/login" className="w-full md:w-auto ">
              {isCurrentLocation('register') || (isMobile && !isCurrentLocation('login')) ? (
                <Button
                  className={classNames(
                    'btn w-full mt-2 md:mt-0 md:mb-0',
                    isCurrentLocation('register') ? 'btn-primary' : 'btn-secondary'
                  )}
                  height="m"
                >
                  Login
                </Button>
              ) : (
                <p className="text-sm hover:underline mr-4">Login</p>
              )}
            </Link>
          )}
          {!isCurrentLocation('register') && (
            <Link to="/register" className="w-full md:w-auto">
              <Button className="btn mt-2 md:mt-0 btn-primary w-full md:w-auto" height="m">
                Sign up
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  )
}

export default NavAuthButtons
