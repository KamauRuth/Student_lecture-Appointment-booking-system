import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword'; 
import Home from './pages/Home'; 
import { Toaster } from 'react-hot-toast';
import ApplyLecturer from './pages/ApplyLecturer';
import Notifications from './pages/Notifications';
import Userlist from './pages/Admin/Userlist';
import Lecturerlist from './pages/Admin/Lecturerlist';


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>

      <Routes>

        <Route path="/login" element={
          <publicRoute>
             <Login/>
          </publicRoute>
        } />


        <Route path="/register" element={
          <publicRoute>
            <Register/>
          </publicRoute>
         } />

        <Route path="/apply-lecturer" element={
          <publicRoute>
            <ApplyLecturer/>
          </publicRoute>
         } />


         
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/" element={
          <protectedRoute>
            <Home/>
          </protectedRoute>
        } />
          
          <Route
           path="/notifications" element={
          <protectedRoute>
            <Notifications/>
          </protectedRoute>
        } />


           <Route
           path="/users" element={
          <protectedRoute>
            <Userlist/>
          </protectedRoute>
        } />

         <Route
           path="/lecturers" element={
          <protectedRoute>
            <Lecturerlist/>
          </protectedRoute>
        } />


      </Routes>

    </BrowserRouter>
  )
}
export default App;
