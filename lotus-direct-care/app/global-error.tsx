'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}