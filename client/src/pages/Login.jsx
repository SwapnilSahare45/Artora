import logo from '../assets/logo.png';
import googleIcon from '../assets/google-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import validator from "validator";
import { toast } from 'react-toastify';

const Login = () => {
  // State to hold user input
  const [user, setUser] = useState({ email: '', password: '' });
  // State to hold validation error
  const [errors, setErrors] = useState({ email: '', password: '' });

  // States from auth store
  const { login, error, isLoading } = useAuthStore();

  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async () => {
    const newErrors = { email: '', password: '' };

    // Validation
    if (!user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validator.isEmail(user.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!user.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    // Check there is any error in validation error object, if yes then return
    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) return;

    const { success } = await login(user);

    // Check user login successful
    // if yes navigate to artwork else show an error
    if (success) {
      toast.success("Login successful.");
      navigate("/artworks")
    } else {
      toast.error(error || "Something went wrong!");
    }
  }

  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 h-auto bg-white md:h-screen"
    >
      {/* Left Panel */}
      <div
        className="flex flex-col justify-center items-center gap-4 py-8 px-2 md:p-8"
      >
        <div
          className="flex flex-col items-center gap-1"
        >
          {/* Logo */}
          <img
            src={logo}
            alt="ARTORA"
            className="w-28"
          />
          <h1
            className="text-4xl tracking-widest text-primary"
          >
            ARTORA
          </h1>
        </div>

        <p
          className="text-center text-gray-700 max-w-md"
        >
          Sign in to access your account and start bidding on exclusive art pieces!
          Discover, connect, participate, enjoy, and win!
        </p>
      </div>

      {/* Right Panel */}
      <div
        className="bg-primary/90 flex flex-col justify-center items-center py-8 px-6"
      >
        <h3
          className="text-white text-3xl tracking-wider uppercase mb-8"
        >
          Sign In
        </h3>

        {/* Input fields */}
        <div
          className="w-full max-w-md flex flex-col gap-4"
        >
          {/* Email input */}
          <input
            type="text"
            placeholder="Email"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && <p className='-mt-3 pl-1 text-sm text-red-600'>{errors.email}</p>}

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && <p className='-mt-3 pl-1 text-sm text-red-600'>{errors.password}</p>}

          {/* Login button */}
          <button
            type="button"
            className="bg-white text-primary uppercase font-bold tracking-wide py-2 rounded hover:bg-gray-100 transition"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </div>

        {/* Sign in with Google */}
        <div
          className="mt-6 flex items-center gap-3 bg-white text-black px-4 py-2 rounded shadow cursor-pointer hover:bg-gray-100 transition"
        >
          <img
            src={googleIcon}
            alt="Google" className="w-5 h-5"
          />
          <span
            className="text-sm font-medium"
          >
            Sign in with Google
          </span>
        </div>

        {/* Register link */}
        <p
          className="mt-6 text-white text-sm"
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            className="underline hover:text-gray-200"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;