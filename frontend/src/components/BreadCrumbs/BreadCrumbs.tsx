import { FC } from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs: FC = () => {
  return (
    <section className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
      </ul>
    </section>
  )
}

export default BreadCrumbs
