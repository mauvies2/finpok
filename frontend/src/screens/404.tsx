import Head from 'finpoq/components/shared/head'

const Page404 = () => {
  return (
    <>
      <Head title="Not found" />
      <div className="hero min-h-screen ">
        <div className="hero-content text-center text-3xl font-bold">
          <div>
            <h1>The page is not found.</h1>
            <div className="mt-4">
              <a href="/" className="link-primary">
                Top Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page404
