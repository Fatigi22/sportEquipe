import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from "../../components/Calendar";
import { format } from 'date-fns';
import UserNavbar from '../../components/UserNavbar'; // Import the UserNavbar

const MemberReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Fetch reservations on page load or selectedDate change
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Unauthorized: No token found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/reservations', {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch reservations');
            }
        };

        fetchReservations();
    }, [selectedDate]);

    // Handle reservation form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newReservation = {
                date: selectedDate,
                time,
                description,
            };

            const token = localStorage.getItem('token');

            if (!token) {
                setError('Unauthorized: No token found');
                return;
            }

            await axios.post('http://localhost:8000/api/reservations', newReservation, {
                headers: {
                    'x-auth-token': token,
                },
            });

            const response = await axios.get('http://localhost:8000/api/reservations', {
                headers: {
                    'x-auth-token': token,
                },
            });

            if (Array.isArray(response.data)) {
                setReservations(response.data);
            }

            setTime('');
            setDescription('');
        } catch (err) {
            console.error(err);
            setError('Failed to create reservation');
        }
    };

    // Reservation Card component directly in this file
    const ReservationCard = ({ reservation }) => {
        const reservationDate = new Date(reservation.date);
        const formattedDate = format(reservationDate, 'dd/MM/yyyy');

        return (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold text-white">{reservation.sessionName || 'Session Name'}</h3>
                <p><strong className="text-white">Date:</strong> {formattedDate}</p>
                <p><strong className="text-white">Time:</strong> {reservation.time}</p>
                <p><strong className="text-white">Description:</strong> {reservation.description}</p>
                <p><strong className="text-white">Status:</strong> {reservation.status || 'Not Available'}</p>
            </div>
        );
    };

    return (
        <div>
            <UserNavbar /> {/* Add the UserNavbar here */}

            <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg mt-10">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Member Reservations</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <Calendar onSelectDate={setSelectedDate} />
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-white">Time</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="mt-2 block w-full px-3 py-2 border border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-2 block w-full px-3 py-2 border border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        Add Reservation
                    </button>
                    {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                </form>
                <div className="mt-8 space-y-4">
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

export default MemberReservationPage;
