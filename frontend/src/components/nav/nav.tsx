import { useState } from 'react'
import NavAuthButtons from './nav-auth-buttons'
import { Link } from 'react-router-dom'
import NavLink from './nav-link'
import useBlockScroll from 'finpoq/hooks/utils/use-block-scroll'
import useMediaQuery from 'finpoq/hooks/use-media-query'
import Suitcase from 'finpoq/assets/icons/suitcase'
import Logo from 'finpoq/components/logo/logo'
import Toggle from 'finpoq/components/theme-toggle/theme-toggle'

// TODO: fix top animation bug

interface Props {
  showOnScroll?: boolean
}

const Nav = ({ showOnScroll = false }: Props) => {
  const [isMobileMenuOpen, toggleMobileMenu] = useState(false)

  // computed
  // const { top, position } = useShowOnScroll(showOnScroll)
  const isMobile = useMediaQuery()
  useBlockScroll(isMobileMenuOpen)

  const shouldShowNavMenu = !isMobile || (isMobile && isMobileMenuOpen)
  const showNavMenu = false

  return (
    <nav
      className="dark:bg-dark dark:border-dark-line absolute top-0 left-0 right-0 z-40 flex h-20 w-screen justify-center bg-white shadow dark:border-b"
      // style={{ top, position }}
    >
      <div className="flex w-full max-w-[1150px] items-center justify-between px-5">
        <div className="z-20 w-auto">
          <Link to="/" className="text-lg font-bold">
            <Logo />
          </Link>
        </div>

        <div
          className={
            shouldShowNavMenu
              ? 'animate-navMobileMenu fixed left-0 right-0 top-0 flex h-screen flex-1 flex-col justify-between p-4 pt-20 md:static md:z-40 md:h-12 md:flex-row md:justify-between md:p-0'
              : 'hidden'
          }
        >
          {showNavMenu && (
            <div
              className="flex flex-col items-start justify-between md:flex-row"
              onClick={() => toggleMobileMenu(false)}
            >
              <NavLink to="portfolio" icon={<Suitcase />}>
                Portfolio
              </NavLink>
              <NavLink to="about" icon={<Suitcase />}>
                About
              </NavLink>
              <NavLink to="contact" icon={<Suitcase />}>
                Contact
              </NavLink>
            </div>
          )}
        </div>

        <div className="flex">
          <Toggle />
          <NavAuthButtons toggleMobileMenu={toggleMobileMenu} />
          {/* <button name="search-btn" className="h-auto w-auto text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button
            name="menu-open-close-btn text-gray-500"
            className="z-50 ml-4 h-auto w-auto"
            onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button> */}
        </div>
      </div>
    </nav>
  )
}

export default Nav
