import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from  "./pages/Register.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* 1. When the URL is exactly empty (/) redirect automatically to Login */}
          <Route path="/" element={<Navigate to="/user/login" replace />} />

          {/* 2. When the URL is /user/login, render the Login component */}
          <Route path="/user/login" element={<Login />} />

          {/* 3. When the URL is /user/register, render the Register component */}
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
