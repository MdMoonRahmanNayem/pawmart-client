/* eslint-disable */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PetsAndSupplies() {
  const { categoryName } = useParams(); // ⭐ route থেকে category নিলাম

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

        // ⭐ যদি route এ category থাকে, অটোমেটিক filter হবে
        if (categoryName) {
          setCategory(categoryName);
        }
      })
      .catch(() => {});
  }, [categoryName]);

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

  useEffect(() => {
    applyFilters();
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by pet or product name..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full sm:w-1/4 px-4 py-2 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Pets">Pets (Adoption)</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Pet Care Products">Pet Care Products</option>

        </select>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">
        {categoryName ? `Category: ${categoryName}` : "Available Pets & Products"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filtered.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">No matching items found.</p>
        ) : (
          filtered.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg p-4">
              <img src={item.image} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.category}</p>
              <p className="text-gray-700">{item.location}</p>

              <p className="font-semibold">
                {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="block mt-2 bg-teal-600 text-white text-center py-2 rounded"
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
