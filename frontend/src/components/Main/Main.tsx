import { useIsFetching } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { Router } from 'finpok/router/Router'
import { css } from '@emotion/react'
import { FC } from 'react'
import { useUiState } from 'finpok/store/ui/UiProvider'
import useBlockScroll from 'finpok/hooks/useBlockScroll'

const override = css`
  position: fixed;
  top: 6rem;
  opacity: 0.5;
  right: 1rem;
  z-index: 100;
  display: block;
  margin: 0 auto;
`

const Main: FC = () => {
  const isFetching = useIsFetching()
  const { isModalOpen } = useUiState()
  useBlockScroll(isModalOpen)

  return (
    <main className="overscroll-x-hidden mx-auto mt-20 min-h-[calc(100vh-5rem)] max-w-[1220px] p-4 text-sm lg:px-8">
      <ClipLoader loading={!!isFetching} size={30} css={override} />
      <Router />
    </main>
  )
}

export default Main
