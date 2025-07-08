import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTrip } from "../utils/storage";

const AddTrip = () => {
  const [tripName, setTripName] = useState("");
  const [members, setMembers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tripName || !members) return alert("All fields are required.");

    const newTrip = {
      id: Date.now().toString(),
      name: tripName,
      members: members.split(",").map((m) => m.trim()),
      expenses: [],
    };

    saveTrip(newTrip);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Trip Name</label>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Goa Trip"
            className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium">Members (comma-separated)</label>
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="Nahas, Arjun, Rahul"
            className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
