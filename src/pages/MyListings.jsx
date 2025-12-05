/* eslint-disable */
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  // For Edit Modal
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch user listings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/listings/my?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => {});
  }, [user]);

  // Delete Listing
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    fetch(`http://localhost:5000/api/listings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Listing Deleted!");
        setListings(listings.filter((item) => item._id !== id));
      });
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      location: e.target.location.value,
      description: e.target.description.value,
      date: e.target.date.value,
      image: e.target.image.value,
    };

    fetch(`http://localhost:5000/api/listings/${editingItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Listing Updated!");

        // Update UI instantly
        setListings((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );

        setModalOpen(false);
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {listings.map((item) => (
                <tr key={item._id} className="border text-center">
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">
                    {item.price === 0 ? "Free" : `$${item.price}`}
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-3">
                    {/* EDIT */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ======================= EDIT MODAL ======================= */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Listing
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                type="text"
                name="name"
                defaultValue={editingItem.name}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <select
                name="category"
                defaultValue={editingItem.category}
                className="w-full border px-3 py-2 rounded"
              >
                <option>Pets</option>
                <option>Pet Food</option>
                <option>Accessories</option>
                <option>Care Products</option>
              </select>

              <input
                type="number"
                name="price"
                defaultValue={editingItem.price}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                name="location"
                defaultValue={editingItem.location}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <textarea
                name="description"
                defaultValue={editingItem.description}
                className="w-full border px-3 py-2 rounded"
                rows="3"
              />

              <input
                type="date"
                name="date"
                defaultValue={editingItem.date}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                name="image"
                defaultValue={editingItem.image}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Update
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
