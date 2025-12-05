/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function ListingDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Load Single Listing by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch(() => {});
  }, [id]);

  if (!listing) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* IMAGE */}
      <img
        src={listing.image}
        alt={listing.name}
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      {/* TEXT DETAILS */}
      <h2 className="text-3xl font-bold mt-6">{listing.name}</h2>
      <p className="text-lg text-gray-700 mt-2">{listing.category}</p>
      <p className="text-gray-600 mt-2">{listing.location}</p>

      <p className="font-semibold text-xl mt-3">
        {listing.price === 0 ? (
          <span className="text-green-600">Free for Adoption</span>
        ) : (
          <span>${listing.price}</span>
        )}
      </p>

      <p className="mt-4 text-gray-700 leading-relaxed">
        {listing.description}
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Owner Email: <span className="font-medium">{listing.email}</span>
      </p>

      {/* ORDER BUTTON */}
      <button
        onClick={() => setOpenModal(true)}
        className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
      >
        Adopt / Order Now
      </button>

      {/* ORDER MODAL */}
      {openModal && <OrderModal listing={listing} user={user} closeModal={() => setOpenModal(false)} />}
    </div>
  );
}

/* ⭐ ORDER MODAL COMPONENT ⭐ */
function OrderModal({ listing, user, closeModal }) {
  const handleOrder = (e) => {
    e.preventDefault();

    const order = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user.displayName,
      email: user.email,
      quantity: listing.category === "Pets" ? 1 : e.target.quantity.value,
      price: listing.price,
      address: e.target.address.value,
      date: e.target.date.value,
      phone: e.target.phone.value,
      additionalNotes: e.target.notes.value,
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Order Submitted Successfully!");
        closeModal();
      })
      .catch(() => toast.error("Order failed"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        
        <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>

        <form onSubmit={handleOrder} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Buyer Name</label>
            <input type="text" value={user.displayName} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" value={user.email} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input type="text" value={listing.name} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              defaultValue={listing.category === "Pets" ? 1 : 1}
              readOnly={listing.category === "Pets"}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <input type="text" value={listing.price} readOnly className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <input type="text" name="address" required className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Pick-up Date</label>
            <input type="date" name="date" required className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input type="tel" name="phone" required className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <textarea name="notes" className="w-full border px-3 py-2 rounded"></textarea>
          </div>

          <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700">
            Submit Order
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full mt-2 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
