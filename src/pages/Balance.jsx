import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTrips } from "../utils/storage";

const Balance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const trips = getTrips();
    const selectedTrip = trips.find((t) => t.id === id);
    if (!selectedTrip) {
      alert("Trip not found");
      navigate("/");
    } else {
      setTrip(selectedTrip);
      calculateBalance(selectedTrip);
    }
  }, [id, navigate]);

  const calculateBalance = (trip) => {
    const members = trip.members;
    const balances = {};

    // Step 1: Initialize balances
    members.forEach((m) => {
      balances[m] = { paid: 0, owes: 0 };
    });

    // Step 2: Sum up paid and owes per expense
    trip.expenses.forEach((exp) => {
      balances[exp.paidBy].paid += exp.amount;
      const share = exp.amount / exp.sharedWith.length;
      exp.sharedWith.forEach((member) => {
        balances[member].owes += share;
      });
    });

    // Step 3: Calculate net balances
    const net = members.map((m) => ({
      name: m,
      balance: +(balances[m].paid - balances[m].owes).toFixed(2),
    }));

    // Step 4: Create final settlements
    const debtors = net.filter((p) => p.balance < 0).sort((a, b) => a.balance - b.balance);
    const creditors = net.filter((p) => p.balance > 0).sort((a, b) => b.balance - a.balance);

    const settlements = [];

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);
      
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount.toFixed(2),
      });

      debtor.balance += amount;
      creditor.balance -= amount;

      if (Math.abs(debtor.balance) < 0.01) i++;
      if (Math.abs(creditor.balance) < 0.01) j++;
    }

    setBalances(settlements);
  };

  if (!trip) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Balance for {trip.name}</h1>
        <Link to={`/trip/${trip.id}`} className="text-blue-600 hover:underline text-sm">
          ← Back to Trip
        </Link>
      </div>

      {balances.length === 0 ? (
        <p className="text-gray-500">No balances to show.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {balances.map((b, i) => (
            <li key={i} className="bg-white shadow-sm p-3 rounded-xl text-gray-800">
              💸 <strong>{b.from}</strong> owes <strong>{b.to}</strong> ₹{b.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Balance;
