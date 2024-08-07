import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import ApplyLecturer from './pages/RegisterLecturer.js';
import Notifications from './pages/Notifications';
// import Userlist from './pages/Admin/UpdateAvailability.js';
// import Lecturerlist from './pages/Admin/BookedAppointments.js';
import AppointmentBooking from './pages/Appointments';
import MyAppointment from './pages/myAppointments';
import Profile from './pages/Profile';
import BookedAppointments from './pages/Lecturer/BookedAppointments.js';
import UpdateAvailability from './pages/Lecturer/UpdateAvailability.js';
import RegisterLecturer from './pages/RegisterLecturer.js';
import LecturerLogin from './pages/lecturerLogin.js';
import AddDepartment from './pages/addDepartment.js';
import Landing from './pages/landing.js';
import Reports from './pages/report.js';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>

        <Route path="/login" element={
          <publicRoute>
            <Login />
          </publicRoute>
        } />


        <Route path="/register" element={
          <publicRoute>
            <Register />
          </publicRoute>
        } />

        <Route
           path='/home' element={ 
            <publicRoute>
              <Home />
            </publicRoute>
          } />


        <Route path="/apply-lecturer" element={
          <publicRoute>
            <ApplyLecturer />
          </publicRoute>
        } />


        <Route
          path="/notifications" element={
            <protectedRoute>
              <Notifications />
            </protectedRoute>
          } />

        <Route
          path="/booked-appointments" element={
            <protectedRoute>
              <BookedAppointments />
            </protectedRoute>
          } />

        <Route
          path="/my-appointments" element={
            <protectedRoute>
              <MyAppointment />
            </protectedRoute>
          } />

          <Route
          path='/' element={
            <publicRoute>
              <Landing />
            </publicRoute>
          } />




        <Route
          path="/update-availability" element={
            <protectedRoute>
              <UpdateAvailability />
            </protectedRoute>
          } />

        <Route
          path="/appointments" element={
            <protectedRoute>
              <AppointmentBooking />
            </protectedRoute>
          } />

        <Route
          path="/profile" element={
            <protectedRoute>
              <Profile />
            </protectedRoute>
          } />


        <Route
          path="/register-lecturers" element={
            <protectedRoute>
              <RegisterLecturer />
            </protectedRoute>
          } />

        <Route
          path="/lecturer-login" element={
            <protectedRoute>
              <LecturerLogin />
            </protectedRoute>
          } />

        <Route
          path="/add-department" element={
            <protectedRoute>
              <AddDepartment />
            </protectedRoute>
          } />

          <Route
          path='/reports' element={ 
            <publicRoute>
              <Reports />
            </publicRoute>
          } />


      </Routes>

    </BrowserRouter>
  )
}
export default App;
