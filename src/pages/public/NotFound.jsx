import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <p className="text-7xl font-extrabold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;