const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const session = new Session({
      ...req.body,
      trainer: req.user.id
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: "Erreur de création" });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("trainer", "name email");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Erreur de récupération" });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session non trouvée" });
    if (session.availableSeats <= 0) return res.status(400).json({ message: "Complet" });
    if (session.participants.includes(req.user.id)) return res.status(400).json({ message: "Déjà inscrit" });

    session.participants.push(req.user.id);
    session.availableSeats -= 1;
    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Erreur d'inscription" });
  }
};