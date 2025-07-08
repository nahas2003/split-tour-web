import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddTrip from './pages/AddTrip';
import TripDetails from './pages/TripDetails';
import AddExpense from './pages/AddExpense';
import Balance from './pages/Balance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/trip/:id/add-expense" element={<AddExpense />} />
        <Route path="/trip/:id/balance" element={<Balance />} />
      </Routes>
    </Router>
  );
}

export default App;
