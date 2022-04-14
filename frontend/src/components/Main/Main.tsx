import { useIsFetching } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { Router } from 'finpok/router/Router'
import { css } from '@emotion/react'
import { FC } from 'react'
import { useUiState } from 'finpok/store/ui/UiProvider'
import useBlockScroll from 'finpok/hooks/useBlockScroll'

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
  const { isModalOpen } = useUiState()
  useBlockScroll(isModalOpen)

  return (
    <main className="max-w-screen overscroll-x-hidden mt-16 min-h-[90vh] p-4 text-sm">
      <ClipLoader loading={!!isFetching} size={30} css={override} />
      <Router />
    </main>
  )
}

export default Main
