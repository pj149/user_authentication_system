import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Index;