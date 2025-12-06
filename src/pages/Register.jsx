/* eslint-disable */
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const { user, registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Already logged in → redirect home
  if (user) return <Navigate to="/" replace />;

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
    if (!/[A-Z]/.test(password))
      return toast.error("Password must contain at least one uppercase letter");

    if (!/[a-z]/.test(password))
      return toast.error("Password must contain at least one lowercase letter");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    registerUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          toast.success("Account Created!");
          navigate("/");
        });
      })
      .catch(() => toast.error("Registration failed!"));
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div>
            <label className="font-medium text-sm">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 px-4 py-2 rounded-md border focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium text-sm">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full mt-1 px-4 py-2 rounded-md border focus:ring-2 focus:ring-teal-500"
            />
          </div>

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

          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={() => {
            googleLogin().then(() => {
              toast.success("Register Successful!");
              navigate("/");
            });
          }}
          className="w-full mt-4 py-2 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-teal-600 ml-1 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
