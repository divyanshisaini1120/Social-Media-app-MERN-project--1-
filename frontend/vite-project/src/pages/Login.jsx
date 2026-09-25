// src/pages/Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';  
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  // 1. Local state hooks to capture login parameters
  // Note: 'email' can also capture 'username' depending on your backend lookups
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  // 2. Track input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit data to your Codespaces Node/Express backend port
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); //"🎉 " + 
        // Next step down the line: save tokens/user data or redirect them to Dashboard
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error.message);
      setMessage("Connection error. Is your backend server running?");
    }
  };

  // 4. Render layout using clean camelCase JavaScript object mappings
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.heading}>Login</h2>

      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        {/* Password Input */}
        <div className={styles.passwordWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <span className={styles.forgotPassword}>
            Forgot?
          </span>
        </div>

        {/* Login Button */}
        <button type="submit" className={styles.submitButton}>
          Log In
        </button>

        {/* Signup Redirect Section */}
        <div className={styles.signupSection}>
          <span>Don't have an account?</span>
          <span className={styles.signupLink} onClick={() => navigate('/user/register')}>Sign Up</span>
        </div>
      </form>
    </div>

  );
}

export default Login;
