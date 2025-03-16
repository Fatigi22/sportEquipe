import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = localStorage.getItem('token');

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
                        'x-auth-token': token,
                    },
                }
            );
            setSuccessMessage('Reservation created successfully!');
            setReservations([...reservations, response.data]);
        } catch (err) {
            setError('Failed to create reservation');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create Reservation</h1>
                {error && <div className="text-red-500 bg-red-100 p-2 rounded-md text-center mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 bg-green-100 p-2 rounded-md text-center mb-4">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                    <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-400">
                        Create Reservation
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-semibold text-white mt-6">Existing Reservations</h2>
            <div className="reservation-list space-y-4 w-full max-w-md">
                {reservations.length === 0 ? (
                    <p className="text-white">No reservations found</p>
                ) : (
                    reservations.map((reservation) => (
                        <div key={reservation._id} className="bg-gray-800 p-4 rounded-md shadow-md">
                            <div className="text-white">
                                <h3 className="text-lg font-semibold">{reservation.date} - {reservation.time}</h3>
                                <p>{reservation.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReservationPage;
