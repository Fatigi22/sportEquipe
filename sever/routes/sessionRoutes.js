const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const Session = require('../models/Session');

// POST: Create a new session
router.post('/', verifyToken, async (req, res) => {
    try {
        const { sessionName, startDate, endDate, trainerName, capacity, status } = req.body;

        // Validate required fields
        if (!sessionName || !startDate || !endDate || !trainerName || !capacity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate that startDate is before endDate
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: 'Start date must be before end date' });
        }

        // Check for valid status
        const validStatuses = ['Available', 'Full', 'Not Available'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Create new session
        const newSession = new Session({
            sessionName,
            startDate,
            endDate,
            trainerName,
            capacity,
            status: status || 'Available', // Default status is 'Available'
        });

        // Save session to DB
        const savedSession = await newSession.save();
        res.status(201).json({
            message: 'Session created successfully!',
            session: savedSession,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating session', error: err.message });
    }
});

// GET: Get all sessions
router.get('/', verifyToken, async (req, res) => {
    try {
        const sessions = await Session.find(); // Fetch all sessions from DB
        res.status(200).json(sessions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching sessions', error: err.message });
    }
});

module.exports = router;
