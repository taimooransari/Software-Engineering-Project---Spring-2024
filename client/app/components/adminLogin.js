// components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      onLogin();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-3xl font-semibold mb-6 text-center">Restaurant Admin Login</h2>
        <div className="mb-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500" />
        </div>
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
      </div>
    </div>
  );
};

export default Login;
