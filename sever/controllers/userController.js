const User = require('../models/User');

// Mise à jour du profil utilisateur
const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du profil', error: err });
    }
};

module.exports = { updateUserProfile };
