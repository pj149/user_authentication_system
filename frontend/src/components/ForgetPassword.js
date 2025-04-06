import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
  // State variables for form inputs and messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    
    // Client-side validation
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., user@example.com)');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3002/forget-password', {
        username: email, // Using email as username (matches backend)
      });

      // Success handling
      setMessage('Password reset instructions sent to your email (simulated)');
      
      // In a real app, you wouldn't show the token to users
      // This is just for demonstration/learning purposes
      console.log('Reset token:', response.data.token);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      // Error handling
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          setError('No account found with this email address');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // No response received
        setError('Network error - please check your connection');
      } else {
        // Other errors
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Forgot Password</h1>
      
      <p style={{ marginBottom: '20px' }}>
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <form onSubmit={handleForgetPassword}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: '100%', padding: '8px' }}
            placeholder="Enter your registered email"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Remember your password? <Link to="/login">Login here</Link>
      </p>

      {/* Success message */}
      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#dff0d8',
          border: '1px solid #d6e9c6',
          color: '#3c763d',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      {/* Error message */}
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

export default ForgetPassword;