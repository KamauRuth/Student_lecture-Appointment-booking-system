import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword'; 
import Home from './pages/Home'; 
import { Toaster } from 'react-hot-toast';


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
         
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/" element={
          <protectedRoute>
            <Home/>
          </protectedRoute>
        } />
          

      
      </Routes>

    </BrowserRouter>
  )
}
export default App;
