import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-7xl font-extrabold text-primary mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Sorry, we couldn’t find the page you’re looking for. It might have been removed or renamed.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
      >
        Go to Homepage
      </Link>
    </main>
  );
};

export default NotFound;
