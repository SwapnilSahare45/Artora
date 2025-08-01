import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import validator from "validator";
import { toast } from "react-toastify";

const Register = () => {

  // State to hold user input values
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  // State to hold validation errors
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })

  // States from auth store
  const { register, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  // Function to handle new user registeration
  const handleRegister = async () => {
    // object to store validation error
    const newErrors = { name: '', email: '', password: '' };

    // Validation
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validator.isEmail(user.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validator.isStrongPassword(user.password)) {
      newErrors.password = "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol.";
    }

    setErrors(newErrors);
    // Check there is any error in validation error object, if yes then return
    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) return;

    const { success } = await register(user);

    // Check the registeration is successful
    // if yes the navigate to verify to verify user else show an error
    if (success) {
      toast.success('Verification code sent to your email.');
      navigate("/verify");
    } else {
      toast.error(error || "Something went wrong!");
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-auto bg-white md:h-screen">

      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center gap-4 py-8 px-2 md:p-8">
        <div className="flex flex-col items-center gap-1">
          {/* Logo */}
          <img
            src={logo}
            alt="ARTORA"
            className="w-28"
          />
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
          {/* Name input */}
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {errors.name && <p className='-mt-3 pl-1 text-sm text-red-600'>{errors.name}</p>}

          {/* Email input */}
          <input
            type="email"
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

          {/* Register button */}
          <button
            type="button"
            className="bg-white text-primary uppercase font-bold tracking-wide py-2 rounded hover:bg-gray-100 transition"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>

        {/* Login link */}
        <p className="mt-6 text-white text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="underline hover:text-gray-200"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;