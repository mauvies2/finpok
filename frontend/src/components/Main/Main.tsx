import { useIsFetching } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'
import { Router } from 'finpoq/router/Router'
import { useUiState } from 'finpoq/store/ui/UiProvider'
import useBlockScroll from 'finpoq/hooks/useBlockScroll'

const override = css`
  position: fixed;
  top: 6rem;
  opacity: 0.5;
  right: 1rem;
  z-index: 100;
  display: block;
  margin: 0 auto;
`

const Main = () => {
  const isFetching = useIsFetching()
  const { isModalOpen } = useUiState()
  useBlockScroll(isModalOpen)

  return (
    <main className="overscroll-x-hidden dark:bg-dark mx-auto mt-20 min-h-[calc(100vh-5rem)] max-w-[1150px] bg-white p-4 text-sm transition-all">
      <ClipLoader loading={!!isFetching} size={30} css={override} />
      <Router />
    </main>
  )
}

export default Main
