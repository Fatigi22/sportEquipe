const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservationController');

const router = express.Router();

router.post('/', authenticate, authorize(['member']), createReservation);

router.get('/', authenticate, authorize(['member', 'trainer']), getReservations);

router.delete('/:id', authenticate, authorize(['member']), deleteReservation);

module.exports = router;