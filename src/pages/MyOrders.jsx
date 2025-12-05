/* eslint-disable */
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [user]);

  // -------------------------
  // PDF DOWNLOAD FUNCTION (NO LOGO)
  // -------------------------
  const downloadPDF = () => {
    const doc = new jsPDF();

    // ---- Title ----
    doc.setFontSize(18);
    doc.text("PawMart - My Orders Report", 14, 20);

    // ---- User Info ----
    doc.setFontSize(12);
    doc.text(`User: ${user?.displayName || "Unknown User"}`, 14, 30);
    doc.text(`Email: ${user?.email}`, 14, 37);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 44);

    // ---- Table ----
    autoTable(doc, {
      startY: 55,
      head: [["Product Name", "Price", "Qty", "Address", "Date", "Phone"]],
      body: orders.map((o) => [
        o.productName,
        `$${o.price}`,
        o.quantity,
        o.address,
        o.date,
        o.phone,
      ]),
    });

    doc.save("My_Orders_Report.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-teal-700"
      >
        Download PDF Report
      </button>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="p-2">Product Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Phone</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b">
                <td className="p-2">{o.productName}</td>
                <td className="p-2">${o.price}</td>
                <td className="p-2">{o.quantity}</td>
                <td className="p-2">{o.address}</td>
                <td className="p-2">{o.date}</td>
                <td className="p-2">{o.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
