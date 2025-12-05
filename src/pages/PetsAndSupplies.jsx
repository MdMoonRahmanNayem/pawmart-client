/* eslint-disable */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PetsAndSupplies() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // LOAD ALL LISTINGS
  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFiltered(data);
      })
      .catch(() => {});
  }, []);

  // FILTER FUNCTION
  const applyFilters = () => {
    let result = [...listings];

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  };

  // APPLY FILTER ON CHANGE
  useEffect(() => {
    applyFilters();
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* 🔍 FILTER BAR */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by pet or product name..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="w-full sm:w-1/4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Pets">Pets (Adoption)</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>
      </div>

      {/* 🐾 TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-center">Available Pets & Products</h2>

      {/* GRID VIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filtered.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            No matching items found.
          </p>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 space-y-3 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                className="w-full h-48 object-cover rounded"
                alt={item.name}
              />
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-700 font-medium">{item.location}</p>

              <p className="font-semibold">
                {item.price === 0 ? (
                  <span className="text-green-600">Free for Adoption</span>
                ) : (
                  <span>${item.price}</span>
                )}
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="block bg-teal-600 text-white text-center py-2 rounded-md hover:bg-teal-700 transition"
              >
                See Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
