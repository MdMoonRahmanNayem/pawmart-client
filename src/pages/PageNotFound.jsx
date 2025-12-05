export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Go Back Home
      </a>
    </div>
  );
}
