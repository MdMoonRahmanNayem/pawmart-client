/* eslint-disable */
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();

    const form = e.target;
    const listing = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,   // IMPORTANT
      date: form.date.value,
      email: user?.email, // auto fill
    };

    fetch("http://localhost:5000/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listing),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Listing Added Successfully!");
        navigate("/my-listings");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Listing</h2>

      <form onSubmit={handleAdd} className="space-y-4">

        <input name="name" type="text" placeholder="Name" required className="w-full border p-2 rounded" />

        <select name="category" required className="w-full border p-2 rounded">
          <option value="Pets">Pets</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>

        <input name="price" type="number" placeholder="Price (0 for pets)" required className="w-full border p-2 rounded" />

        <input name="location" type="text" placeholder="Location" required className="w-full border p-2 rounded" />

        <input name="image" type="text" placeholder="Image URL" required className="w-full border p-2 rounded" />

        <input name="date" type="date" required className="w-full border p-2 rounded" />

        <textarea name="description" placeholder="Description" required className="w-full border p-2 rounded" />

        <button className="bg-teal-600 text-white w-full py-2 rounded">
          Add Listing
        </button>
      </form>
    </div>
  );
}
