const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express application
const app = express();
const PORT = 3002;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "test"; // Database name

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern (user@domain.com)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Password requirements:
// At least 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one number
// At least one special character (@$!%*?&)

async function startServer() {
  console.log("🚀 Initializing backend...");

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // Get reference to database and collection
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');

    // Signup endpoint
    app.post('/signup', async (req, res) => {
      const { username, password } = req.body;

      // Validate email format
      if (!emailRegex.test(username)) {
        return res.status(400).send({ message: 'Please provide a valid email address (e.g., user@example.com)' });
      }

      // Validate password strength
      if (!passwordRegex.test(password)) {
        return res.status(400).send({ 
          message: 'Password must be at least 8 characters long and contain: ' +
                  '1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)'
        });
      }

      try {
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).send({ message: 'Email already registered' });
        }

        // Hash password with bcrypt (10 salt rounds)
        const hash = await bcrypt.hash(password, 10);
        
        // Insert new user into database
        await usersCollection.insertOne({ 
          username, 
          password: hash,
          createdAt: new Date() // Add timestamp for record keeping
        });
        
        res.send({ message: 'User created successfully' });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send({ message: 'Error creating user' });
      }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      // Basic validation
      if (!username || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
      }

      try {
        // Find user in database
        const user = await usersCollection.findOne({ username });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Create JWT token that expires in 1 hour
        const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
        res.send({ token });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Error during login' });
      }
    });

    // Forget password endpoint
    app.post('/forget-password', async (req, res) => {
      const { username } = req.body;

      // Validate email format
      if (!emailRegex.test(username)) {
        return res.status(400).send({ message: 'Please provide a valid email address' });
      }

      try {
        // Check if user exists
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        // Create temporary token for password reset (expires in 1 hour)
        const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
        
        // In a real app, you would send an email here with a reset link
        // For this example, we'll just return the token
        res.send({ 
          message: 'Password reset email sent (simulated)', 
          token 
        });
      } catch (error) {
        console.error('Forget password error:', error);
        res.status(500).send({ message: 'Error processing request' });
      }
    });
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
}

// Initialize the server
startServer();