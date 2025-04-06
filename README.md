# user_authentication_system
This project provides a complete authentication system with Signup, Login, and Password Rese  functionality, JS Technology full-stack authentication flows.

#  Authentication Starter Kit for Beginners

This project provides a complete authentication system with **Signup, Login, and Password Reset** functionality, JS Technology full-stack authentication flows.

## Features

- **Frontend**: React.js with form validation
- **Backend**: Node.js/Express with MongoDB
- **Authentication**:
  - Secure password hashing (bcrypt)
  - JWT token-based authentication
  - Email/password validation
- **Complete Flow**:
  - User registration
  - Login with session token
  - Password reset functionality

##  Tech Stack

| Component        | Technology            |
| ---------------- | --------------------- |
| Frontend         | React.js              |
| Backend          | Node.js, Express      |
| Database         | MongoDB               |
| Password Hashing | bcryptjs              |
| Authentication   | JSON Web Tokens (JWT) |
| Routing          | React Router          |
| HTTP Client      | Axios                 |

##  Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Basic understanding of JavaScript and React

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/auth-starter-kit.git
   cd auth-starter-kit
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=auth-demo
   JWT_SECRET=your-secret-key-here
   ```

### Running the Application

1. **Start MongoDB**  
   Make sure MongoDB is running locally or update the connection string.

2. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

   Server will run on `http://localhost:3002`

3. **Start the frontend**
   ```bash
   cd ../frontend
   npm start
   ```
   React app will open at `http://localhost:3000`

## 📖 Learning Resources

### Key Concepts Explained in This Project

1. **Password Hashing**  
   Why we never store plain-text passwords (using bcrypt)

2. **JWT Tokens**  
   How stateless authentication works

3. **Form Validation**  
   Both client-side and server-side validation

4. **Protected Routes**  
   (You can extend this to include route protection)

5. **HTTP Status Codes**  
   Proper use of 200, 400, 401, 404, etc.

### Recommended Learning Path

1. Start with the Signup component
2. Examine how passwords are hashed in server.js
3. Follow the token flow in the Login process
4. Study the password reset mechanism

##  Project Structure

```
auth-starter-kit/
│
├── backend/
│   ├── server.js        # Main backend server with all routes
│   ├── package.json
│   └── .env             # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Signup.js   # Registration form
    │   │   ├── Login.js    # Login form
    │   │   └── ForgetPassword.js  # Password reset
    │   ├── App.js         # Main router
    │   └── ...           # Other React files
    └── package.json
```

##  How to Extend This Project

Beginners can practice by adding:

1. **Email verification** - Send a confirmation email after signup
2. **Profile page** - Protected route that requires login
3. **Password strength meter** - Visual feedback for password requirements
4. **Social login** - Add Google/Facebook authentication
5. **Remember me** - Implement longer-lasting tokens

##  Common Questions

**Q: Why am I getting CORS errors?**  
A: Make sure your backend has `app.use(cors())` and frontend is calling the correct port (3002 for backend)

**Q: How do I connect to MongoDB Atlas?**  
A: Replace the `MONGO_URL` in .env with your Atlas connection string

**Q: Where should I store the JWT token?**  
A: This demo uses localStorage (for simplicity). For production, research httpOnly cookies.

##  Contributing

This is a learning project - contributions, questions, and suggestions are welcome! Open an issue or PR if you want to:

- Improve documentation
- Add new features
- Fix any bugs

##  License

This project is open-source.

---

Happy Coding! 🚀 Remember to never use this exact code in production without proper security reviews.
