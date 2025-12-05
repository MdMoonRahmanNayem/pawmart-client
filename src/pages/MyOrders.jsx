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
// PREMIUM COLORFUL PDF (NO LOGO)
// -------------------------
const downloadPDF = () => {
  const doc = new jsPDF("p", "pt", "a4");

  const primary = "#009688";   // Teal
  const light = "#e0f2f1";     // Light teal
  const dark = "#004d40";      // Deep green text

  // ===== HEADER BAR =====
  doc.setFillColor(primary);
  doc.rect(0, 0, 600, 60, "F");

  doc.setFontSize(22);
  doc.setTextColor("#ffffff");
  doc.text("PawMart — My Orders Report", 30, 38);

  // ===== USER INFO BOX =====
  doc.setFillColor(light);
  doc.roundedRect(20, 80, 560, 70, 6, 6, "F");

  doc.setFontSize(12);
  doc.setTextColor(dark);
  doc.text(`User: ${user?.displayName || "Unknown User"}`, 35, 105);
  doc.text(`Email: ${user?.email}`, 35, 125);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 35, 145);

  // ===== TABLE =====
  autoTable(doc, {
    startY: 170,
    headStyles: {
      fillColor: primary,
      textColor: "white",
      fontSize: 11,
      halign: "center",
    },
    bodyStyles: {
      textColor: dark,
    },
    alternateRowStyles: {
      fillColor: light,
    },
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

  // ===== FOOTER =====
  doc.setFontSize(10);
  doc.setTextColor("#555");
  doc.text(
    "PawMart — Auto-generated order report",
    30,
    doc.internal.pageSize.height - 20
  );

  doc.save("PawMart_My_Orders.pdf");
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
