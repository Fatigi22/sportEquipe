import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    return (
        <div className="flex">
            <nav className="w-64 bg-gray-800 h-screen p-6">
                <h2 className="text-white text-xl font-semibold mb-6">Gym Management</h2>
                <ul className="text-white">
                    <li className="mb-4">
                        <Link
                            to="/user/dashboard"
                            className="block py-3 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link
                            to="/user/reservations"
                            className="block py-3 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            Reservations
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link
                            to="/session/1"  // Example session link
                            className="block py-3 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
                        >
                            View Session Details
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
            </nav>
            {/* Main Content Area */}
            <div className="flex-1 bg-gray-900 p-6">
                {/* Main content will go here */}
            </div>
        </div>
    );
};

export default UserNavbar;
