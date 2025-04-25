import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Your Name - Personal Website</title>
        <meta name="description" content="Personal website showcasing research and projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg mb-4">
          I am an M.S. student passionate about [your field]. This website showcases my research,
          publications, and projects.
        </p>
      </main>
    </div>
  )
} 