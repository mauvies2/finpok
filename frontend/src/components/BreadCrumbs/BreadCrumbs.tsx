import React from 'react'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'

const BreadCrumbs = () => {
  const { closeOwnedCryptoDetail } = useUiDispatch()
  return (
    <section className='text-sm breadcrumbs'>
      <ul>
        <li>
          <a>Home</a>
        </li>
        <li onClick={() => closeOwnedCryptoDetail()}>
          <a>Portfolio</a>
        </li>
      </ul>
    </section>
  )
}

export default BreadCrumbs
