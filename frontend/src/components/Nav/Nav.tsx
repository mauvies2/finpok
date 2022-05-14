import { FC, useState } from 'react'
import NavAuthButtons from './NavAuthButtons'
import Button from '../Shared/Button'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import useBlockScroll from 'finpok/hooks/useBlockScroll'
import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { Suitcase2 } from '@styled-icons/remix-line/Suitcase2'
import { InfoSquare } from '@styled-icons/boxicons-regular/InfoSquare'
import { PermContactCalendar } from '@styled-icons/material-outlined/PermContactCalendar'
import useShowOnScroll from 'finpok/hooks/useShowOnScroll'
import Logo from '../Logo/Logo'

// TODO: fix top animation bug

type NavProps = {
  showOnScroll?: boolean
}

const Nav: FC<NavProps> = ({ showOnScroll = false }) => {
  const [isMobileMenuOpen, toggleMobileMenu] = useState(false)

  // computed
  const { top, position } = useShowOnScroll(showOnScroll)
  const isMobile = useMediaQuery()
  useBlockScroll(isMobileMenuOpen)

  const shouldShowNavMenu = !isMobile || (isMobile && isMobileMenuOpen)
  const showNavMenu = false

  return (
    <nav
      className="navbar absolute top-0 left-0 right-0 z-40 flex w-screen justify-center bg-white shadow"
      style={{ top, position }}
    >
      <div className="flex w-full max-w-[1370px] items-center justify-between">
        <div className="navbar-start z-20 flex md:w-1/3">
          <Link to="/" className="ml-4 text-lg font-bold">
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
              <NavLink to="portfolio" icon={<Suitcase2 size="24" />}>
                Portfolio
              </NavLink>
              <NavLink to="about" icon={<InfoSquare size="24" />}>
                About
              </NavLink>
              <NavLink to="contact" icon={<PermContactCalendar size="24" />}>
                Contact
              </NavLink>
            </div>
          )}
          <NavAuthButtons toggleMobileMenu={toggleMobileMenu} />
        </div>

        <div className="navbar-end mr-4 flex w-full md:hidden">
          <button name="search-btn" className="h-auto w-auto text-gray-500">
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
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
