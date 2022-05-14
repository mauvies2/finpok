import classNames from 'classnames'
// import useMediaQuery from 'finpok/hooks/useMediaQuery'
import Button from '../Shared/Button'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { useLocation, Link } from 'react-router-dom'
import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { FC, useRef, useState } from 'react'
import useClickOutside from 'finpok/hooks/useClickOutside'

interface Props {
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavAuthButtons: FC<Props> = ({ toggleMobileMenu }) => {
  const [isAuthUserDetailsOpened, setIsAuthUserDetailOpened] = useState(false)
  const authUserButton = useRef<HTMLDivElement | null>(null)

  const { authUser, isLoggedIn } = useAuthState()
  const { logout } = useAuthDispatch()
  const currentLocation = useLocation()
  const isMobile = useMediaQuery()
  useClickOutside(authUserButton, () => setIsAuthUserDetailOpened(false))

  const isCurrentLocation = (path: string): boolean => currentLocation.pathname === `/${path}`

  return (
    <div
      className="md:mt-0 md:mr-4 md:flex md:h-12 md:flex-1 md:flex-row md:items-center md:justify-end md:px-0"
      onClick={() => toggleMobileMenu(false)}
    >
      {isLoggedIn ? (
        <div onClick={() => setIsAuthUserDetailOpened(!isAuthUserDetailsOpened)} ref={authUserButton}>
          <button className="w-12 overflow-hidden rounded-full border">
            <img src={authUser?.imageUrl} alt="" className="avatar" />
          </button>
          {isAuthUserDetailsOpened && (
            <div
              className="dropdown-content bg-base-100 min-w-40 absolute top-16 right-4 cursor-pointer rounded-lg p-3 text-center text-sm font-extralight font-bold text-red-500 shadow"
              onClick={logout}
            >
              <p>Logout</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {!isCurrentLocation('login') && (
            <Link to="/login" className="w-full md:w-auto" tabIndex={0}>
              {isCurrentLocation('register') || (isMobile && !isCurrentLocation('login')) ? (
                <Button
                  className={classNames(
                    'btn mt-2 w-full md:mt-0 md:mb-0',
                    isCurrentLocation('register') ? 'btn-primary' : 'btn-secondary'
                  )}
                  height="m"
                >
                  Login
                </Button>
              ) : (
                <p className="mr-4 text-sm hover:underline">Login</p>
              )}
            </Link>
          )}
          {!isCurrentLocation('register') && (
            <Link to="/register" className="w-full md:w-auto" tabIndex={-1}>
              <Button className="btn-light mt-2 w-full md:mt-0 md:w-auto" height="m">
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
