import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Img } from 'react-image'
import Close from 'finpoq/assets/icons/Close'
import Button from 'finpoq/components/Shared/Button'
import { useAuthDispatch, useAuthState } from 'finpoq/store/auth/AuthProvider'
import useClickOutside from 'finpoq/hooks/useClickOutside'

interface Props {
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavAuthButtons = ({ toggleMobileMenu }: Props) => {
  const [isAuthUserDetailsOpened, setIsAuthUserDetailOpened] = useState(false)
  const [navButton, setNavButton] = useState<'close' | 'user' | 'buttons' | null>(null)
  const authUserButton = useRef<HTMLDivElement | null>(null)
  const isOpened = useCallback(() => setIsAuthUserDetailOpened(false), [])

  const { authUser, isLoggedIn } = useAuthState()
  const { logout } = useAuthDispatch()
  const currentLocation = useLocation()
  const navigate = useNavigate()
  useClickOutside(authUserButton, isOpened)

  useEffect(() => {
    const isCurrentLocation = (path: string): boolean => currentLocation.pathname === `/${path}`

    if (isCurrentLocation('login') || isCurrentLocation('register')) {
      setNavButton('close')
    } else if (isLoggedIn) {
      setNavButton('user')
    } else {
      setNavButton('buttons')
    }
  }, [currentLocation.pathname, isLoggedIn, navButton])

  return (
    <div
      className="flex md:mt-0 md:h-12 md:flex-1 md:flex-row md:items-center md:justify-end"
      onClick={() => toggleMobileMenu(false)}
    >
      {navButton === 'close' && (
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <Close />
        </div>
      )}

      {navButton === 'user' && (
        <div
          className="relative"
          onClick={() => setIsAuthUserDetailOpened(!isAuthUserDetailsOpened)}
          ref={authUserButton}
        >
          <button className="w-12 overflow-hidden rounded-full border dark:border-none">
            <Img
              src={
                authUser?.imageUrl ||
                'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
              }
            />
          </button>
          {isAuthUserDetailsOpened && (
            <ul className="menu dark:bg-dark-modal dark:border-dark-line dark:text-dark-text min-w-40 absolute top-14 right-4 cursor-pointer rounded-lg bg-white text-center text-sm font-extralight text-red-500 shadow dark:border">
              {!currentLocation.pathname.includes('portfolio') && (
                <li className="border-b p-3" onClick={() => navigate('/portfolio')}>
                  <p>Portfolio</p>
                </li>
              )}
              <li className="p-3  " onClick={logout}>
                <p>Logout</p>
              </li>
            </ul>
          )}
        </div>
      )}

      {navButton === 'buttons' && (
        <>
          <Link to="/login" className="mr-4 flex w-full items-center" tabIndex={0}>
            <p className="text-sm hover:underline">Login</p>
          </Link>
          <Link to="/register" className="w-full" tabIndex={-1}>
            <Button className="w-24 md:mt-0" btnType="secondary">
              Sign up
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

export default NavAuthButtons
