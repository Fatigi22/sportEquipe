import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <div className="w-64 bg-gray-800 h-screen p-6">
            <h2 className="text-white text-xl font-semibold mb-6">Gym Management</h2>
            <ul className="text-white">
                <li className="mb-4">
                    <Link
                        to="/admin/create-session"
                        className="block py-3 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                    >
                        Create New Session
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/trainer-reservations"
                        className="block py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Manage Trainer Reservations
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/modify-trainer-reservation/1"
                        className="block py-3 px-6 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300"
                    >
                        Modify Reservation (Example)
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        to="/admin/dashboard"  // Go to Dashboard Link
                        className="block py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Go to Dashboard
                    </Link>
                </li>
                <li className="mb-4">
                    <button
                        onClick={() => { localStorage.removeItem('role'); window.location.href = '/login'; }}
                        className="w-full bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminNavbar;
