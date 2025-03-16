import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';

const SessionPage = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    // Fetch sessions from the backend when the component mounts
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/sessions', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setSessions(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sessions:', err);
                setError('Failed to load sessions');
                setLoading(false);
            }
        };

        fetchSessions();
    }, [token]);

    return (
        <div className="flex">
            <UserNavbar />
            <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                <h1 className="text-3xl font-semibold text-white mb-6 text-center">Sessions</h1>

                {loading && <div className="text-center text-xl text-gray-300">Loading...</div>}

                {error && (
                    <div className="bg-red-200 text-red-600 text-lg p-4 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="flex flex-wrap gap-6 justify-center">
                    {sessions.length === 0 ? (
                        !loading && <p className="text-gray-300">No sessions available.</p>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session._id}
                                className="bg-gray-700 shadow-lg rounded-lg p-4 w-80 transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-600"
                            >
                                <h3 className="text-xl text-white font-semibold mb-2 text-center">{session.sessionName}</h3>
                                <p className="text-lg text-gray-300"><strong>Trainer:</strong> {session.trainerName}</p>
                                <p className="text-lg text-gray-300"><strong>Date:</strong> {new Date(session.startDate).toLocaleString()}</p>
                                <p className="text-lg text-gray-300"><strong>Capacity:</strong> {session.capacity}</p>
                                <p className="text-lg text-gray-300"><strong>Status:</strong> {session.status}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionPage;
