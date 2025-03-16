const mongoose = require('mongoose');

// Reservation Schema
const reservationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
