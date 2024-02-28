import React from 'react';
import { Routes, Route } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Transfer from './pages/Transfer';
import Transaction from './pages/Transaction';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/deposit" element={<Deposit />} />
        <Route exact path="/transfer" element={<Transfer />} />
        <Route exact path="/transactions" element={<Transaction />} />
      </Routes>
    </>
  );
}

export default App;
