import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrigé pour une importation correcte
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Schéma de validation Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Format d\'email invalide').required('L\'email est obligatoire'),
        password: Yup.string().required('Le mot de passe est obligatoire'),
    });

    // Gestion des changements dans les champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        setFormErrors({ ...formErrors, [name]: '' });
    };

    // Gestion de la soumission du formulaire
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Valide les données avec Yup
            await validationSchema.validate({ email, password }, { abortEarly: false });

            // Requête POST vers l'API pour l'authentification
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

            const token = response.data.token;
            localStorage.setItem('token', token);

            // Décodage du token JWT pour récupérer le rôle
            const decoded = jwtDecode(token);
            const role = decoded.role;

            localStorage.setItem('role', role);

            // Redirige vers le tableau de bord selon le rôle
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                // Gestion des erreurs de validation Yup
                const validationErrors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setFormErrors(validationErrors);
            } else {
                // Gestion des erreurs de l'API
                setError(err.response?.data?.message || 'Identifiants invalides');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bienvenue !</h2>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="font-semibold text-gray-700">Adresse email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.email && <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="font-semibold text-gray-700">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.password && <div className="text-red-500 text-sm mt-1">{formErrors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    >
                        Connexion
                    </button>
                <a href=''><Link to={"/register"}>register</Link> </a>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;