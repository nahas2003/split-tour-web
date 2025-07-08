import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../utils/storage";

function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const allTrips = getTrips();
    setTrips(allTrips);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to SplitTour</h1>

      <div className="text-center mb-6">
        <Link
          to="/add-trip"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          + Create New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <p className="text-center text-gray-600">No trips found. Create your first one!</p>
      ) : (
        <div className="grid gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center hover:bg-gray-100 transition"
            >
              <div>
                <h2 className="text-lg font-semibold">{trip.name}</h2>
                <p className="text-sm text-gray-500">
                  Members: {trip.members.join(", ")}
                </p>
              </div>
              <Link
                to={`/trip/${trip.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
