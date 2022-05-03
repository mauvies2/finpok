import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumbs: FC = () => {
  const { pathname } = useLocation()

  const locations = pathname.split('/').slice(1)

  return (
    <section className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {locations.map((loc) => (
          <li key={loc}>
            {loc === 'portfolio' ? (
              <Link to="/portfolio">{loc.replace(loc[0], loc[0].toUpperCase())}</Link>
            ) : (
              <div>{loc.replace(loc[0], loc[0].toUpperCase())}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BreadCrumbs
