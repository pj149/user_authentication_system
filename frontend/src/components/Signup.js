import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  // State variables for form inputs and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Handle form submission
  const handleSignup = async (event) => {
    event.preventDefault();
    
    // Reset previous messages and errors
    setMessage('');
    setErrors({ email: '', password: '' });
    
    // Basic client-side validation
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
      isValid = false;
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/[@$!%*?&]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character (@$!%*?&)';
      isValid = false;
    }

    // Update errors if any validation failed
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with API call
    try {
      const response = await axios.post('http://localhost:3002/signup', {
        username: email, // Using email as username
        password,
      });
      setMessage(response.data.message);
      
      // Clear form on successful signup
      setEmail('');
      setPassword('');
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error status (4xx, 5xx)
        setMessage(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        setMessage('Network error - please try again later');
      } else {
        // Something else happened
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</p>}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Create a password"
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</p>}
          <p style={{ fontSize: '0.8em', color: '#666' }}>
            Password must contain: 8+ characters, uppercase, lowercase, number, and special character
          </p>
        </div>
        
        <button 
          type="submit" 
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Signup
        </button>
      </form>
      
       {/* Display success or error messages */}
       {message && (
        <p style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('success') ? '#dff0d8' : '#f2dede',
          border: `1px solid ${message.includes('success') ? '#d6e9c6' : '#ebccd1'}`,
          color: message.includes('success') ? '#3c763d' : '#a94442',
          borderRadius: '4px'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;