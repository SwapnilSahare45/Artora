import logo from '../assets/logo.png';
import googleIcon from '../assets/google-logo.svg';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-auto bg-white md:h-screen">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center gap-4 py-8 px-2 md:p-8">
        <div className="flex flex-col items-center gap-1">
          <img src={logo} alt="ARTORA" className="w-28" />
          <h1 className="text-4xl tracking-widest text-primary">ARTORA</h1>
        </div>
        <p className="text-center text-gray-800 max-w-md">
          Sign up to join the Art Auction community and start bidding on your favorite pieces!
        </p>
      </div>

      {/* Right Panel */}
      <div className="bg-primary/90 flex flex-col justify-center items-center py-8 px-6">
        <h3 className="text-white text-3xl tracking-wider uppercase mb-8">Sign Up</h3>

        <div className="w-full max-w-md flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="button"
            className="bg-white text-primary uppercase font-bold tracking-wide py-2 rounded hover:bg-gray-100 transition"
          >
            Register
          </button>
        </div>

        {/* Sign up with Google */}
        <div className="mt-6 flex items-center gap-3 bg-white text-black px-4 py-2 rounded shadow cursor-pointer hover:bg-gray-100 transition">
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium">Sign up with Google</span>
        </div>

        <p className="mt-6 text-white text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline hover:text-gray-200">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
