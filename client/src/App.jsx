import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/shared/HomePage'; // Public Home page
import Navbar from './components/Navbar'; // Global Navbar (will be conditionally rendered based on role)
import LoginPage from './pages/shared/LoginPage'; // Public Login page
import RegisterPage from './pages/shared/RegisterPage'; // Public Register page
import ReservationPage from './pages/shared/ReservationPage'; // Shared Reservation Page (accessible by both user and admin)
import TrainerReservationPage from './pages/admin/TrainerReservationPage'; // Admin Trainer Reservation Page
import TrainerModifyReservationPage from './pages/admin/TrainerModifyReservationPage'; // Admin Trainer Modify Reservation Page
import MemberReservationPage from './pages/user/MemberReservationPage'; // User Reservation Page
import SessionPage from './pages/shared/SessionPage'; // Shared Session Page (accessible by both user and admin)
import CreateSession from './pages/admin/CreateSession'; // Admin Create Session Page
import ProtectedRoute from './components/ProtectedRoute'; // Protected route component for role-based access
import AdminDashboard from './pages/admin/AdminDashboard'; // Admin Dashboard page
import UserDashboard from './pages/user/UserDashboard'; // User Dashboard page
// import Footer from './components/Footer'; // Footer (added from your second snippet)

const App = () => {
  const role = localStorage.getItem('role'); // Get the role from localStorage (could also be from context)

  return (
    <Router>
      <Navbar role={role} /> {/* Pass role to Navbar for conditional rendering */}

      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes for User */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute
                element={<UserDashboard />}
                allowedRoles={['user']}
              />
            }
          />
          <Route
            path="/user/reservations"
            element={
              <ProtectedRoute
                element={<MemberReservationPage />}
                allowedRoles={['user']}
              />
            }
          />

          {/* Protected Routes for Admin (Can access both admin and user pages) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/admin/create-session"
            element={
              <ProtectedRoute
                element={<CreateSession />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/admin/trainer-reservations"
            element={
              <ProtectedRoute
                element={<TrainerReservationPage />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/admin/modify-trainer-reservation/:id"
            element={
              <ProtectedRoute
                element={<TrainerModifyReservationPage />}
                allowedRoles={['admin']}
              />
            }
          />

          {/* Shared Routes (Accessible to both User and Admin) */}
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/session/:id" element={<SessionPage />} />

          {/* Additional Routes from the second snippet */}
          <Route path="/sessions" element={<SessionPage />} />
          <Route path="/sessions/create" element={<CreateSession />} />
        </Routes>
      </div>

      {/* <Footer /> If you decide to use the footer */}
    </Router>
  );
};

export default App;












