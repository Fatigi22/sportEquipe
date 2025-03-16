const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription d'un utilisateur

// const register = async (req, res) => {
//     const { firstName, lastName, phone, email, password, role } = req.body;

//     try {
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already in use" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10); // Hash password

//         const newUser = new User({
//             firstName,
//             lastName,
//             phone,
//             email,
//             password: hashedPassword,
//             role,
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//         console.error("Error during registration:", err);

//         // Handle duplicate key error explicitly
//         if (err.code === 11000) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };


const register = async (req, res) => {
    const { firstName, lastName, phone, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return success message and token
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (err) {
        console.error("Error during registration:", err);

        // Handle duplicate key error explicitly
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = register;


// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
    }
};

module.exports = { register, loginUser };
