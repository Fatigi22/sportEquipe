const Session = require('../models/Session');

exports.createSession = async (req, res) => {
    const { title, description, date, maxParticipants } = req.body;
    try {
        const session = new Session({ title, description, date, maxParticipants, trainer: req.user.id });
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find().populate('trainer', 'name');
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateSession = async (req, res) => {
    const { title, description, date, maxParticipants } = req.body;
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, { title, description, date, maxParticipants }, { new: true });
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.json({ message: 'Session deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};