import { useIsFetching } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { Router } from 'finpoq/router/router'

const Main = () => {
  const isFetching = useIsFetching()

  return (
    <main className="overscroll-x-hidden dark:bg-dark mx-auto mt-20 min-h-[calc(100vh-5rem)] max-w-[1150px] bg-white p-4 transition-all">
      <div className="fixed top-[6rem] right-4 z-50 my-0 mx-auto opacity-30">
        <ClipLoader loading={!!isFetching} size={30} />
      </div>
      <Router />
    </main>
  )
}

export default Main
