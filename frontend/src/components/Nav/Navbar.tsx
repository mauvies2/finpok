import { FC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import useScroll from 'finpok/hooks/useScroll'
import Button from '../Shared/Button'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'

type NavbarProps = {
  showOnScroll?: boolean
}

const Navbar: FC<NavbarProps> = ({ showOnScroll = false }) => {
  const { isMobileMenuOpen } = useUiState()
  const { toggleMobileMenu } = useUiDispatch()
  const { scrollingUp } = useScroll()

  return (
    <nav
      className={classNames(
        'fixed navbar z-20 shadow-lg bg-neutral text-neutral-content w-screen flex justify-between items-center top-0 left-0 right-0',
        showOnScroll && scrollingUp ? 'fixed animate-nav' : 'absolute'
      )}>
      <div className='navbar-start ml-4 '>
        <Link to='/' className='text-lg font-bold'>
          Finpok
        </Link>
      </div>
      <div className='navbar-end mr-4 flex-none flex md:hidden'>
        <Button name='search-btn' className='btn btn-square btn-ghost w-auto h-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </Button>
        <Button
          name='menu-open-close-btn'
          className='btn btn-square btn-ghost w-auto ml-4 h-auto'
          onClick={() => toggleMobileMenu()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
