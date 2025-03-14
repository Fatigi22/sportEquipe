const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    session: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Session', required: true },
    member: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User', required: true },
    date: {
         type: Date,
          default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);