import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { FC, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { StyledIcon } from '@styled-icons/styled-icon'

interface NavLinkProps {
  to: string
  icon: ReactElement<StyledIcon>
  children: ReactNode
}

const NavLink: FC<NavLinkProps> = ({ children, to, icon }) => {
  const isMobile = useMediaQuery()
  return (
    <Link
      to={to}
      className="btn btn-sm rounded-[0] md:rounded-btn font-extralight text-sm h-16 border-b-gray-500 justify-start pl-10 w-full md:border-none md:py-0 md:justify-start md:h-12 md:w-auto md:px-6"
    >
      {isMobile && <span className="mr-4">{icon}</span>}
      {children}
    </Link>
  )
}

export default NavLink
