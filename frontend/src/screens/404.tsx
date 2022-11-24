import Head from 'finpoq/components/shared/head'

const Page404 = () => {
  return (
    <>
      <Head title="Not found" />
      <div className="flex min-h-[calc(100vh-7rem)] max-w-[1150px] flex-col justify-center py-2 text-center text-3xl font-bold md:py-8">
        <h1>The page is not found.</h1>
        <div className="mt-4">
          <a href="/" className="link-primary">
            Go to home page
          </a>
        </div>
      </div>
    </>
  )
}

export default Page404
