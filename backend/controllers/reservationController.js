const Reservation = require('../models/Reservation');
const Session = require('../models/Session');
const User = require('../models/User');

exports.createReservation = async (req, res) => {
    const { sessionId } = req.body;
    const memberId = req.user.id; 

    try {
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        if (session.participants.length >= session.maxParticipants) {
            return res.status(400).json({ message: 'Session is full' });
        }

        const existingReservation = await Reservation.findOne({ session: sessionId, member: memberId });
        if (existingReservation) {
            return res.status(400).json({ message: 'You have already reserved this session' });
        }

        const reservation = new Reservation({ session: sessionId, member: memberId });
        await reservation.save();

        session.participants.push(memberId);
        await session.save();

        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        let reservations;
        if (req.user.role === 'trainer') {
            reservations = await Reservation.find().populate('session').populate('member', 'name email');
        } else {
            reservations = await Reservation.find({ member: req.user.id }).populate('session').populate('member', 'name email');
        }
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    const memberId = req.user.id; 

    try {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.member.toString() !== memberId) {
            return res.status(403).json({ message: 'You are not authorized to delete this reservation' });
        }

        await Reservation.findByIdAndDelete(reservationId);

        const session = await Session.findById(reservation.session);
        session.participants = session.participants.filter(participant => participant.toString() !== memberId);
        await session.save();

        res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};