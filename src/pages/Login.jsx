/* eslint-disable */
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { user, loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Already logged in → redirect home
  if (user) return <Navigate to="/" replace />;

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        navigate("/");
      })
      .catch(() => toast.error("Invalid email or password"));
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 px-4 py-2 rounded-md border focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 px-4 py-2 rounded-md border focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={() => {
            googleLogin().then(() => {
              toast.success("Login Successful!");
              navigate("/");
            });
          }}
          className="w-full mt-4 py-2 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Continue with Google
        </button>

        {/* Bottom Text */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <Link to="/register" className="text-teal-600 ml-1 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
