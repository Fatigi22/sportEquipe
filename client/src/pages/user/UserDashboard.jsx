import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';  // Import the UserNavbar

const UserDashboard = () => {
    return (
        <div className="user-dashboard">
            <UserNavbar /> {/* Add the UserNavbar component here */}
sssssss
            <div className="min-h-screen bg-gray-900 p-6">
                
                <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">User Dashboard</h2>
                    <div className="space-y-4">
                        <Link
                            to="/user/reservations"
                            className="block text-center py-3 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            View Reservations
                        </Link>
                        <Link
                            to="/session/1"  // Example link to a session details page
                            className="block text-center py-3 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
                        >
                            View Session Details (Example)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
