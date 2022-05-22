import Button from '../Shared/Button'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FC, useEffect, useRef, useState } from 'react'
import useClickOutside from 'finpok/hooks/useClickOutside'

interface Props {
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavAuthButtons: FC<Props> = ({ toggleMobileMenu }) => {
  const [isAuthUserDetailsOpened, setIsAuthUserDetailOpened] = useState(false)
  const [navButton, setNavButton] = useState<'close' | 'user' | 'buttons' | null>(null)
  const authUserButton = useRef<HTMLDivElement | null>(null)

  const { authUser, isLoggedIn } = useAuthState()
  const { logout } = useAuthDispatch()
  const currentLocation = useLocation()
  const navigate = useNavigate()
  useClickOutside(authUserButton, () => setIsAuthUserDetailOpened(false))

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current text-gray-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}

      {navButton === 'user' && (
        <div
          className="relative"
          onClick={() => setIsAuthUserDetailOpened(!isAuthUserDetailsOpened)}
          ref={authUserButton}
        >
          <button className="w-12 overflow-hidden rounded-full border">
            <img src={authUser?.imageUrl} alt="" className="avatar" />
          </button>
          {isAuthUserDetailsOpened && (
            <ul className="dropdown-content bg-base-100 min-w-40 absolute top-16 right-4 cursor-pointer rounded-lg text-center text-sm font-extralight shadow">
              {!currentLocation.pathname.includes('portfolio') && (
                <li className="border-b p-3 hover:bg-gray-50" onClick={() => navigate('/portfolio')}>
                  <p>Portfolio</p>
                </li>
              )}
              <li className="p-3 text-red-500 hover:bg-gray-50 " onClick={logout}>
                <p>Logout</p>
              </li>
            </ul>
          )}
        </div>
      )}

      {navButton === 'buttons' && (
        <>
          <Link to="/login" className="flex w-full items-center" tabIndex={0}>
            <p className="mr-4 text-sm hover:underline">Login</p>
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
