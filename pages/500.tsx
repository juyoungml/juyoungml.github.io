import type { NextPage } from 'next'
import Link from 'next/link'

const Custom500: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Server Error</h2>
        <p className="text-gray-600 mb-8">
          Sorry, something went wrong on our server. We're working to fix it.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default Custom500 