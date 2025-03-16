const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const { date, time, description } = req.body;

        // Ensure the date, time, and description are provided
        if (!date || !time || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new reservation
        const newReservation = new Reservation({
            date,
            time,
            description,
            userId: req.user.id // Assuming you are using JWT to attach user ID
        });

        // Save the reservation to the database
        await newReservation.save();

        res.status(201).json({ message: 'Reservation created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not create reservation.' });
    }
};

// Fetch all reservations for the current user
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.user.id }).populate('userId');
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch reservations.' });
    }
};

module.exports = { createReservation, getReservations };
