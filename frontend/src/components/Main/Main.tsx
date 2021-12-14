import { useIsFetching } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { Router } from 'finpok/router/Router'
import { css } from '@emotion/react'
import { FC } from 'react'

const override = css`
  position: fixed;
  top: 5rem;
  opacity: 0.5;
  right: 0.5rem;
  z-index: 100;
  display: block;
  margin: 0 auto;
`

const Main: FC = () => {
  const isFetching = useIsFetching()

  return (
    <main className="max-w-screen mt-16 overscroll-x-hidden">
      <ClipLoader loading={!!isFetching} size={30} css={override} />
      <Router />
    </main>
  )
}

export default Main
