/* eslint-disable */
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function AddListing() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddListing = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newListing = {
      name: form.name.value,
      category: form.category.value,
      price: form.price.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user?.email, // logged-in user email
    };

    try {
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListing),
      });

      const data = await res.json();
      if (data._id) {
        toast.success("Listing Added Successfully!");
        form.reset();
      } else {
        toast.error("Failed to add listing!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8 my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Listing</h2>

      <form onSubmit={handleAddListing} className="space-y-5">

        {/* Name */}
        <div>
          <label className="font-medium">Product/Pet Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            name="category"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Category</option>
            <option value="Pets">Pets (Adoption)</option>
            <option value="Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-medium">Price (0 for pets)</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            required
            placeholder="https://example.com/image.jpg"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="font-medium">Available Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Your Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition"
        >
          {loading ? "Adding..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
}
