/* eslint-disable */
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/orders/user/${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => {});
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="text-center border-b">
                  <td className="py-3 px-4">{order.productName}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">${order.price}</td>
                  <td className="py-3 px-4">{order.address}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
