import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTrips } from "../utils/storage";
import jsPDF from "jspdf";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const allTrips = getTrips();
    const selectedTrip = allTrips.find((t) => t.id === id);
    if (!selectedTrip) {
      alert("Trip not found");
      navigate("/");
    } else {
      setTrip(selectedTrip);
    }
  }, [id, navigate]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text(`Trip: ${trip.name}`, 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Members: ${trip.members.join(", ")}`, 10, y);
    y += 10;

    doc.text("Expenses:", 10, y);
    y += 10;

    if (trip.expenses.length === 0) {
      doc.text("No expenses added.", 10, y);
    } else {
      trip.expenses.forEach((exp, index) => {
        const line = `${index + 1}. ${exp.paidBy} paid ₹${exp.amount} for ${exp.description}`;
        doc.text(line, 10, y);
        y += 8;

        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
    }

    doc.save(`${trip.name}-SplitTour.pdf`);
  };

  if (!trip) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">✈️ {trip.name}</h1>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>

      <p className="text-gray-700 text-lg mb-4">
        <span className="font-semibold">Members:</span> {trip.members.join(", ")}
      </p>

      <div className="bg-gray-50 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">💸 Expenses</h2>
        {trip.expenses.length === 0 ? (
          <p className="text-gray-500 italic">No expenses added yet.</p>
        ) : (
          <ul className="space-y-3">
            {trip.expenses.map((exp, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="text-gray-700">
                  <span className="font-medium">{exp.paidBy}</span> paid ₹{exp.amount} for <span className="italic">{exp.description}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          to={`/trip/${trip.id}/add-expense`}
          className="bg-green-600 text-white py-2 px-5 rounded-xl hover:bg-green-700 transition font-medium"
        >
          ➕ Add Expense
        </Link>

        <Link
          to={`/trip/${trip.id}/balance`}
          className="bg-purple-600 text-white py-2 px-5 rounded-xl hover:bg-purple-700 transition font-medium"
        >
          ⚖️ View Balance
        </Link>

        <button
          onClick={handleExportPDF}
          className="bg-yellow-500 text-white py-2 px-5 rounded-xl hover:bg-yellow-600 transition font-medium"
        >
          📄 Export as PDF
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
