
import React, { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';


function Register() {


  // Inside your Register component function:
  const navigate = useNavigate();

  // 1. Local state hooks to capture typed form parameters
  const [formData, setFormData] = useState({
    name_: '',
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  // 2. Track changes inside input fields dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit data to your Node/Express backend port
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch command pointing directly to your Express server endpoint routing path
      const response = await fetch('https://scaling-goldfish-7rvj4rvrxg42wq9r-8084.app.github.dev/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error.message)
      setMessage("Connection error. Is your backend server running?");
    }
  };

  return (
    
  <div className={styles["register-page"]}> {/* ✅ FIXED: Uses brackets for hyphen names */}
      <div className={styles["register-card"]}>

        {/* Heading */}
        <h2 className={styles["register-title"]}>
          Sign Up
        </h2>

        {/* Message */}
        {message && (
          <p className={styles["register-message"]}>
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className={styles["register-form"]}
        >

          {/* Full Name */}
          <input
            type="text"
            name="name_"
            placeholder="Full Name"
            value={formData.name_}
            onChange={handleChange}
            required
            className={styles["register-input"]}
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles["register-input"]}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles["register-input"]}
          />

          {/* Password */}
          {/* For multiple classes, use a template literal string template block */}
          <div className={styles["password-wrapper"]}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`${styles["register-input"]} ${styles["password-input"]}`} 
            />

            <span className={styles["forgot-password"]}>
              Forgot?
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className={styles["register-button"]}
          >
            Register
          </button>

          {/* Login Section */}
          <div className={styles["login-section"]}>
            <div className={styles["login-question"]}>
              Already have an account?
            </div>

            <div className={styles["login-link"]} onClick={() => navigate('/user/login')}>
              Log In
            </div>
          </div>

        </form>
      </div>
    </div>

  );
}

export default Register;