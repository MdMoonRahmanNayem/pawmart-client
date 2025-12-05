import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-teal-600 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/download.png" className="w-10" alt="logo" />
          <span className="text-2xl font-bold text-white">PawMart</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          <NavLink to="/" className="hover:text-white">Home</NavLink>
          <NavLink to="/pets-supplies" className="hover:text-white">Pets & Supplies</NavLink>

          {user && (
            <>
              <NavLink to="/add-listing" className="hover:text-white">Add Listing</NavLink>
              <NavLink to="/my-listings" className="hover:text-white">My Listings</NavLink>
              <NavLink to="/my-orders" className="hover:text-white">My Orders</NavLink>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/7WBSQ9y/default-avatar.png"}
                className="w-10 h-10 rounded-full border"
              />
              <button
                onClick={logoutUser}
                className="text-red-600 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 flex flex-col gap-4 text-lg">

          <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-teal-700">
            Home
          </NavLink>

          <NavLink to="/pets-supplies" onClick={() => setOpen(false)} className="hover:text-teal-700">
            Pets & Supplies
          </NavLink>

          {user && (
            <>
              <NavLink to="/add-listing" onClick={() => setOpen(false)} className="hover:text-teal-700">
                Add Listing
              </NavLink>

              <NavLink to="/my-listings" onClick={() => setOpen(false)} className="hover:text-teal-700">
                My Listings
              </NavLink>

              <NavLink to="/my-orders" onClick={() => setOpen(false)} className="hover:text-teal-700">
                My Orders
              </NavLink>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-teal-700">
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/7WBSQ9y/default-avatar.png"}
                className="w-10 h-10 rounded-full border"
              />

              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                className="text-red-600 font-semibold text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
