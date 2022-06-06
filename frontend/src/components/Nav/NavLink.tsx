import useMediaQuery from 'finpoq/hooks/useMediaQuery'
import { FC, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface NavLinkProps {
  to: string
  icon: ReactElement
  children: ReactNode
}

const NavLink: FC<NavLinkProps> = ({ children, to, icon }) => {
  const isMobile = useMediaQuery()
  return (
    <Link
      to={to}
      className="md:rounded-btn flex h-16 w-full items-center justify-start rounded-[0] border-b-gray-500 pl-10 text-sm font-extralight md:h-12 md:w-auto md:justify-start md:border-none md:py-0 md:px-6"
    >
      {isMobile && <span className="mr-4">{icon}</span>}
      {children}
    </Link>
  )
}

export default NavLink
