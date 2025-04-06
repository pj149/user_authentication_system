import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  // State variables for form inputs and messages
  const [email, setEmail] = useState(''); // Changed from username to email for clarity
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  // Email validation regex (same as backend)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Reset previous error messages
    
    // Client-side validation
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., user@example.com)');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await axios.post('http://localhost:3002/login', {
        username: email, // Using email as username (matches backend)
        password,
      });

      // On successful login:
      // 1. Store the token (in a real app, you might use context or localStorage)
      // 2. Redirect to home page
      localStorage.setItem('authToken', response.data.token); // Store token
      navigate('/'); // Redirect to home page
      
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        if (error.response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error - please check your connection');
      } else {
        // Something else happened
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Login</h1>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Enter your email"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Enter your password"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '15px' }}>
        <p>Don't have an Account? <Link to="/signup">Signup</Link></p>
        <p>Forgot Your Password? <Link to="/forget-password">Reset Password</Link></p>
      </div>

      {/* Error message display */}
      {error && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f2dede',
          border: '1px solid #ebccd1',
          color: '#a94442',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default Login;