const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
// const sessionRoutes = require('./routes/sessionRoutes');  // Add session routes
const sessionRoutes = require('./routes/sessionRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// CORS setup to allow frontend communication
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection failed:", err));

// Routes setup
app.use('/api/auth', authRoutes);  // Authentication routes (login, register, etc.)
app.use('/api/users', verifyToken, userRoutes);  // User routes (protected by JWT)
app.use('/api/reservations', verifyToken, reservationRoutes);  // Reservation routes (protected by JWT)
// app.use('/api/sessions', verifyToken, sessionRoutes);  // Session routes (protected by JWT)
app.use('/api/sessions', verifyToken, sessionRoutes);


// Server setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
