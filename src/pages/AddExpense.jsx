import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTrips, saveTrip } from "../utils/storage";

const AddExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [sharedWith, setSharedWith] = useState([]);

  useEffect(() => {
    const trips = getTrips();
    const t = trips.find((t) => t.id === id);
    if (!t) {
      alert("Trip not found");
      navigate("/");
    } else {
      setTrip(t);
    }
  }, [id, navigate]);

  const handleCheckbox = (member) => {
    setSharedWith((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paidBy || !amount || !description || sharedWith.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    const newExpense = {
      paidBy,
      amount: parseFloat(amount),
      description,
      sharedWith,
    };

    // Save to localStorage
    const trips = getTrips();
    const updatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        t.expenses.push(newExpense);
      }
      return t;
    });
    localStorage.setItem("splitTourTrips", JSON.stringify(updatedTrips));
    navigate(`/trip/${trip.id}`);
  };

  if (!trip) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Expense to {trip.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Paid By</label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full p-2 border rounded-xl"
          >
            <option value="">Select a person</option>
            {trip.members.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-xl"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-xl"
            placeholder="Lunch, Cab, etc."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Shared With</label>
          <div className="grid grid-cols-2 gap-2">
            {trip.members.map((m, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={m}
                  checked={sharedWith.includes(m)}
                  onChange={() => handleCheckbox(m)}
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add Expense
        </button>
      </form>

      <div className="text-center mt-4">
        <Link
          to={`/trip/${trip.id}`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Trip
        </Link>
      </div>
    </div>
  );
};

export default AddExpense;
