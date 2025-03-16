const express = require('express');
const router = express.Router();
const { createReservation, getReservations } = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Create a new reservation
router.post('/', verifyToken, createReservation);

// Fetch all reservations for the current user
router.get('/', verifyToken, getReservations);

module.exports = router;
