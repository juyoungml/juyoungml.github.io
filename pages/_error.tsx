import type { NextPage, NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p className="text-gray-600 mb-4">
          We apologize for the inconvenience. Please try again later.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 