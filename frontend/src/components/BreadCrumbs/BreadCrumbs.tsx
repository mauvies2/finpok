import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'

const BreadCrumbs: FC = () => {
  const { closeOwnedCryptoDetail } = useUiDispatch()
  return (
    <section className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => closeOwnedCryptoDetail()}>
          <Link to="/portfolio">Portfolio</Link>
        </li>
      </ul>
    </section>
  )
}

export default BreadCrumbs
