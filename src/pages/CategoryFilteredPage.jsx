/* eslint-disable */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryFilteredPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);

  const [allListings, setAllListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setAllListings(data);

        // 🔥 EXACT MATCH FILTERING after decoding
        const result = data.filter(
          (item) =>
            item.category.toLowerCase() === decodedCategory.toLowerCase()
        );

        setFiltered(result);
      });
  }, [decodedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Category: {decodedCategory}
      </h2>

      {/* GRID VIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">
            No items found in this category.
          </p>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image.startsWith("http") 
                  ? item.image 
                  : `http://localhost:5000/uploads/${item.image}`
                }
                className="w-full h-48 object-cover rounded"
                alt={item.name}
              />
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-700">{item.location}</p>
              <p className="font-semibold">
                {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="block bg-teal-600 text-white text-center py-2 rounded hover:bg-teal-700"
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
