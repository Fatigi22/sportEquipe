const jwt = require('jsonwebtoken');

// Vérification du token JWT
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Ajouter l'utilisateur à la requête
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = { verifyToken };
