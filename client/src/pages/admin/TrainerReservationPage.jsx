import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token'); // Get token from localStorage

    // Fetch reservations when component loads
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservations', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setReservations(response.data);
            } catch (err) {
                setError('Failed to fetch reservations');
                console.error('Error fetching reservations:', err);
            }
        };

        fetchReservations();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            date,
            time,
            description,
        };

        try {
            const response = await axios.post(
                'http://localhost:8000/api/reservations',
                reservationData,
                {
                    headers: {
                        'x-auth-token': token, // Include token in the header
                    },
                }
            );
            setSuccessMessage('Reservation created successfully!');
            setReservations([...reservations, response.data]); // Update the reservation list
            setDate('');
            setTime('');
            setDescription('');
        } catch (err) {
            setError('Failed to create reservation');
            console.error(err);
        }
    };

    // Reservation Card component
    const ReservationCard = ({ reservation }) => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-bold">{reservation.sessionName || 'Session Name'}</h3>
                <p className="text-gray-700">Date: {new Date(reservation.date).toLocaleDateString()}</p>
                <p className="text-gray-700">Time: {reservation.time}</p>
                <p className="text-gray-700">Description: {reservation.description}</p>
                <p className="text-gray-700">Status: {reservation.status || 'Not Available'}</p>
            </div>
        );
    };

    return (
        <div className="reservation-page flex min-h-screen bg-gray-900">
            <AdminNavbar /> {/* Add the AdminNavbar on the left side */}

            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4 text-blue-400">Create Reservation</h1>
                {error && <div className="error text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="success text-green-500 mb-4">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            Create Reservation
                        </button>
                    </div>
                </form>

                <h2 className="text-xl font-semibold text-white mt-8">Existing Reservations</h2>
                <div className="reservation-list space-y-4">
                    {reservations.length === 0 ? (
                        <p className="text-white">No reservations found</p>
                    ) : (
                        reservations.map((reservation) => (
                            <ReservationCard key={reservation._id} reservation={reservation} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationPage;
