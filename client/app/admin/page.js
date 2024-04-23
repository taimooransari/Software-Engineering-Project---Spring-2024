// pages/index.js
"use client";

import React, { useState } from 'react';
import Login from '../components/adminLogin';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Home;
