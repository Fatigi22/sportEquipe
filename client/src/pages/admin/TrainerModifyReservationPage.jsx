import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

const TrainerModifyReservationPage = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`/reservations/${id}`);
                setReservation(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchReservation();
    }, [id]);

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/reservations/${id}`, { status });
            alert('Reservation updated successfully');
        } catch (err) {
            console.error(err);
        }
    };

    if (!reservation) return <div className="text-white">Loading...</div>;

    return (
        <div className="trainer-modify-reservation-page flex min-h-screen bg-gray-800">
            <AdminNavbar /> {/* Add the AdminNavbar on the left side */}

            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold mb-6 text-green-400">Modify Reservation</h2>
                <form onSubmit={handleUpdateStatus} className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
                    <p className="text-white text-lg">Session: {reservation.sessionName}</p>
                    <p className="text-white text-lg">Trainer: {reservation.trainerName}</p>
                    <label className="text-white text-lg">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Select Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                        Update Status
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrainerModifyReservationPage;
